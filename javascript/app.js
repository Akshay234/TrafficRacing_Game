var ipc = require("electron").ipcRenderer;
var $;
$ = require('jquery');
var carDivsID = ['l1', 'l2', 'r1', 'r2'];
var amature = {initialSpeed: 700 , decrement: 30, limit: 80};
var normal = {initialSpeed: 500 , decrement: 20, limit: 50};
var professional = {initialSpeed: 300 , decrement: 15, limit: 40};
var expert = {initialSpeed: 200 , decrement: 10 , limit: 20};
var mode = {amature: amature, normal: normal, professional: professional, expert: expert};

var game = function(mode){
  var initialEnemyPosition = 0;
  var enemyShifting = 4;
  var roadLength = 90;
  var requestCode = 0;
//---------------Car movement----------------------------------\\

    $(document).keypress(function(e) {
      var id = $('#car').parent().attr('class');
      if(e.which == 65|| e.which == 97){
        var car = $('#car')[0];
        if(carDivsID[carDivsID.indexOf(id)-1] != undefined){
          $('.'+carDivsID[carDivsID.indexOf(id)-1]).append(car);
        }
      }
      if(e.which == 68|| e.which == 100){
        var car = $('#car')[0];
        if(carDivsID[carDivsID.indexOf(id)+1] != undefined){
          $('.'+carDivsID[carDivsID.indexOf(id)+1]).append(car);
        }
      }
    });
//-----------------------Enemy Car Generation-----------------------------\\

    var enemyCar= '"../resources/enemyCar.jpg"';

    var randomID=function(previousID){
      var divIndex=Math.floor(Math.random()*4);
      return carDivsID[divIndex] != previousID ? carDivsID[divIndex] : randomID(previousID);
    }
    var generateEnemy = function(div,position){
      $('#'+(position-enemyShifting)).remove();
       var enemy = $('<img src='+enemyCar+' id='+position+' style="top:'+position+'vh" />');
        $('.'+div).append(enemy);
    }

//-----------------------------Enemy movement---------------------------------------//

    var comparePosition = function(enemyPosition, carPosition){
      if(enemyPosition >= carPosition && enemyPosition < (carPosition+7))
        return true;
      return false;
    }

    var isCarCollides = function(div,enemyPosition){
        var carDivID = $('#car').parent().attr('class');
        var carPosition = 70;
        if(div == carDivID && comparePosition(enemyPosition, carPosition))
            return true;
        return false;
    };
    var previousID = '.l1';
    var callEnemy = function(){
      var position=initialEnemyPosition;
      var div=randomID(previousID);
      if(mode.initialSpeed > mode.limit){

        mode.initialSpeed-=mode.decrement;
      }
      var continuousEnemyGenerator = setInterval(function(){
        if(!isCarCollides(div,position) && position < roadLength){
            position+=4;
            generateEnemy(div,position);
        }
        else if(isCarCollides(div,position)){
            clearInterval(continuousEnemyGenerator);
            clearInterval(enemyCaller);
            if(requestCode == 0){
              ipc.send('game-over');
              requestCode+=1;
            }
        }
        else{
            $('#'+position).remove();
          }
        }, mode.initialSpeed);
      }
    var enemyCaller = setInterval(callEnemy,1000);
};

$.ready(function(){
  $('#race').click(function(){
    var diff = $('.diff').val().toLowerCase();
    $('.diff').html();
    $('.diff').remove();
    $('#race').html();
    $('#race').remove();
    game( mode[diff]);
  })
}());
