const { randomUUID } = require('node:crypto');

function openCatalog(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS manual_products (
      id TEXT PRIMARY KEY, source TEXT NOT NULL, account TEXT NOT NULL,
      sku TEXT NOT NULL, name TEXT NOT NULL,
      UNIQUE (source, account, sku)
    );
    CREATE TABLE IF NOT EXISTS live_preparation (
      id INTEGER PRIMARY KEY CHECK (id = 1), snapshot TEXT NOT NULL
    );
  `);
  const products = () => db.prepare('SELECT * FROM manual_products ORDER BY name, sku').all();
  const text = (value, max) => {
    if (typeof value !== 'string' || !value.trim() || value.trim().length > max) {
      throw new Error('Dữ liệu thiếu hoặc quá dài.');
    }
    return value.trim();
  };
  return {
    list: products,
    add(input) {
      if (!input || !['affiliate', 'erp'].includes(input.source)) throw new Error('Nguồn hàng không hợp lệ.');
      const account = input.source === 'affiliate' ? text(input.account, 80) : '';
      const sku = text(input.sku, 80);
      const name = text(input.name, 160);
      const result = db.prepare('INSERT OR IGNORE INTO manual_products VALUES (?, ?, ?, ?, ?)')
        .run(randomUUID(), input.source, account, sku, name);
      if (!result.changes) throw new Error('Mã SKU đã có trong nguồn và tài khoản này.');
      return products();
    },
    load() {
      const row = db.prepare('SELECT snapshot FROM live_preparation WHERE id = 1').get();
      return row ? JSON.parse(row.snapshot) : null;
    },
    save(input) {
      if (!input || !['affiliate', 'erp', 'mixed'].includes(input.mode) ||
          !Array.isArray(input.ids) || input.ids.length === 0 || input.ids.length > 100 ||
          new Set(input.ids).size !== input.ids.length) throw new Error('Chọn từ 1 đến 100 sản phẩm khác nhau.');
      const account = input.mode === 'erp' ? '' : text(input.account, 80);
      const available = new Map(products().map(product => [product.id, product]));
      const selected = input.ids.map(id => {
        const product = available.get(id);
        if (!product || (input.mode !== 'mixed' && input.mode !== product.source) ||
            (product.source === 'affiliate' && product.account !== account)) {
          throw new Error('Sản phẩm không thuộc nguồn hoặc tài khoản của phiên.');
        }
        return product;
      });
      const snapshot = { title: text(input.title, 120), account, mode: input.mode, ids: selected.map(p => p.id) };
      db.prepare('INSERT INTO live_preparation VALUES (1, ?) ON CONFLICT(id) DO UPDATE SET snapshot = excluded.snapshot')
        .run(JSON.stringify(snapshot));
      return snapshot;
    },
  };
}

module.exports = { openCatalog };
