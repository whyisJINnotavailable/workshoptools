# CyberBlock Lab / WorkshopTools

This repository contains the source files for the CyberBlock Lab workshop app.

Students use `WorkshopTools.exe` to build a three-stage encryption machine. Then they click **Export App** to generate a presentation app folder containing:

```text
Dragon Lock.exe
machine.cyberblock
```

The exported `Dragon Lock.exe` is the user-facing app: plain message input on the left, three encryption/animation boxes in the middle, and cipher message output on the right.

---

## What should be pushed to GitHub

Push the source files only:

```text
index.html
script.js
style.css
main.js
preload.js
package.json
copy-player-template.js
README.md
.gitignore
assets/sounds/README_SOUNDS.txt
player-template/README_PLACE_PLAYER_EXE_HERE.txt
student-machine-player/player.html
student-machine-player/player.css
student-machine-player/player.js
student-machine-player/player-main.js
student-machine-player/player-preload.js
student-machine-player/package.json
student-machine-player/machine.cyberblock
```

Do **not** push these generated files/folders:

```text
node_modules/
dist/
*.exe
player-template/StudentMachinePlayer.exe
exported student app folders
```

The `.gitignore` file already blocks the heavy/generated files.

---

## Folder structure

```text
CyberBlock-Lab/
├─ index.html
├─ script.js
├─ style.css
├─ main.js
├─ preload.js
├─ package.json
├─ copy-player-template.js
├─ assets/
│  └─ sounds/
│     └─ README_SOUNDS.txt
├─ player-template/
│  └─ README_PLACE_PLAYER_EXE_HERE.txt
└─ student-machine-player/
   ├─ player.html
   ├─ player.css
   ├─ player.js
   ├─ player-main.js
   ├─ player-preload.js
   ├─ package.json
   └─ machine.cyberblock
```

---

## First-time setup

Open this folder in VS Code. Then open the VS Code terminal in the project root.

Install the main WorkshopTools dependencies:

```powershell
npm install
```

Build the small exported-player app first:

```powershell
cd student-machine-player
npm install
npm run dist:win
cd ..
```

Copy the generated player EXE into the template folder:

```powershell
npm run copy:player
```

After this command, check:

```powershell
dir .\player-template
```

You should see:

```text
StudentMachinePlayer.exe
```

---

## Test in development mode

Run the builder app without creating the final EXE yet:

```powershell
npm start
```

Inside WorkshopTools:

```text
1. Build blocks in Tab 1, Tab 2, and Tab 3.
2. Click Run.
3. Click Export App.
4. Open the exported folder.
5. Double-click Dragon Lock.exe.
6. Type a plain message and click Encrypt.
```

---

## Build WorkshopTools.exe

Only do this after `npm start` and `Export App` are working.

```powershell
npm run dist:win
```

Then open:

```powershell
explorer .\dist
```

The `WorkshopTools.exe` inside `dist` is the app you can give to students.

---

## Correct build order

Use this order whenever you download/clone this repo again:

```powershell
npm install
cd student-machine-player
npm install
npm run dist:win
cd ..
npm run copy:player
npm start
npm run dist:win
```

Important: `player-template/StudentMachinePlayer.exe` must exist before building the final WorkshopTools EXE. If it is missing, **Export App** cannot create the final student presentation app correctly.

---

## Student workflow

Students should receive only the final built app:

```text
WorkshopTools.exe
```

Students use it like this:

```text
1. Open WorkshopTools.exe.
2. Build three encryption stages.
3. Click Run to test.
4. Click Export App.
5. Keep Dragon Lock.exe and machine.cyberblock in the same exported folder.
6. Open Dragon Lock.exe to present the encryption process.
```

Do not separate these two files:

```text
Dragon Lock.exe
machine.cyberblock
```

If they are separated, the player may show:

```text
No machine loaded yet.
```

---

## Known test case

Use this to check whether the three-stage pipeline works.

### Tab 1

```text
Start with message: HELLO CYBER
Ready: Reverse
Send message to Tab 2
```

### Tab 2

```text
Receive message from Tab 1
Ready: Swap pairs
Send message to Tab 3
```

### Tab 3

```text
Receive message from Tab 2
Ready: Caesar shift
Input: 3
Show message
```

Expected result:

```text
HUBE FORHOK
```

---

## Sound effects

Optional MP3 files can be placed here:

```text
assets/sounds/block-connect.mp3
assets/sounds/block-trash.mp3
```

If the files are missing, the app still works silently.

---

## Current features

```text
- Three workspace tabs: Input Lock, Middle Lock, Final Lock
- Send message / Receive message event blocks
- Save / Load / Export / Import / Clear
- Export App: creates Dragon Lock.exe + machine.cyberblock
- Run Log popup
- Simple animation v1 in the exported player
- Detection rule:
  75% and above = auto detected
  60%–74% = suggested
  below 60% = custom lock
```
