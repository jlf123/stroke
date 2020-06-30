const { app, BrowserWindow, clipboard, Menu } = require('electron')
const path = require('path')
const url = require('url')
const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS,
    REDUX_DEVTOOLS
} = require('electron-devtools-installer')
const Splashscreen = require('@trodi/electron-splashscreen')
const { autoUpdater } = require('electron-updater')

let mainWindow

const createWindow = () => {
    const config = {
        windowOpts: {
            width: 1200,
            height: 800,
            webPreferences: {
                nodeIntegration: true,
                webSecurity: false
            }
        },
        // skip the splash screen if the tests are running
        templateUrl: `${__dirname}/build/splash-screen/index.html`,
        splashScreenOpts: {
            width: 1200,
            height: 800
        }
    }

    mainWindow = process.env.SPECTRON
        ? new BrowserWindow({ ...config.windowOpts })
        : Splashscreen.initSplashScreen(config)

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file:',
            slashes: true
        })
    )

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    mainWindow.once('ready-to-show', () => {
        autoUpdater.checkForUpdatesAndNotify()
    })

    const template = [
        {
            label: 'Application',
            submenu: [
                {
                    label: 'About Application',
                    selector: 'orderFrontStandardAboutPanel:'
                },
                { type: 'separator' },
                {
                    label: 'Quit',
                    accelerator: 'Command+Q',
                    click: function () {
                        app.quit()
                    }
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {
                    label: 'Undo',
                    accelerator: 'CmdOrCtrl+Z',
                    selector: 'undo:'
                },
                {
                    label: 'Redo',
                    accelerator: 'Shift+CmdOrCtrl+Z',
                    selector: 'redo:'
                },
                { type: 'separator' },
                { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
                {
                    label: 'Copy',
                    accelerator: 'CmdOrCtrl+C',
                    selector: 'copy:'
                },
                {
                    label: 'Paste',
                    accelerator: 'CmdOrCtrl+V',
                    selector: 'paste:'
                },
                {
                    label: 'Select All',
                    accelerator: 'CmdOrCtrl+A',
                    selector: 'selectAll:'
                }
            ]
        }
    ]

    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}

// this is fired when Electron finishes initialization
// then we create the window
app.on('ready', createWindow)

// this gets triggered only on macOS, it happens when we click
// on the application's doc or taskbar icon, if no windows exist
// then we create one.
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

if (!process.env.SPECTRON) {
    require('electron-debug')()
}
