const { test } = require('node:test');
const assert = require('node:assert/strict');
const { mkdtempSync, rmSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { join } = require('node:path');
const { openStudio } = require('./storage.cjs');

test('initial setup, authentication and settings persist after reopening SQLite', () => {
  const dir = mkdtempSync(join(tmpdir(), 'sn-studio-'));
  const file = join(dir, 'studio.sqlite');
  const password = 'local-test-only-2026';
  let store = openStudio(file);
  try {
    assert.equal(store.configured(), false);
    assert.equal(store.authenticate('short'), false);
    assert.equal(store.load(), 'SN Group');
    assert.equal(store.authenticate(password), true);
    assert.equal(store.save('  Kho SN  '), 'Kho SN');
    assert.throws(() => store.save(' '));
    store.close();
    store = openStudio(file);
    assert.equal(store.configured(), true);
    assert.equal(store.authenticate('incorrect-password'), false);
    assert.equal(store.authenticate(password), true);
    assert.equal(store.load(), 'Kho SN');
  } finally {
    store.close();
    rmSync(dir, { recursive: true, force: true });
  }
});

test('session draft enforces account and source boundaries and persists', () => {
  const dir = mkdtempSync(join(tmpdir(), 'sn-catalog-'));
  const file = join(dir, 'studio.sqlite');
  let store = openStudio(file);
  try {
    const catalog = store.catalog;
    const [a] = catalog.add({ source: 'affiliate', account: 'A', sku: 'P1', name: 'A product' });
    catalog.add({ source: 'affiliate', account: 'B', sku: 'P1', name: 'B product' });
    const b = catalog.list().find(p => p.account === 'B');
    const sn = catalog.add({ source: 'erp', sku: 'P1', name: 'SN product' }).find(p => p.source === 'erp');
    assert.throws(() => catalog.add({ source: 'affiliate', account: 'A', sku: 'P1', name: 'Duplicate' }));
    const draft = { title: 'Phiên thử', mode: 'mixed', account: 'A', ids: [a.id, sn.id] };
    assert.deepEqual(catalog.save(draft), draft);
    assert.throws(() => catalog.save({ ...draft, ids: [b.id] }));
    assert.throws(() => catalog.save({ ...draft, mode: 'erp' }));
    store.close();
    store = openStudio(file);
    assert.deepEqual(store.catalog.load(), draft);
  } finally {
    store.close();
    rmSync(dir, { recursive: true, force: true });
  }
});
