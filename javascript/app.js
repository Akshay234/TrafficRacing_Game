var ipc = require("electron").ipcRenderer;
console.log($(this).closest('img'));
$(document).keypress(function(e) {
  console.log(e.which);
  if(e.which == 65|| e.which == 97){
    ipc.send('left-key');
      alert('You pressed left!');
  }
  if(e.which == 87|| e.which == 119){
    ipc.send('up-key');
      alert('You pressed up!');
  }
  if(e.which == 68|| e.which == 100){
    ipc.send('right-key');
      alert('You pressed right!');
  }
  if(e.which == 83|| e.which == 115){
    ipc.send('down-key');
      alert('You pressed down!');
  }
});

// closeEl.addEventListener('click', function () {
    // ipc.send('close-main-window');
// });
