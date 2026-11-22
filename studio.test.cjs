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
