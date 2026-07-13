const fs = require("fs");
const path = require("path");

const distDir = path.join(__dirname, "student-machine-player", "dist");
const templateDir = path.join(__dirname, "player-template");
const output = path.join(templateDir, "StudentMachinePlayer.exe");

if (!fs.existsSync(distDir)) {
  console.error("Missing student-machine-player/dist. Build the player first: cd student-machine-player; npm run dist:win");
  process.exit(1);
}

const exe = fs.readdirSync(distDir).find((name) => name.toLowerCase().endsWith(".exe"));
if (!exe) {
  console.error("No .exe found in student-machine-player/dist. Build the player first.");
  process.exit(1);
}

fs.mkdirSync(templateDir, { recursive: true });
fs.copyFileSync(path.join(distDir, exe), output);
console.log(`Copied ${exe} -> player-template/StudentMachinePlayer.exe`);
