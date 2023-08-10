//Script for showing videos and getting responses via lab.js

//Script for running the experiment. Modified from a builder example from lab.js

//template code can be downloaded from  https://labjs.felixhenninger.com

//NOTES ON CHANGING!

//...

//practice instructions and examples

var instructions = "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'>"+
"<p>In this study you will be asked to perform two different tasks at the same time.</p>"+
"<p>The first task is to watch a video of some people talking.</p>"+
"<p>Press SPACE to see an example (you may need to click here with the mouse first!)</p>"+
"</div></main>"

var circInstruct = "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'>"+
"<p>The second task is to respond to a red circle which moves around the screen.</p>"+
"<p>The circle has a gap on one side, and your task is to press SPACE every time the gap switches to the other side.</p>"+
"<table><tbody><tr><td>The target looks like this</td>"+
"<td><img src='stim/cL.png'></td>"+
"<td>And changes to this</td><td><img src='stim/cR.png'></td>"+
"</tr></tbody></table>"+
"<p>Whenever it flips, press SPACE as quickly as possible.</p>"+
"<p>Press SPACE to see an example</p>"+
"</div></main>"
		
//define main video HTML here
//we're going to display video plus a custom button to start
//then we just need to log key presses and video times
vidpath = "stim/T1bias_clip1_sound"; //we'll add extension for different movie fallback versions
vidhtml = "<div style='text-align:center;'" + 
"id='playerdiv'><video id='vid'><source src='"+vidpath+".mp4' type='video/mp4'>"+
"<source src='"+vidpath+".webm' type='video/webm'>Your browser does not support the video tag.</video>" +
"<div id='controls'><button id='btnPlayPause' class='play' title='play' accesskey='P'" +
"onclick='playPauseVideo();'>Start</button>"+
"<button id='btnContinue' class='play' title='continue' accesskey='C'" +
"onclick='contFun();' disabled>Continue</button></div></div>"+
"<div style='text-align:center;' id='instText'>Remember to press Space every time the circle changes! Ready? Click Start to begin.</div>"

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
    "title": "Comparative visual search study",
    "description": "",
    "repository": "",
    "contributors": ""
  },
  "responses": {},
  "content": [ //this defines the content of the study...      
        {
      "type": "lab.html.Screen", //this is the last screen in the study, which will timeout quickly if we are running in qualtrics
      "parameters": {},
      "responses": {"keypress(Space)": "continue"},
      "messageHandlers": {},
      "title": "I1",
      "content": circInstruct,
      "datacommit": false
    },
        {
      "type": "lab.html.Screen", //this is the last screen in the study, which will timeout quickly if we are running in qualtrics
      "parameters": {},
      "responses": {"keypress(Space)": "continue"},
      "messageHandlers": {},
      "title": "I1",
      "content": circInstruct,
      "datacommit": false
    },
    {
      "type": "lab.html.Screen", //this first screen is the instructions, see text above
      "parameters": {"circCount":0,"circTimes":[]},
	  "responses": {
		  "keypress(c)": "continue"
	  },
      "messageHandlers": {"run": function anonymous(){ //this is a function which will happen each time we run this component
					//btnPlayPause = document.getElementById('btnPlayPause'); //get the button
					//btnPlayPause.innerHTML = "hello";
					console.log('ready')
			}
},
      "title": "B1Intro",
      "content": vidhtml,
      "datacommit": false,
	  "events": {"keypress(Space)": function(event) { //we'll call this function when space is pressed
			//this.parameters.sc=switchCount
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
      "content": "Ending the experiment! This should time out automatically...",
      "timeout": "100",
      "datacommit": false
    }
  ]
})

// Add data storage support
study.options.datastore = new lab.data.Store()

// Let's go!
study.run()
