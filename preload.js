const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("cyberblock", {
  exportMachineApp: (payload) => ipcRenderer.invoke("export-machine-app", payload)
});
