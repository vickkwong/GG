$(document).ready(function(){
  document.getElementById('actual-content').style.visibility = 'hidden';
  var timesRun = 5;
  var interval = setInterval(function(){
    timesRun -= 1;
    if(timesRun === 0){
      clearInterval(interval);
      document.getElementById('counter').style.visibility = 'hidden';
      document.getElementById('actual-content').style.visibility = 'visible';
    }
    document.getElementById('counter').innerHTML = timesRun;
  }, 1000); 

});
