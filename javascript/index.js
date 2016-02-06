var app = require('app');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');

app.on('ready', function(){
	var mainWindow = new BrowserWindow({
		width: 800,
		height: 600
	});
	var dir = __dirname;
	dir = dir.slice(0,-10);
	mainWindow.loadURL('file://'+ dir + '/html/index.html');
  mainWindow.openDevTools({detach:true});
});

var CarDiv = ['l1', 'l2', 'r1', 'r2'];

ipc.on('right-key',function(){
	console.log('catched right-key');
})


ipc.on('left-key',function(){
	console.log('catched left-key');

})


ipc.on('up-key',function(){
	console.log('catched up-key');

})

ipc.on('down-key',function(){
	console.log('catched down-key');

})
