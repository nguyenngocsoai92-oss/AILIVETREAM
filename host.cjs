const { spawn, execFile } = require('node:child_process');
const { promisify } = require('node:util');

function normalizeScript(raw) {
  if (typeof raw !== 'string' || raw.length > 12000) throw new Error('Kịch bản tối đa 12.000 ký tự.');
  const lines = raw.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  if (lines.length > 80 || lines.some(line => line.length > 500)) {
    throw new Error('Kịch bản tối đa 80 đoạn, mỗi đoạn tối đa 500 ký tự.');
  }
  return lines;
}

function vietnameseVoice(list) {
  return list.split(/\r?\n/).map(line => line.match(/^(.+?)\s+vi[_-]VN\s+#/i)?.[1]?.trim()).find(Boolean);
}

class HostSpeech {
  constructor(publish, startProcess = spawn, listVoices = promisify(execFile), platform = process.platform) {
    this.publish = publish;
    this.startProcess = startProcess;
    this.listVoices = listVoices;
    this.platform = platform;
    this.stop();
  }

  stop() {
    const previous = this.playback;
    this.playback = undefined;
    previous?.child?.kill();
    this.update({ phase: 'idle', line: '' });
  }

  update(state) {
    this.state = state;
    this.publish(state);
  }

  async play(raw) {
    const lines = normalizeScript(raw);
    if (!lines.length) throw new Error('Nhập ít nhất một đoạn kịch bản.');
    if (this.platform !== 'darwin') throw new Error('Giọng đọc cục bộ của bản này dùng macOS.');
    this.stop();
    const playback = {};
    this.playback = playback;
    try {
      const { stdout } = await this.listVoices('/usr/bin/say', ['-v', '?'], { timeout: 5000 });
      if (this.playback !== playback) return;
      const voice = vietnameseVoice(stdout);
      if (!voice) throw new Error('Mac chưa có giọng tiếng Việt. Tải giọng tiếng Việt trong cài đặt trợ năng của macOS.');
      this.next(playback, lines, voice, 0);
    } catch (error) {
      if (this.playback === playback) {
        this.stop();
        throw error;
      }
    }
  }

  next(playback, lines, voice, index) {
    if (this.playback !== playback) return;
    if (index === lines.length) {
      this.playback = undefined;
      this.update({ phase: 'finished', line: '' });
      return;
    }
    const line = lines[index];
    const child = this.startProcess('/usr/bin/say', ['-v', voice], { stdio: ['pipe', 'ignore', 'ignore'] });
    playback.child = child;
    this.update({ phase: 'speaking', line, index: index + 1, total: lines.length });

    const fail = () => {
      if (this.playback !== playback) return;
      this.playback = undefined;
      if (child.exitCode === null && child.signalCode === null) child.kill();
      this.update({ phase: 'error', line: '', message: 'macOS không phát được giọng đã chọn.' });
    };
    child.once('error', fail);
    child.stdin.on('error', fail);
    child.once('close', code => {
      if (code === 0) this.next(playback, lines, voice, index + 1);
      else fail();
    });
    child.stdin.end(line);
  }
}

module.exports = { HostSpeech, normalizeScript, vietnameseVoice };
