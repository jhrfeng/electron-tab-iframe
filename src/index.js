const { app, BrowserWindow,screen,shell } = require('electron');
const path = require('path');

try {
	require('electron-reloader')(module);
} catch {}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow = null

const createWindow = () => {
  // 获取屏幕尺寸
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  // 打印要跳转的链接地址
  console.log('获取屏幕尺寸&&&&&&&&&&&:', width, height)

  mainWindow = new BrowserWindow({
    width,
    height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true
    }
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    console.log("setWindowOpenHandler", url)
    return { action: 'deny' }
  })

  mainWindow.webContents.on('will-frame-navigate', (event, url, isMainFrame, frame) => {
    console.log('will-frame-navigate:', url, isMainFrame, frame)
  })

  mainWindow.webContents.on('will-navigate', (event, url, isSameDocument, isMainFrame, frame) => {
    console.log('will-navigate:', url, isSameDocument, isMainFrame, frame)
  })

  mainWindow.webContents.on('did-frame-finish-load', (event, isMainFrame) => {
    console.log('did-frame-finish-load:', event, isMainFrame)
  })

  mainWindow.loadFile(path.join(__dirname, 'index.html'));


  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();
});



// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  console.log("==============active", BrowserWindow.getAllWindows().length)
});

app.on('web-contents-created', (event, contents) => {
  contents.setWindowOpenHandler(({ url }) => {
    console.log("setWindowOpenHandler 2", url)
    if (url === 'about:blank') {
      return {
        action: 'allow',
        overrideBrowserWindowOptions: {
          frame: false,
          fullscreenable: false,
          backgroundColor: 'black',
          webPreferences: {

          }
        }
      }
    }
    return { action: 'deny' }
  })

})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
