var app = require('app');
var BrowserWindow = require('browser-window');
var ipc = require('electron').ipcMain;
var ipcRenderer = require('electron').ipcMain;
var dialog = require('dialog');

var dialogBoxCreator = function(buttons, message){
  var DialogBoxOptions = {
    buttons: buttons,
    message: message,
  };
  return DialogBoxOptions;
}

var mainPage = function(){
    var mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });
    var _dir = __dirname;
    _dir = _dir.slice(0,-10);
    mainWindow.loadURL('file://'+ _dir + '/html/index.html');
   mainWindow.openDevTools({detach:true});

// ------------------------Start req ----------------------------------//

   ipc.on('start', function(event,arg){
     mainWindow.loadURL('file://'+ _dir + '/html/racing.html');
   });

//------------------------End req ----------------------------------//
   ipc.on('game-over',function(event){
     dialogBoxOptions = {
       buttons: ['Restart','Quit'],
       message: 'Game-over',
     };
     dialog.showMessageBox(dialogBoxOptions,function(res){
       if(res == 0){
         mainWindow.loadURL('file://'+ _dir + '/html/racing.html')
       }
       if(res == 1){
         app.exit(0);
       }
     });
   });
};

app.on('ready', mainPage);
