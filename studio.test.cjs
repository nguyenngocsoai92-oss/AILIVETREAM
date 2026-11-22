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

test('OBS handshake and stream commands require explicit confirmation', async () => {
  const { ObsConnection } = require('./obs.cjs');
  const { createHash } = require('node:crypto');
  const commands = [];
  let active = false;
  let scene = 'Intro';
  class Socket extends EventTarget {
    readyState = 1;
    respond(op, d) {
      queueMicrotask(() => this.dispatchEvent(new MessageEvent('message', { data: JSON.stringify({ op, d }) })));
    }
    send(frame) {
      const { op, d } = JSON.parse(frame);
      if (op === 1) {
        const hash = value => createHash('sha256').update(value).digest('base64');
        assert.equal(d.authentication, hash(hash('secret-salt') + 'challenge'));
        this.respond(2, { negotiatedRpcVersion: 1 });
        return;
      }
      const { requestType, requestId, requestData } = d;
      commands.push(requestType);
      if (requestType === 'StartStream') active = true;
      if (requestType === 'StopStream') active = false;
      if (requestType === 'SetCurrentProgramScene') scene = requestData.sceneName;
      const responseData = requestType === 'GetStreamStatus' ?
        { outputActive: active, outputReconnecting: false } :
        { currentProgramSceneName: scene, scenes: [{ sceneName: 'Intro' }, { sceneName: 'Product' }] };
      this.respond(7, { requestId, requestStatus: { result: true }, responseData });
    }
    close() { this.readyState = 3; this.dispatchEvent(new Event('close')); }
  }
  const socket = new Socket();
  const obs = new ObsConnection(url => {
    assert.equal(url, 'ws://127.0.0.1:4455');
    socket.respond(0, { authentication: { salt: '-salt', challenge: 'challenge' } });
    return socket;
  });
  await obs.connect({ port: 4455, password: 'secret' });
  await assert.rejects(obs.stream({ action: 'start' }));
  assert.deepEqual(commands, []);
  assert.equal((await obs.switchScene('Product')).scene, 'Product');
  assert.equal((await obs.stream({ action: 'start', confirmed: true })).active, true);
  assert.equal((await obs.stream({ action: 'stop', confirmed: true })).active, false);
  socket.close();
  assert.deepEqual(await obs.status(), { connected: false });
});
