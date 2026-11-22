const { app, BrowserWindow, ipcMain } = require('electron');
const { join } = require('node:path');
const { openStudio } = require('./storage.cjs');

let window;
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
  window.on('closed', () => { window = undefined; unlocked = false; });
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
    handle('studio:logout', () => { unlocked = false; });
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
