const { DatabaseSync } = require('node:sqlite');
const { openCatalog } = require("./catalog.cjs");
const { randomBytes, scryptSync, timingSafeEqual } = require('node:crypto');

function openStudio(path) {
  const db = new DatabaseSync(path);
  db.exec(`
    CREATE TABLE IF NOT EXISTS administrator (
      id INTEGER PRIMARY KEY CHECK (id = 1), salt TEXT NOT NULL, verifier BLOB NOT NULL
    );
    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY CHECK (id = 1), name TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS host_script (
      id INTEGER PRIMARY KEY CHECK (id = 1), script TEXT NOT NULL
    );
    INSERT OR IGNORE INTO settings VALUES (1, 'SN Group');
  `);
  return {
    catalog: openCatalog(db),
    configured: () => Boolean(db.prepare('SELECT id FROM administrator').get()),
    authenticate(password) {
      if (typeof password !== 'string' || password.length < 12 || password.length > 128) return false;
      const existing = db.prepare('SELECT salt, verifier FROM administrator').get();
      if (existing) return timingSafeEqual(scryptSync(password, existing.salt, 64), existing.verifier);
      const salt = randomBytes(24).toString('hex');
      db.prepare('INSERT INTO administrator VALUES (1, ?, ?)').run(salt, scryptSync(password, salt, 64));
      return true;
    },
    load: () => db.prepare('SELECT name FROM settings WHERE id = 1').get().name,
    save(name) {
      if (typeof name !== 'string' || !name.trim() || name.trim().length > 80) throw new Error('Invalid name');
      const cleaned = name.trim();
      db.prepare('UPDATE settings SET name = ? WHERE id = 1').run(cleaned);
      return cleaned;
    },
    loadHostScript: () => db.prepare('SELECT script FROM host_script WHERE id = 1').get()?.script ?? '',
    saveHostScript: script => db.prepare(
      'INSERT INTO host_script VALUES (1, ?) ON CONFLICT(id) DO UPDATE SET script = excluded.script'
    ).run(script),
    close: () => db.close(),
  };
}
module.exports = { openStudio };
