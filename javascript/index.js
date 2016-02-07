var ipc = require("electron").ipcRenderer;
var $;
$ = require('jquery');
var onload = function(){
  $('#Start-Game').click(function(){
    ipc.send('start');
  });
}
$.ready(onload);
