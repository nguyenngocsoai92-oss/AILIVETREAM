import { useEffect, useState } from 'react';

type HostState = {
  phase: 'idle' | 'speaking' | 'finished' | 'error';
  line: string;
  index?: number;
  total?: number;
  message?: string;
};

declare global {
  interface Window {
    virtualHost: {
      load(): Promise<{ script: string; state: HostState }>;
      save(script: string): Promise<void>;
      show(): Promise<void>;
      play(script: string): Promise<void>;
      stop(): Promise<void>;
      stageState(): Promise<HostState>;
      subscribe(callback: (state: HostState) => void): () => void;
    };
  }
}

const idle: HostState = { phase: 'idle', line: '' };

function Character({ state }: { state: HostState }) {
  return <div className={'host-character ' + (state.phase === 'speaking' ? 'host-speaking' : '')}>
    <div className="host-orbit" />
    <div className="host-headphones" />
    <div className="host-face" role="img" aria-label="Nhân vật MC ảo của SN Group">
      <span className="host-eye left" /><span className="host-eye right" /><span className="host-mouth" />
    </div>
    <div className="host-body"><strong>SN</strong></div>
  </div>;
}

export function HostStage() {
  const [state, setState] = useState(idle);
  useEffect(() => {
    document.title = 'SN AI LIVE STUDIO — MC ảo';
    let active = true;
    let received = false;
    const unsubscribe = window.virtualHost.subscribe(next => { received = true; setState(next); });
    window.virtualHost.stageState().then(next => { if (active && !received) setState(next); }).catch(() => {});
    return () => { active = false; unsubscribe(); };
  }, []);
  return <div className="host-stage">
    <div className="host-stage-title">SN AI LIVE STUDIO</div>
    <Character state={state} />
    <p className="host-caption">{state.line || 'MC ảo SN'}</p>
  </div>;
}

export function VirtualHost() {
  const [script, setScript] = useState('');
  const [state, setState] = useState(idle);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  useEffect(() => {
    let active = true;
    const unsubscribe = window.virtualHost.subscribe(setState);
    window.virtualHost.load().then(result => {
      if (!active) return;
      setScript(result.script);
      setState(result.state);
      setReady(true);
    }).catch(() => { if (active) setNotice('Không đọc được kịch bản đã lưu.'); });
    return () => { active = false; unsubscribe(); };
  }, []);

  async function run(action: () => Promise<void>, message = '') {
    setBusy(true);
    setNotice('');
    try {
      await action();
      setNotice(message);
    } catch (error) {
      setNotice(error instanceof Error ? error.message.replace(/^.*Error: /, '') : 'Thao tác thất bại.');
    } finally {
      setBusy(false);
    }
  }

  return <section className="host-panel">
    <h2>MC ảo</h2>
    <div className="host-panel-layout">
      <div className="host-preview"><Character state={state} /></div>
      <div>
        <label htmlFor="host-script">Kịch bản tiếng Việt · mỗi dòng một đoạn</label>
        <textarea id="host-script" rows={6} maxLength={12000} value={script} disabled={!ready}
          onChange={event => setScript(event.target.value)} />
        <div className="obs-actions">
          <button disabled={!ready || busy} onClick={() => void run(() => window.virtualHost.save(script), 'Đã lưu kịch bản trên máy.')}>Lưu kịch bản</button>
          <button className="secondary" disabled={!ready || busy} onClick={() => void run(() => window.virtualHost.show())}>Mở cửa sổ MC cho OBS</button>
          <button disabled={!ready || busy || !script.trim() || state.phase === 'speaking'}
            onClick={() => void run(() => window.virtualHost.play(script))}>Đọc kịch bản</button>
          <button className="secondary" disabled={state.phase !== 'speaking' && !busy}
            onClick={() => void window.virtualHost.stop().catch(() => setNotice('Không dừng được giọng đọc.'))}>Dừng đọc</button>
        </div>
        <p role="status">{notice || state.message || (state.phase === 'speaking' ?
          'Đang đọc đoạn ' + state.index + '/' + state.total : state.phase === 'finished' ? 'Đã đọc xong.' : '')}</p>
        <p className="note">Dùng giọng tiếng Việt của macOS. Để lên sóng, chọn cửa sổ MC và kiểm tra đường tiếng trong OBS.</p>
      </div>
    </div>
  </section>;
}
