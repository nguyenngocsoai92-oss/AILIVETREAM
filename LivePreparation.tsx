import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';

type Source = 'affiliate' | 'erp';
type ProductDraft = { source: Source; account: string; sku: string; name: string };
type Product = ProductDraft & { id: string };
type Session = { title: string; account: string; mode: Source | 'mixed'; ids: string[] };

declare global {
  interface Window {
    catalog: {
      list(): Promise<Product[]>;
      add(input: ProductDraft): Promise<Product[]>;
      load(): Promise<Session | null>;
      save(input: Session): Promise<Session>;
    };
  }
}

const blankProduct: ProductDraft = { source: 'affiliate', account: '', sku: '', name: '' };
const blankSession: Session = { title: '', account: '', mode: 'mixed', ids: [] };

export function LivePreparation() {
  const [products, setProducts] = useState<Product[]>([]);
  const [draft, setDraft] = useState(blankProduct);
  const [session, setSession] = useState(blankSession);
  const [notice, setNotice] = useState('');
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    Promise.all([window.catalog.list(), window.catalog.load()]).then(([items, saved]) => {
      setProducts(items);
      setSession(saved ?? blankSession);
      setReady(true);
    }).catch(() => setNotice('Không đọc được danh mục sản phẩm.'));
  }, []);

  const visible = products.filter(product =>
    (session.mode === 'mixed' || product.source === session.mode) &&
    (product.source === 'erp' || product.account === session.account.trim()));

  async function add(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    try {
      setProducts(await window.catalog.add(draft));
      setDraft(current => ({ ...current, sku: '', name: '' }));
      setNotice('Đã thêm sản phẩm thủ công.');
    } catch (error) {
      setNotice(error instanceof Error ? error.message.replace(/^.*Error: /, '') : 'Không thêm được sản phẩm.');
    } finally {
      setBusy(false);
    }
  }

  async function save(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    try {
      setSession(await window.catalog.save(session));
      setNotice('Đã lưu bản nháp phiên LIVE trên máy này.');
    } catch (error) {
      setNotice(error instanceof Error ? error.message.replace(/^.*Error: /, '') : 'Không lưu được bản nháp.');
    } finally {
      setBusy(false);
    }
  }

  const sourceName = (source: Source) => source === 'erp' ? 'Kho SN' : 'Affiliate';

  return <div className="workspace">
    <section>
      <h2>Danh mục sản phẩm</h2>
      <p className="note">Nhập thủ công. Giá, tồn kho và listing chưa được xác minh.</p>
      <form onSubmit={add}>
        <label>Nguồn hàng <select value={draft.source} onChange={event => setDraft({ ...draft, source: event.target.value as Source })}>
          <option value="affiliate">Affiliate</option><option value="erp">Kho SN</option>
        </select></label>
        {draft.source === 'affiliate' && <label>Tài khoản Affiliate <input required maxLength={80} value={draft.account} onChange={event => setDraft({ ...draft, account: event.target.value })} /></label>}
        <label>Mã SKU <input required maxLength={80} value={draft.sku} onChange={event => setDraft({ ...draft, sku: event.target.value })} /></label>
        <label>Tên sản phẩm <input required maxLength={160} value={draft.name} onChange={event => setDraft({ ...draft, name: event.target.value })} /></label>
        <button disabled={!ready || busy}>Thêm sản phẩm</button>
      </form>
      {products.length === 0 ? <p>Chưa có sản phẩm.</p> :
        <ul>{products.map(p => <li key={p.id}>{p.name} · {p.sku} · {sourceName(p.source)}{p.account && ' · ' + p.account}</li>)}</ul>}
    </section>
    <section>
      <h2>Chuẩn bị phiên LIVE</h2>
      <form onSubmit={save}>
        <label>Tên phiên <input required maxLength={120} value={session.title} onChange={event => setSession({ ...session, title: event.target.value })} /></label>
        <label>Chế độ nguồn <select value={session.mode} onChange={event => setSession({ ...session, mode: event.target.value as Session['mode'], ids: [] })}>
          <option value="mixed">Kết hợp</option><option value="affiliate">Affiliate</option><option value="erp">Kho SN</option>
        </select></label>
        {session.mode !== 'erp' && <label>Tài khoản Affiliate <input required maxLength={80} value={session.account} onChange={event => setSession({ ...session, account: event.target.value, ids: [] })} /></label>}
        <fieldset>
          <legend>Sản phẩm trong phiên</legend>
          {visible.length === 0 && <p>Chưa có sản phẩm phù hợp với nguồn và tài khoản đã chọn.</p>}
          {visible.map(p => <label className="product-option" key={p.id}>
            <input type="checkbox" checked={session.ids.includes(p.id)} onChange={event => {
              const checked = event.target.checked;
              setSession(current => ({ ...current, ids: checked ? [...current.ids, p.id] : current.ids.filter(id => id !== p.id) }));
            }} /> {p.name} · {p.sku} · {sourceName(p.source)}
          </label>)}
        </fieldset>
        <button disabled={!ready || busy || session.ids.length === 0}>Lưu bản nháp phiên</button>
      </form>
    </section>
    <p role="status">{notice}</p>
  </div>;
}
