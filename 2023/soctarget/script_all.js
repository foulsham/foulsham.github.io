//Script for showing videos and getting responses via lab.js

//Modified 2023 for Abi Social Target
//show a video in html, and receive button presses throughout
//now use a query string to determine which video to show or if it is practice. 
//Not bothering with instructions etc, will show them in qualtrics

//NOTES ON CHANGING!

//...



//first get the query string and set stuff depending
//just using one parameter, "vid" which will be a practice string if it's a practice trial
const queryParams = new URLSearchParams(window.location.search)
var vidstr = queryParams.get('vid')

//define main video HTML here

//we're going to display video plus a custom button to start
//then we just need to log key presses and video times
vidpath = "stim/"+vidstr; //we'll add extension for different movie fallback versions
vidhtml = "<div style='text-align:center;'" + 
"id='playerdiv'><video id='vid'><source src='"+vidpath+".mp4' type='video/mp4'>"+
"Your browser does not support the video tag.</video>" +
"<div id='controls'><button id='btnPlayPause' class='play' title='play' accesskey='P'" +
"onclick='playPauseVideo();'>Start</button>"+
"<button id='btnContinue' class='play' title='continue' accesskey='C'" +
"onclick='contFun();' disabled>Continue</button></div></div>"+
"<div style='text-align:center;' id='instText'>Remember to press SPACE every time the circle changes! Ready? Click Start to begin.</div>"

//now use another to customise the instruction string
if (queryParams.has('cont')) {

vidhtml = "<div style='text-align:center;'" + 
"id='playerdiv'><video id='vid'><source src='"+vidpath+".mp4' type='video/mp4'>"+
"Your browser does not support the video tag.</video>" +
"<div id='controls'><button id='btnPlayPause' class='play' title='play' accesskey='P'" +
"onclick='playPauseVideo();'>Start</button>"+
"<button id='btnContinue' class='play' title='continue' accesskey='C'" +
"onclick='contFun();' disabled>Continue</button></div></div>"+
"<div style='text-align:center;' id='instText'>Watch the videos and think about the people. Click Start to begin.</div>"

}


//define functions which will control video

//define a function here which will happen when we press the button
  function playPauseVideo() {
					btnPlayPause = document.getElementById('btnPlayPause'); //get the button
					player       = document.getElementById('vid');
					btnPlayPause.disabled = true;
					//btnPlayPause.innerHTML = "hello";
					console.log('hello')
					player.play();
					player.addEventListener('ended',videoEnds,false);
  }

//define a function here which will happen when we press the button
  function contFun() {
					//btnPlayPause = document.getElementById('btnPlayPause'); //get the button
					//player       = document.getElementById('vid');
					//btnPlayPause.disabled = true;
					//btnPlayPause.innerHTML = "hello";
					console.log('continue')
					study.internals.currentComponent.end() //not really sure why I can't just call "end"
					//player.play();
					//player.addEventListener('ended',videoEnds,false);
  }

//define a function which will happen when the video finishes
//we want to store any data plus allow the participant to move on
  function videoEnds() {
					btnCont = document.getElementById('btnContinue'); //get the button
					btnCont.disabled = false;
					txt = document.getElementById('instText');
					txt.innerHTML="Click Continue to move on";
					//btnPlayPause.innerHTML = "Continue";
					//end()//end the component and move on...
					console.log('end')
  }
	

// Define study

trials = [];
thisTrial = {};

console.log('got here')

//this defines the overall study at one big object
const study = lab.util.fromObject({
  "title": "root",
  "type": "lab.flow.Sequence",
  "parameters": {}, //all trials will inherit this
  "plugins": [
    {
      "type": "lab.plugins.Metadata"
    },
    {
      "type": "lab.plugins.PostMessage" //not sure what this is...
    }
  ],
  "metadata": { //strings describing the study
    "title": "Social target study",
    "description": "",
    "repository": "",
    "contributors": ""
  },
  "responses": {},
  "content": [ //this defines the content of the study...      
    {
      "type": "lab.html.Screen", //this first screen is the instructions, see text above
      "parameters": {"circCount":0,"circTimes":[],"trialvid":vidstr},
	  "responses": {
		  "keypress(c)": "continue"
	  },
      "messageHandlers": {"run": function anonymous(){ //this is a function which will happen each time we run this component
					//btnPlayPause = document.getElementById('btnPlayPause'); //get the button
					//btnPlayPause.innerHTML = "hello";
					console.log('ready')
			}
},
      "title": "viddisplay",
      "content": vidhtml,
      "datacommit": true,
	  "events": {"keypress(Space)": function(event) { //we'll call this function when space is pressed
				player = document.getElementById('vid');
				console.log('space')
				t=player.currentTime;
				console.log(t)
				c=this.parameters.circCount+1;
				this.parameters.circCount=c;
				a=this.parameters.circTimes;
				a.push(t);
				this.parameters.circTimes=a;
			},
},
    },
        {
      "type": "lab.html.Screen", //this is the last screen in the study, which will timeout quickly if we are running in qualtrics
      "parameters": {},
      "responses": {},
      "messageHandlers": {},
      "title": "Bye",
      "content": "Ending this trial! This should time out automatically...",
      "timeout": "100",
      "datacommit": false
    }
  ]
})

// Add data storage support
study.options.datastore = new lab.data.Store()

// Let's go!
study.run()