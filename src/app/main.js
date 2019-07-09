import { app, BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';
import os from 'os';
import Splashscreen from '@trodi/electron-splashscreen';

let mainWindow;

const createWindow = () => {
    const config = {
        windowOpts: {
            width: 1200,
            height: 800,
            webPreferences: {
                nodeIntegration: true
            }
        },
        templateUrl: `${__dirname}/splash-screen.html`, // ${__dirname} == Users/egomez/AtlassianDev/stroke/app
        splashScreenOpts: {
            width: 1200,
            height: 800
        }
    };

    mainWindow = Splashscreen.initSplashScreen(config);

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file:',
            slashes: true
        })
    );

    BrowserWindow.addDevToolsExtension(
        path.join(
            os.homedir(),
            'Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.6.0_0'
        )
    );

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    /*

    let template = [{
        label: "Application",
        submenu: [
            { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
            { type: "separator" },
            { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
        ]}, {
        label: "Edit",
        submenu: [
            { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
            { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
            { type: "separator" },
            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
            { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]}
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
    */
};

// this is fired when Electron finishes initialization
// then we create the window
app.on('ready', createWindow);

// this event is emitted when all the windows are closed.
// we don't quite the program for macOS, OS X applications usually
// stay active until the user quit explicitly
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// this gets triggered only on macOS, it happens when we click
// on the application's doc or taskbar icon, if no windows exist
// then we create one.
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
