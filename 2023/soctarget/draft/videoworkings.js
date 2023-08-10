"<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;' id='imdiv'><img src='" + URL_stem + "${parameters.pairL}" +"'></div></main>"

"<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;' id='imdiv'><video autoplay><source src='sub7pos1final.mp4' type='video/mp4'><source src='sub7pos1final.webm' type='video/webm'>Your browser does not support the video tag.</video>"

	<div id='player'>
		<video id='video-element'>
			<source src='stim/sub7pos1final.mp4' type='video/mp4'>
			<source src='stim/sub7pos1final.webm' type='video/webm'>
		</video>
		<div id='controls'>	
			<button id='btnPlayPause' class='play' title='play' accesskey="P" onclick='playPauseVideo();'>Play</button>
		</div>
	</div>	

	<hr />



https://codepen.io/blackjacques/pen/bgamaj

<h1>Custom HTML5 Video Player Demo</h1>
	<div id='player'>
		<video id='video-element'>
			<source src='https://www.w3schools.com/html/mov_bbb.mp4' type='video/mp4'>
			<source src='https://www.w3schools.com/html/mov_bbb.ogg' type='video/ogg'>
		</video>
		<div id='controls'>
			<progress id='progress-bar' min='0' max='100' value='0'>0% played</progress>
			<button id='btnReplay' class='replay' title='replay' accesskey="R" onclick='replayVideo();'>Replay</button>	
			<button id='btnPlayPause' class='play' title='play' accesskey="P" onclick='playPauseVideo();'>Play</button>
			<button id='btnStop' class='stop' title='stop' accesskey="X" onclick='stopVideo();'>Stop</button>
      <input type="range" id="volume-bar" title="volume" min="0" max="1" step="0.1" value="1">
			<button id='btnMute' class='mute' title='mute' onclick='muteVolume();'>Mute</button>	
      <button id='btnFullScreen' class='fullscreen' title='toggle full screen' accesskey="T" onclick='toggleFullScreen();'>[&nbsp;&nbsp;]</button>
		</div>
	</div>	
  <div style="clear:both"></div>
  <p>Video courtesy of <a href="http://www.bigbuckbunny.org/" target="_blank">Big Buck Bunny</a>.</p>
  <p>Volume bar styled using <a href="http://danielstern.ca/range.css/#/" target="_blank">range.css</a>. </p>

<hr />


// Get a handle to the player
	player       = document.getElementById('video-element');
	btnPlayPause = document.getElementById('btnPlayPause');
	btnMute      = document.getElementById('btnMute');
	progressBar  = document.getElementById('progress-bar');
  volumeBar    = document.getElementById('volume-bar');

  // Update the video volume
  volumeBar.addEventListener("change", function(evt) {
		player.volume = evt.target.value;
	});
  document.getElementById('btnFullScreen').disabled = true;
	// Add a listener for the timeupdate event so we can update the progress bar
	player.addEventListener('timeupdate', updateProgressBar, false);
	
	// Add a listener for the play and pause events so the buttons state can be updated
	player.addEventListener('play', function() {
		// Change the button to be a pause button
		changeButtonType(btnPlayPause, 'pause');
	}, false);
  
	player.addEventListener('pause', function() {
		// Change the button to be a play button
		changeButtonType(btnPlayPause, 'play');
	}, false);
	
	player.addEventListener('volumechange', function(e) { 
		// Update the button to be mute/unmute
		if (player.muted) changeButtonType(btnMute, 'unmute');
		else changeButtonType(btnMute, 'mute');
	}, false);	
  
	player.addEventListener('ended', function() { this.pause(); }, false);	
  
  progressBar.addEventListener("click", seek);

  function seek(e) {
      var percent = e.offsetX / this.offsetWidth;
      player.currentTime = percent * player.duration;
      e.target.value = Math.floor(percent / 100);
      e.target.innerHTML = progressBar.value + '% played';
  }

  function playPauseVideo() {
  	if (player.paused || player.ended) {
  		// Change the button to a pause button
  		changeButtonType(btnPlayPause, 'pause');
  		player.play();
  	}
  	else {
  		// Change the button to a play button
  		changeButtonType(btnPlayPause, 'play');
  		player.pause();
  	}
  }
  
  // Stop the current media from playing, and return it to the start position
  function stopVideo() {
  	player.pause();
  	if (player.currentTime) player.currentTime = 0;
  }
  
  // Toggles the media player's mute and unmute status
  function muteVolume() {
  	if (player.muted) {
  		// Change the button to a mute button
  		changeButtonType(btnMute, 'mute');
  		player.muted = false;
  	}
  	else {
  		// Change the button to an unmute button
  		changeButtonType(btnMute, 'unmute');
  		player.muted = true;
  	}
  }
  
  // Replays the media currently loaded in the player
  function replayVideo() {
  	resetPlayer();
  	player.play();
  }
  
  // Update the progress bar
  function updateProgressBar() {
  	// Work out how much of the media has played via the duration and currentTime parameters
  	var percentage = Math.floor((100 / player.duration) * player.currentTime);
  	// Update the progress bar's value
  	progressBar.value = percentage;
  	// Update the progress bar's text (for browsers that don't support the progress element)
  	progressBar.innerHTML = percentage + '% played';
  }
  
  // Updates a button's title, innerHTML and CSS class
  function changeButtonType(btn, value) {
  	btn.title     = value;
  	btn.innerHTML = value;
  	btn.className = value;
  }
  
  function resetPlayer() {
  	progressBar.value = 0;
  	// Move the media back to the start
  	player.currentTime = 0;
  	// Set the play/pause button to 'play'
  	changeButtonType(btnPlayPause, 'play');
  }  
  
  function exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
  }
  
  function toggleFullScreen() {
    //var player = document.getElementById("player");

    if (player.requestFullscreen)
        if (document.fullScreenElement) {
            document.cancelFullScreen();
        } else {
            player.requestFullscreen();
        }
        else if (player.msRequestFullscreen)
        if (document.msFullscreenElement) {
            document.msExitFullscreen();
        } else {
            player.msRequestFullscreen();
        }
        else if (player.mozRequestFullScreen)
        if (document.mozFullScreenElement) {
            document.mozCancelFullScreen();
        } else {
            player.mozRequestFullScreen();
        }
        else if (player.webkitRequestFullscreen)
        if (document.webkitFullscreenElement) {
            document.webkitCancelFullScreen();
        } else {
            player.webkitRequestFullscreen();
        }
    else {
        alert("Fullscreen API is not supported");
        
    }
  }