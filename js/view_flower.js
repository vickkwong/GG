// record audio
function record_audio_and_video(){
  console.log("STARTING TO RECORD");
  setTimeout(function(){
    recordRTC_Video.startRecording();
    recordRTC_Audio.startRecording();
  }, 1000);
} 

function stop_record_audio_and_video() {
  

  fb_instance = new Firebase("https://perftest247.firebaseIO.com"); 
                    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
          var pair = vars[i].split("=");
          if(pair[0] == variable){return pair[1];}
        }
        return(false);
      }
  var fb_garden_id = getQueryVariable("gardenId");
  var fb_garden = fb_instance.child('gardens').child(fb_garden_id);
  var flower_id = getQueryVariable("flowerId");
  var fb_instance_stream = fb_garden.child('flowers/').child(flower_id).child('streams');
  var cur_user_id = getQueryVariable("userId");
  // fb_instance_stream.push({user:cur_user_id, video:cur_video_blob, audio: cur_audio_blob});


  function datauri_to_blob(dataURI,callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', dataURI, true);
    xhr.responseType = 'blob';
    xhr.onload = function(e) {
      if (this.status == 200) {
        callback(this.response);
      }
    };
    xhr.send();
  }

  var blob_to_base64 = function(blob, callback) {
    var reader = new FileReader();
    reader.onload = function() {
      var dataUrl = reader.result;
      var base64 = dataUrl.split(',')[1];
      callback(base64);
    };
    reader.readAsDataURL(blob);
  };

  recordRTC_Audio.stopRecording(function(audioURL) {
    recordRTC_Video.stopRecording(function(videoURL) {
      recordRTC_Audio.getDataURL(function(audioDataURL) {
        recordRTC_Video.getDataURL(function(videoDataURL) {
          fb_instance_stream.push({user:cur_user_id, video: videoDataURL, audio: audioDataURL});
        });
      });
    });
  });

}

$(document).ready(function() {
  var ready = 0; // use a counter to make sure audoi and video are all ready
  var startRecording = false;

  // record audio
  navigator.getUserMedia({audio: true}, function(mediaStream) {
    window.recordRTC_Audio = RecordRTC(mediaStream);
    ready += 1;
    if(ready == 2){
      // record_audio_and_video();
    }
  },function(failure){
    console.log(failure);
  });
    			
  // record video
  navigator.getUserMedia({video: true}, function(mediaStream) {
    window.recordRTC_Video = RecordRTC(mediaStream,{type:"video"});
    ready += 1;
    if(ready == 2){
		  // record_audio_and_video();
      var webcam_stream = document.getElementById('your-response');
      var video = document.createElement('video');
      webcam_stream.innerHTML = "";
      // adds these properties to the video
      video = mergeProps(video, {
        controls: false,
        src: URL.createObjectURL(mediaStream)
      });
      video.setAttribute('width', '90%');
      video.play();
      webcam_stream.appendChild(video);
      record_audio_and_video();
      setTimeout(function(){
        console.log("STOP RECORDING");  
        stop_record_audio_and_video();
      }, 6000);

    }
  },function(failure){
    console.log(failure);
  });

});