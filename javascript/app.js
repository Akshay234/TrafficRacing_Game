// var ipc = require("electron").ipcRenderer;

var carDiv = ['l1', 'l2', 'r1', 'r2'];

$(document).keypress(function(e) {
  var id = $('#car').parent().attr('class');
  if(e.which == 65|| e.which == 97){
    var car = $('#car')[0];
    if(carDiv[carDiv.indexOf(id)-1] != undefined){
      $('.'+carDiv[carDiv.indexOf(id)-1]).append(car);
    }
  }
  if(e.which == 68|| e.which == 100){
    var car = $('#car')[0];
    console.log(carDiv[carDiv.indexOf(id)+1],carDiv.indexOf(id))
    if(carDiv[carDiv.indexOf(id)+1] != undefined){
      $('.'+carDiv[carDiv.indexOf(id)+1]).append(car);
    }

  }
});
