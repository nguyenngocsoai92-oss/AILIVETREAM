import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { createRoot } from 'react-dom/client';
import './studio.css';
import { LivePreparation } from './LivePreparation';

declare global {
  interface Window {
    studio: {
      configured(): Promise<boolean>;
      login(password: string): Promise<boolean>;
      logout(): Promise<void>;
      load(): Promise<string>;
      save(name: string): Promise<string>;
    };
  }
}

function App() {
  const [configured, setConfigured] = useState<boolean>();
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    window.studio.configured().then(setConfigured).catch(() => setStatus('Không đọc được dữ liệu ứng dụng.'));
  }, []);

  async function signIn(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setStatus('');
    try {
      if (!await window.studio.login(password)) {
        setStatus('Đăng nhập chưa thành công. Kiểm tra mật khẩu và thử lại sau vài giây.');
        return;
      }
      setConfigured(true);
      setName(await window.studio.load());
      setUnlocked(true);
    } catch {
      setStatus('Ứng dụng không thể đăng nhập. Hãy mở lại và thử lại.');
    } finally {
      setPassword('');
      setBusy(false);
    }
  }

  async function save(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    try {
      setName(await window.studio.save(name));
      setStatus('Đã lưu cấu hình trên máy này.');
    } catch {
      setStatus('Không lưu được. Tên cần có từ 1 đến 80 ký tự.');
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    try {
      await window.studio.logout();
      setUnlocked(false);
      setName('');
      setStatus('');
    } catch {
      setStatus('Không thể đăng xuất. Hãy đóng ứng dụng.');
    }
  }

  return <main>
    <header><div className="brand">SN</div><h1>SN AI LIVE STUDIO</h1></header>
    {configured === undefined ? <p>{status || 'Đang tải dữ liệu cục bộ…'}</p> : unlocked ?
      <section>
        <div className="heading"><h2>Cấu hình studio</h2><button className="secondary" onClick={signOut} disabled={busy}>Đăng xuất</button></div>
        <form onSubmit={save}>
          <label htmlFor="studio-name">Tên studio</label>
          <input id="studio-name" value={name} maxLength={80} required onChange={event => setName(event.target.value)} />
          <button disabled={busy || !name.trim()}>Lưu cấu hình</button>
        </form>
        <p className="note">TikTok Shop, Shopee, ERP và OBS chưa được kết nối trong phiên bản này.</p>
      </section> :
      <section>
        <h2>{configured ? 'Đăng nhập quản trị' : 'Thiết lập quản trị trên máy này'}</h2>
        <form onSubmit={signIn}>
          <label htmlFor="password">Mật khẩu cục bộ {configured ? '' : '(tối thiểu 12 ký tự)'}</label>
          <input id="password" type="password" autoComplete={configured ? 'current-password' : 'new-password'} minLength={12} maxLength={128} required value={password} onChange={event => setPassword(event.target.value)} />
          <button disabled={busy}>{configured ? 'Đăng nhập' : 'Tạo quản trị viên'}</button>
        </form>
      </section>}
    {configured !== undefined && <p role="status">{status}</p>}
    {unlocked && <LivePreparation />}
  </main>;
}

createRoot(document.getElementById('root')!).render(<App />);
