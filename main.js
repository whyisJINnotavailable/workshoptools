const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("path");
const fs = require("fs");

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1100,
    minHeight: 700,
    backgroundColor: "#fffaf0",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile(path.join(__dirname, "index.html"));
}

function sanitizeName(value) {
  return String(value || "Student Secret Machine")
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80) || "Student Secret Machine";
}

function getResourcePath(...parts) {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, ...parts);
  }
  return path.join(__dirname, ...parts);
}

ipcMain.handle("export-machine-app", async (_event, payload) => {
  try {
    const machineName = sanitizeName(payload?.machineName || "Student Secret Machine");
    const project = payload?.project;
    if (!project || typeof project !== "object") {
      throw new Error("Missing machine project data.");
    }

    const downloadsDir = app.getPath("downloads");
    const folderName = `${machineName} App`;
    let outputDir = path.join(downloadsDir, folderName);
    let suffix = 1;
    while (fs.existsSync(outputDir)) {
      suffix += 1;
      outputDir = path.join(downloadsDir, `${folderName} ${suffix}`);
    }
    fs.mkdirSync(outputDir, { recursive: true });

    const templateExe = getResourcePath("player-template", "StudentMachinePlayer.exe");
    const machineFile = path.join(outputDir, "machine.cyberblock");
    const readmeFile = path.join(outputDir, "README.txt");
    const outputExe = path.join(outputDir, `${machineName}.exe`);

    fs.writeFileSync(machineFile, JSON.stringify(project, null, 2), "utf8");
    fs.writeFileSync(readmeFile, [
      `${machineName}`,
      "",
      "Open the EXE in this folder to present the student's encryption machine.",
      "Keep machine.cyberblock in the same folder as the EXE.",
      "The EXE reads machine.cyberblock to run the student's three-stage encryption process.",
      "",
      "If you move the EXE without machine.cyberblock, it cannot load the student's machine."
    ].join("\r\n"), "utf8");

    if (!fs.existsSync(templateExe)) {
      throw new Error(`Player template is missing: ${templateExe}`);
    }
    fs.copyFileSync(templateExe, outputExe);

    await shell.openPath(outputDir);
    return { ok: true, outputDir, folderName: path.basename(outputDir), exeName: path.basename(outputExe) };
  } catch (error) {
    return { ok: false, message: error?.message || String(error) };
  }
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
