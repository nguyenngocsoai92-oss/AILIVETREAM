const { app, BrowserWindow, ipcMain } = require('electron');
const { join } = require('node:path');
const { ObsConnection } = require('./obs.cjs');
const obs = new ObsConnection();
const { HostSpeech, normalizeScript } = require('./host.cjs');
let window;
let stage;
const host = new HostSpeech(state => {
  for (const target of [window, stage]) {
    if (target && !target.isDestroyed()) target.webContents.send('host:state', state);
  }
});

function endHostSession() {
  host.stop();
  stage?.close();
}

async function openHostStage() {
  if (stage) {
    stage.focus();
    return;
  }
  const view = new BrowserWindow({
    width: 540,
    height: 760,
    autoHideMenuBar: true,
    backgroundColor: '#142443',
    webPreferences: {
      preload: join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      sandbox: true,
      nodeIntegration: false,
    },
  });
  stage = view;
  view.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  view.webContents.on('will-navigate', event => event.preventDefault());
  view.webContents.on('did-finish-load', () => view.webContents.send('host:state', host.state));
  view.on('closed', () => { stage = undefined; });
  try {
    await view.loadFile(join(__dirname, 'dist', 'index.html'), { hash: 'host-stage' });
  } catch (error) {
    view.close();
    throw error;
  }
}
const { openStudio } = require('./storage.cjs');

let studio;
let unlocked = false;
let retryAt = 0;

function handle(channel, operation) {
  ipcMain.handle(channel, (event, value) => {
    if (!window || event.sender !== window.webContents || event.senderFrame !== window.webContents.mainFrame) {
      throw new Error('Unauthorized sender');
    }
    return operation(value);
  });
}

function createWindow() {
  unlocked = false;
  window = new BrowserWindow({
    width: 1050,
    height: 740,
    minWidth: 650,
    minHeight: 530,
    webPreferences: {
      preload: join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      sandbox: true,
      nodeIntegration: false,
    },
  });
  window.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  window.webContents.on('will-navigate', event => event.preventDefault());
  window.on('closed', () => { window = undefined; unlocked = false; obs.disconnect(); endHostSession(); });
  return window.loadFile(join(__dirname, 'dist', 'index.html'));
}

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.whenReady().then(async () => {
    studio = openStudio(join(app.getPath('userData'), 'studio.sqlite'));
    handle('studio:configured', () => studio.configured());
    handle('studio:login', password => {
      if (Date.now() < retryAt) return false;
      unlocked = studio.authenticate(password);
      if (!unlocked) retryAt = Date.now() + 1500;
      return unlocked;
    });
    handle('studio:logout', () => { unlocked = false; obs.disconnect(); endHostSession(); });
    handle('studio:load', () => {
      if (!unlocked) throw new Error('Sign in required');
      return studio.load();
    });
    handle('studio:save', name => {
      if (!unlocked) throw new Error('Sign in required');
      return studio.save(name);
    });
    for (const action of ['list', 'add', 'load', 'save']) {
      handle('catalog:' + action, input => {
        if (!unlocked) throw new Error('Sign in required');
        return studio.catalog[action](input);
      });
    }
    for (const action of ['connect', 'disconnect', 'status', 'switchScene', 'stream']) {
      handle('obs:' + action, input => {
        if (!unlocked) throw new Error('Cần đăng nhập quản trị.');
        return obs[action](input);
      });
    }
    const hostOperations = {
      load: () => ({ script: studio.loadHostScript(), state: host.state }),
      save: script => {
        normalizeScript(script);
        studio.saveHostScript(script);
      },
      show: openHostStage,
      play: script => host.play(script),
      stop: () => host.stop(),
    };
    for (const [action, operation] of Object.entries(hostOperations)) {
      handle('host:' + action, input => {
        if (!unlocked) throw new Error('Cần đăng nhập quản trị.');
        return operation(input);
      });
    }
    // The output window can read playback status, but cannot control speech or studio settings.
    ipcMain.handle('host:stageState', event => {
      if (!stage || event.sender !== stage.webContents || event.senderFrame !== stage.webContents.mainFrame) {
        throw new Error('Unauthorized stage');
      }
      return host.state;
    });
    await createWindow();
    if (process.argv.includes('--smoke-test')) {
      const heading = await window.webContents.executeJavaScript('new Promise(resolve => { const check = () => { const title = document.querySelector("h1"); if (title) resolve(title.textContent); else requestAnimationFrame(check); }; check(); setTimeout(() => resolve(null), 5000); })');
      if (heading !== 'SN AI LIVE STUDIO') throw new Error('Renderer did not mount');
      app.quit();
    }
  }).catch(error => { console.error(error); app.exit(1); });
  app.on('activate', () => {
    if (studio && !window) createWindow().catch(error => { console.error(error); app.exit(1); });
  });
  app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
  app.on('will-quit', () => studio?.close());
}
