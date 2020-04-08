
// jquery functions which interact with the video, slider etc

//These anon functions will load and autoplay the video, but that doesn't always work anyway.
// $(function() {
//   $('#currentTime').html($('#video_container').find('video').get(0).load());
//   $('#currentTime').html($('#video_container').find('video').get(0).play());
// })

setInterval(function() {
  $('#currentTime').html($('#video_container').find('video').get(0).currentTime);
  $('#currentEmotion').html($('#myRange').val());
}, 500)