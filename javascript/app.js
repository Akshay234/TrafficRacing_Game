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

var enemyCar=function(){
  return '<img src="../resources/enemyCar.jpg" id="enemy">';
}
var randomIndex=function(){
  var divIndex=Math.floor(Math.random()*4);
  return carDiv[divIndex];
}
var generateEnemy = function(div,position){
  $('#'+position-4).remove();
   var enemy = $('<img src="../resources/enemyCar.jpg" id='+position+' style="top:'+position+'vh" />');
    $('.'+div).append(enemy);
}

var moveEnemy = function(div,position){
  var car=$('#'+position)[0];
  console.log(car);
}
var callEnemy = function(){
  
  var position=4;
  var div=randomIndex();
  setInterval(function(){
      position+=4;
      generateEnemy(div,position);
    }, 500); 
}


setInterval(callEnemy,1000);