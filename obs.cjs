const { createHash, randomUUID } = require('node:crypto');

function obsAuthentication(password, salt, challenge) {
  const hash = value => createHash('sha256').update(value).digest('base64');
  return hash(hash(password + salt) + challenge);
}

class ObsConnection {
  constructor(makeSocket = url => new WebSocket(url, 'obswebsocket.json')) {
    this.makeSocket = makeSocket;
    this.pending = new Map();
    this.ready = false;
  }

  disconnect(reason = new Error('Đã ngắt kết nối OBS.')) {
    const socket = this.socket;
    this.socket = undefined;
    this.ready = false;
    this.identify?.reject(reason);
    for (const entry of this.pending.values()) entry.reject(reason);
    this.pending.clear();
    if (socket && socket.readyState < 2) socket.close();
  }

  connect(input) {
    const { port, password } = input ?? {};
    if (!Number.isInteger(port) || port < 1 || port > 65535 ||
        typeof password !== 'string' || password.length > 256) {
      throw new Error('Kiểm tra cổng và mật khẩu WebSocket của OBS.');
    }
    this.disconnect();
    const socket = this.makeSocket('ws://127.0.0.1:' + port);
    this.socket = socket;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => this.disconnect(new Error('OBS không phản hồi.')), 5000);
      const finish = (callback, value) => {
        clearTimeout(timer);
        this.identify = undefined;
        callback(value);
      };
      this.identify = { reject: error => finish(reject, error) };

      // Keep the password only until Hello has been processed.
      let secret = password;
      socket.addEventListener('message', event => {
        if (this.socket !== socket) return;
        try {
          const { op, d } = JSON.parse(event.data);
          if (op === 0 && !this.ready) {
            const identification = { rpcVersion: 1, eventSubscriptions: 0 };
            if (d.authentication) {
              identification.authentication = obsAuthentication(secret, d.authentication.salt, d.authentication.challenge);
            }
            secret = '';
            socket.send(JSON.stringify({ op: 1, d: identification }));
          } else if (op === 2 && !this.ready) {
            this.ready = true;
            finish(resolve);
          } else if (op === 7) {
            const entry = this.pending.get(d.requestId);
            if (entry) {
              if (d.requestStatus.result) entry.resolve(d.responseData);
              else entry.reject(new Error('OBS từ chối thao tác. Mã lỗi ' + d.requestStatus.code + '.'));
            }
          }
        } catch {
          this.disconnect(new Error('Phản hồi WebSocket OBS không hợp lệ.'));
        }
      });
      const lost = () => {
        secret = '';
        if (this.socket === socket) this.disconnect(new Error('Không kết nối được OBS. Kiểm tra WebSocket, cổng và mật khẩu.'));
      };
      socket.addEventListener('error', lost);
      socket.addEventListener('close', lost);
    });
  }

  request(requestType, requestData) {
    if (!this.ready || this.socket?.readyState !== 1) throw new Error('Kết nối OBS trước khi thao tác.');
    const socket = this.socket;
    const requestId = randomUUID();
    return new Promise((resolve, reject) => {
      const finish = (callback, value) => {
        clearTimeout(timer);
        this.pending.delete(requestId);
        callback(value);
      };
      const timer = setTimeout(() => finish(reject, new Error('OBS phản hồi chậm. Hãy tải lại trạng thái trước khi thử lại.')), 5000);
      this.pending.set(requestId, { resolve: data => finish(resolve, data), reject: error => finish(reject, error) });
      try {
        socket.send(JSON.stringify({ op: 6, d: { requestType, requestId, requestData } }));
      } catch {
        finish(reject, new Error('Không gửi được lệnh tới OBS.'));
      }
    });
  }

  async status() {
    if (!this.ready) return { connected: false };
    const [stream, program] = await Promise.all([
      this.request('GetStreamStatus'), this.request('GetSceneList'),
    ]);
    return {
      connected: true,
      active: stream.outputActive,
      reconnecting: stream.outputReconnecting,
      scene: program.currentProgramSceneName,
      scenes: program.scenes.map(scene => scene.sceneName),
    };
  }

  async switchScene(name) {
    if (typeof name !== 'string' || !name.trim() || name.length > 256) throw new Error('Tên cảnh không hợp lệ.');
    await this.request('SetCurrentProgramScene', { sceneName: name });
    return this.status();
  }

  async stream(input) {
    if (!['start', 'stop'].includes(input?.action) || input.confirmed !== true) throw new Error('Cần xác nhận thao tác phát.');
    await this.request(input.action === 'start' ? 'StartStream' : 'StopStream');
    return this.status();
  }
}

module.exports = { ObsConnection };
