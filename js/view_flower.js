// record audio
function record_audio_and_video(){
  console.log("STARTING TO RECORD");
  recordRTC_Video.startRecording();
  recordRTC_Audio.startRecording();
} 

function stop_record_audio_and_video() {
  

  fb_instance = new Firebase("https://ganstagarden.firebaseio.com"); 
  var fb_garden_id = "HELLO";
  var fb_garden = fb_instance.child('gardens').child(fb_garden_id);
  var flower_id = "-JMOxXcqEqVvFX8O0BEJ"
  var fb_instance_stream = fb_garden.child('flowers/').child(flower_id).child('streams');
  var cur_user_id = 1;
  // fb_instance_stream.push({user:cur_user_id, video:cur_video_blob, audio: cur_audio_blob});


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
        //$("#audio_link").append("<a href='"+audioURL+"'' target='_blank'>"+audioURL+"</a>")
    // $("#audio_link").append("<audio id='audio' src='"+audioURL+"'></audio>")
    // blob_to_base64(recordRTC_Audio.getBlob(),function(b64_data){
    //   var cur_audio_blob = b64_data;
    //   fb_instance_stream.push({user:cur_user_id, audio: cur_audio_blob});
    // });
    fb_instance_stream.push({user:cur_user_id, audio: recordRTC_Audio.getBlob()});
  });
  recordRTC_Video.stopRecording(function(videoURL) {
    // $("#video_link").append("<video id='video' src='"+videoURL+"'></video>")
    // blob_to_base64(recordRTC_Video.getBlob(),function(b64_data){
    //   var cur_video_blob = b64_data;
    //   fb_instance_stream.push({user:cur_user_id, audio: cur_video_blob});
    // });
    // recordRTC_Video.getDataURL(function(dataURL) {
    //   // console.log(dataURL[base64]);
    //   fb_instance_stream.push({user:cur_user_id, video: dataURL});

    // });
    fb_instance_stream.push({user:cur_user_id, audio: recordRTC_Video.toURL()});
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
      }, 5000);

    }
  },function(failure){
    console.log(failure);
  });

});