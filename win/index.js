const { BrowserWindow, ipcMain, globalShortcut, Menu } = require('electron');
const moment = require('moment');

// main window

exports.createWindow = (version, closed) => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: true,
    show: false,
    icon: root_name + '/public/favicon.ico',
    webPreferences: { nodeIntegration: true, enableRemoteModule: true, webviewTag: true },
  });

  const startURL = `file://${root_name}/public/index.html`;
  win.loadURL(startURL);
  win.setTitle(`일렉트론리액트 샘플 Ver${version}`);

  setMenu(win);

  win.once('ready-to-show', () => {
    win.show();
    //mainWindow.toggleDevTools();
  });

  win.on('closed', closed);

  ipcMain.on('req', (event, arg) => {
    event.sender.send('res', moment().format('YYYY-MM-DD HH:mm:ss'));
  });

  globalShortcut.register('F10', () => {
    if (win.isMinimized()) win.restore();
    else win.minimize();
  });

  globalShortcut.register('F11', () => {
    if (win.isMaximized()) win.restore();
    else win.maximize();
  });

  return win;
};

const setMenu = (win) => {
  const menu = Menu.buildFromTemplate([
    {
      label: '메뉴',
      submenu: [
        {
          label: '종료',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            com
              .open_confirm('종료', '프로그램을 종료합니다.')
              .then(() => {
                app.quit();
              })
              .catch((e) => {
                console.log('종료 취소함');
              });
          },
        },
        {
          label: '개발툴',
          accelerator: 'F12',
          click: () => {
            //BrowserWindow.getFocusedWindow().toggleDevTools();
            const w = BrowserWindow.getFocusedWindow();
            if (w.isDevToolsOpened()) w.closeDevTools();
            else w.openDevTools({ mode: 'undocked' });
          },
        },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);
  win.setMenu(menu);
};
