const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('studio', {
  configured: () => ipcRenderer.invoke('studio:configured'),
  login: password => ipcRenderer.invoke('studio:login', password),
  logout: () => ipcRenderer.invoke('studio:logout'),
  load: () => ipcRenderer.invoke('studio:load'),
  save: name => ipcRenderer.invoke('studio:save', name),
});
