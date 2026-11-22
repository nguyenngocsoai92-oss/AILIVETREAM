const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('studio', {
  configured: () => ipcRenderer.invoke('studio:configured'),
  login: password => ipcRenderer.invoke('studio:login', password),
  logout: () => ipcRenderer.invoke('studio:logout'),
  load: () => ipcRenderer.invoke('studio:load'),
  save: name => ipcRenderer.invoke('studio:save', name),
});

contextBridge.exposeInMainWorld('catalog', {
  list: () => ipcRenderer.invoke('catalog:list'),
  add: input => ipcRenderer.invoke('catalog:add', input),
  load: () => ipcRenderer.invoke('catalog:load'),
  save: input => ipcRenderer.invoke('catalog:save', input),
});
