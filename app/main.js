const { app, BrowserWindow, clipboard, Menu } = require('electron'),
    path = require('path'),
    url = require('url');
const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS,
} = require('electron-devtools-installer');
const Splashscreen = require('@trodi/electron-splashscreen');

let mainWindow;

const createWindow = () => {
    const config = {
        windowOpts: {
            width: 1200,
            height: 800,
            webPreferences: {
                nodeIntegration: true,
            },
        },
        templateUrl: `${__dirname}/splash-screen.html`, // ${__dirname} == Users/egomez/AtlassianDev/stroke/app
        splashScreenOpts: {
            width: 1200,
            height: 800,
        },
    };

    installExtension(REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`Added Extension: ${name}`))
        .catch((err) => console.log('An error occured: ', err));

    mainWindow = Splashscreen.initSplashScreen(config);

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file:',
            slashes: true,
        })
    );

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    var template = [
        {
            label: 'Application',
            submenu: [
                {
                    label: 'About Application',
                    selector: 'orderFrontStandardAboutPanel:',
                },
                { type: 'separator' },
                {
                    label: 'Quit',
                    accelerator: 'Command+Q',
                    click: function () {
                        app.quit();
                    },
                },
            ],
        },
        {
            label: 'Edit',
            submenu: [
                {
                    label: 'Undo',
                    accelerator: 'CmdOrCtrl+Z',
                    selector: 'undo:',
                },
                {
                    label: 'Redo',
                    accelerator: 'Shift+CmdOrCtrl+Z',
                    selector: 'redo:',
                },
                { type: 'separator' },
                { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
                {
                    label: 'Copy',
                    accelerator: 'CmdOrCtrl+C',
                    selector: 'copy:',
                },
                {
                    label: 'Paste',
                    accelerator: 'CmdOrCtrl+V',
                    selector: 'paste:',
                },
                {
                    label: 'Select All',
                    accelerator: 'CmdOrCtrl+A',
                    selector: 'selectAll:',
                },
            ],
        },
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
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

require('electron-debug')();
