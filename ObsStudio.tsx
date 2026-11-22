import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';

type Status = { connected: false } | {
  connected: true; active: boolean; reconnecting: boolean; scene: string; scenes: string[];
};
type StreamAction = 'start' | 'stop';

declare global {
  interface Window {
    obs: {
      connect(input: { port: number; password: string }): Promise<void>;
      disconnect(): Promise<void>;
      status(): Promise<Status>;
      switchScene(name: string): Promise<Status>;
      stream(input: { action: StreamAction; confirmed: true }): Promise<Status>;
    };
  }
}

export function ObsStudio() {
  const [port, setPort] = useState('4455');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<Status>({ connected: false });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [confirm, setConfirm] = useState<StreamAction>();

  useEffect(() => {
    if (!status.connected || busy) return;
    let current = true;
    const timer = window.setInterval(() => {
      window.obs.status().then(next => { if (current) setStatus(next); }).catch(() => {
        if (!current) return;
        setError('Không đọc được trạng thái OBS. Hãy cập nhật trạng thái hoặc kết nối lại.');
      });
    }, 4000);
    return () => { current = false; window.clearInterval(timer); };
  }, [status.connected, busy]);

  async function run(action: () => Promise<Status>) {
    setBusy(true);
    setError('');
    try {
      setStatus(await action());
    } catch (cause) {
      setError(cause instanceof Error ? cause.message.replace(/^.*Error: /, '') : 'Thao tác OBS thất bại.');
      try { setStatus(await window.obs.status()); } catch { setStatus({ connected: false }); }
    } finally {
      setBusy(false);
    }
  }

  function connect(event: FormEvent) {
    event.preventDefault();
    void run(async () => {
      await window.obs.connect({ port: Number(port), password });
      return window.obs.status();
    });
    setPassword('');
  }

  return <section className="obs-panel">
    <h2>Phát LIVE qua OBS</h2>
    <p>Mở OBS Studio, bật máy chủ WebSocket và cấu hình đích phát trong OBS bằng quyền LIVE chính thức của tài khoản.</p>
    <p className="note">TikTok và Shopee được cấu hình bên ngoài ứng dụng này. Trạng thái OBS chỉ cho biết tình trạng nguồn phát.</p>
    {status.connected ? <>
      <p><strong>{status.reconnecting ? 'OBS đang kết nối lại luồng' : status.active ? 'OBS đang phát luồng' : 'OBS đã kết nối · chưa phát'}</strong></p>
      <label>Cảnh OBS <select value={status.scene} disabled={busy || !!confirm} onChange={event => {
        const name = event.target.value;
        void run(() => window.obs.switchScene(name));
      }}>
        {status.scenes.map(scene => <option key={scene} value={scene}>{scene}</option>)}
      </select></label>
      <div className="obs-actions">
        <button disabled={busy || !!confirm} onClick={() => setConfirm(status.active ? 'stop' : 'start')}>
          {status.active ? 'Dừng phát OBS' : 'Bắt đầu phát OBS'}
        </button>
        <button className="secondary" disabled={busy || !!confirm} onClick={() => void run(() => window.obs.status())}>Cập nhật trạng thái</button>
        <button className="secondary" disabled={busy || !!confirm} onClick={() => void run(async () => {
          await window.obs.disconnect();
          return { connected: false };
        })}>Ngắt kết nối</button>
      </div>
      {confirm && <div className="obs-confirm">
        <p>{confirm === 'start' ? 'Phát tới đích đang lưu trong OBS. Anh đã kiểm tra đúng tài khoản và đích phát?' : 'Xác nhận dừng luồng phát trong OBS?'}</p>
        <button onClick={() => {
          const action = confirm;
          setConfirm(undefined);
          void run(() => window.obs.stream({ action, confirmed: true }));
        }}>Xác nhận</button>{' '}
        <button className="secondary" onClick={() => setConfirm(undefined)}>Hủy</button>
      </div>}
    </> : <form onSubmit={connect}>
      <label>Cổng OBS <input type="number" min="1" max="65535" required value={port} onChange={event => setPort(event.target.value)} /></label>
      <label>Mật khẩu WebSocket <input type="password" maxLength={256} value={password} onChange={event => setPassword(event.target.value)} /></label>
      <button disabled={busy}>Kết nối OBS trên máy này</button>
    </form>}
    <p role="status">{error}</p>
  </section>;
}
