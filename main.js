const { app, Tray, Menu } = require('electron');

const main_win = require('./win');

global.root_name = __dirname;

let win;
const isMac = process.platform === 'darwin';

const single_instance = app.requestSingleInstanceLock();
if (!single_instance) {
  app.quit();
  app.exit();
}

app.on('ready', () => {
  win = main_win.createWindow(app.getVersion(), closed);
});

app.on('window-all-closed', () => {
  if (!isMac) app.quit();
});
app.on('activate', () => {
  if (win === null) win = main_win.createWindow(app.getVersion(), closed);
});

let tray = null;
app.whenReady().then(() => {
  tray = new Tray(root_name + '/public/favicon.ico');
  tray.on('click', () => {
    win.show();
  });
  win.on('close', (event) => {});

  const contextMenu = Menu.buildFromTemplate([
    {
      label: '종료',
      type: 'normal',
      checked: true,
      click: () => {
        tray.destroy();
        tray = null;
        app.quit();
      },
    },
  ]);
  tray.setToolTip('This is my application.');
  tray.setContextMenu(contextMenu);
});

const closed = (e) => {
  tray.destroy();
  tray = null;
  win = null;
};
