// record audio
function record_audio_and_video(){
 recordRTC_Video.startRecording();
 recordRTC_Audio.startRecording();
} 

$(document).ready(function() {
  var ready = 0; // use a counter to make sure audoi and video are all ready

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
    }
  },function(failure){
    console.log(failure);
  });
});