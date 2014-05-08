// record audio
function record_audio_and_video(){
  console.log("STARTING TO RECORD");
  recordRTC_Video.startRecording();
  recordRTC_Audio.startRecording();
} 

function stop_record_audio_and_video() {
  recordRTC_Audio.stopRecording(function(audioURL) {
        //$("#audio_link").append("<a href='"+audioURL+"'' target='_blank'>"+audioURL+"</a>")
    // $("#audio_link").append("<audio id='audio' src='"+audioURL+"'></audio>")
  });
  recordRTC_Video.stopRecording(function(videoURL) {
    // $("#video_link").append("<video id='video' src='"+videoURL+"'></video>")
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
      },3000);

    }
  },function(failure){
    console.log(failure);
  });

});