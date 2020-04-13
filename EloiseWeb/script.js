//Script for running PS300 for Eloise

//Script for running the experiment. Modified from a builder example from lab.js

//template code can be downloaded from  https://labjs.felixhenninger.com

//NOTES ON CHANGING!

var URL_stem = "img/"; //location of the stimuli, relative path to this file //now defined earlier

//TO CHANGE THE INSTRUCTION TEXT edit this
	// To make it prettier, define it within html
	var instructions = "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'>"+
	"<p>This is a spot-the-difference task.</p>"+
	"<p>You will see two images and all you have to do is say whether there is a difference between them or not by pressing the 'y' or 'n' key.</p>"+
	"<p>Press SPACE to see an example (you may need to click here with the mouse first!)</p>"+
	"</div></main>"
	var instructeg = "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'>"+
	"<img src='"+URL_stem+"instruct_eg.jpg'>"+
	"<p>Press 'y' if there is a difference or 'n' if there is no difference.</p>"+
	"</div></main>"	
	var pracinstruct = "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'>"+
	"<p>For the rest of the experiment the task is the same, but you will only be able to see one image at a time.</p>"+
	"<p>Press SPACE to switch between images, and 'y' or 'n' to make your response.</p>"+
	"<p>Press SPACE to begin a practice block.</p>"+
	"</div></main>"	
	var b1instruct = "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'>"+
	"<p>That is the end of the practice examples. There are now two blocks of trials.</p>"+
	"<p>Please respond as quickly and accurately as you can!</p>"+
	"<p>Press SPACE to begin the experiment.</p>"+
	"</div></main>"	
	var b2instruct = "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'>"+
	"<p>That is the end of the first block.</p>"+
	"<p>You could take a quick break if you like.</p>"+
	"<p>Press SPACE to continue...</p>"+
	"</div></main>"		
	
//CHANGE THE ISI DURATIONS HERE
	var getReadyDuration = 2000
	var fixCrossDuration = 1000

//TO CHANGE THE SEQUENCE OF EVENTS IN A TRIAL...
	//head down to line 108 where the inner loop template starts

//TO CHANGE THE SOURCE IMAGES ETC

	var n_trials = DataSource.length; //length of array gives number of sequences

	// LAB.JS loop will handle randomisation, but need to transform the DataSource into an object for the trial list
	// i.e., loop through the data source, adding each item to named properties

		//this is the list of parameters that we are going to end up with for every "trial" sequence
		trialProps=["condition","imA","imB","isChange","feature","stimtype","inverted","imLeft","imRight","pairL","pairR"];

		trials=[];
		for (index = 0; index < n_trials; index++) {

			//for each trial, loop through and add them to a new object with named fields
			thisTrial={};
			for (p = 0; p < trialProps.length; p++) {
				thisTrial[trialProps[p]]=DataSource[index][p];
			}
			trials.push(thisTrial);
		}
		
	//now deal with dividing the different blocks etc manually
	var pdata = trials.slice(0,6)//practice block is first few trials

	var m = Math.random() //randomly order blocks 1 and 2

	if (m>0.5) {b1data = trials.slice(6,78) //78
	b2data=trials.slice(78)}
	else {b1data = trials.slice(78)
	b2data = trials.slice(6,78)}		

//TO CHANGE THE GET READY SCREEN TO GIVE AN UPDATE ON PROGRESS
// a handler function will run every time the screen is prepared to update this
//let's just use this for practice trials now
	var trialIndex = 0
	var getReadyText = "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'>"+
	"<p>Get ready for the next trial!</p>"+
	"<p>This is practice trial " + trialIndex + " of "+pdata.length+"</p>"+
	"</div></main>"
	var getReadyBasic = "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'>"+
	"<p>Get ready for the next trial!</p>"+
	"</div></main>"	
		
// Define study
//this uses JSON syntax, so need to be careful with double quotes etc?

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
      "type": "lab.html.Screen", //this first screen is the instructions, see text above
      "parameters": {},
	  "responses": {
		  "keypress(Space)": "continue"
	  },
      "messageHandlers": {},
      "title": "Intro",
      "content": instructions,
      "datacommit": false
    },
    {
      "type": "lab.html.Screen", //additional example
      "parameters": {},
		"responses": {
		  "keypress(y)": "yes", //these are the responses which end the trial and are logged
		  "keypress(n)": "no",
		},  
      "messageHandlers": {},
      "title": "Intro2",
      "content": instructeg,
      "datacommit": false
    }, 
    {
      "type": "lab.html.Screen", //next instructions, see text above
      "parameters": {},
	  "responses": {
		  "keypress(Space)": "continue"
	  },
      "messageHandlers": {},
      "title": "Intro3",
      "content": pracinstruct,
      "datacommit": false
    },       
    {
      "type": "lab.flow.Loop", //PRACTICE LOOP
      "parameters": {},
      //every time the loop runs, it will use a set of parameters from this list
      "templateParameters": pdata,
      "responses": {},
      "messageHandlers": {},
      "shuffle": true, //this means the trials will be in a shuffled order
      "title": "PracTrial",
      //the loop works by repeating a template, defined here
      "template": {
        "type": "lab.flow.Sequence",
        "parameters": {},
        "responses": {},
        "messageHandlers": {},
        "title": "PracTrial Sequence",
        // this is the content of the template, all of these are going to repeat x times
        "content": [
          {
            "type": "lab.html.Screen", //the get ready screen
            "parameters": {"getReadyText": getReadyText},
            "responses": {},
            "messageHandlers": {"before:prepare": function anonymous(){ //this is a function which will happen each time we prepare this component
					trialIndex = trialIndex+1;
					getReadyText = "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'>"+
				"<p>Get ready for the next trial!</p>"+
				"<p>This is practice trial " + trialIndex + " of "+pdata.length+"</p>"+
				"</div></main>"
					this.parameters.getReadyText = getReadyText
			}
},
            "title": "GetReady",
            "content": "${parameters.getReadyText}",
            "timeout": getReadyDuration,
            "datacommit": false
          },
          {
            "type": "lab.html.Screen", //a fixation cross
            "responses": {},
            "title": "fixcross",
            "content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'>+</div></main>", 
            "timeout": fixCrossDuration,
            "datacommit": false            
          },           
          {
            "type": "lab.html.Screen", //a screen presenting our stimuli
            "parameters":{"sc":0,"onLeft":true}, //not really sure why we need to update these 
            "responses": {
              "keypress(y)": "yes", //these are the responses which end the trial and are logged
              "keypress(n)": "no",
            },  
            "title": "trialdisp", //tells us which panel we are using
            "content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;' id='imdiv'><img src='" + URL_stem + "${parameters.pairL}" +"'><p>Press SPACE to switch and y/n to answer</p></div></main>" ,
            'events': {"keypress(Space)": function(event) { //we'll call this function to switch from left to right etc
      					switchCount=this.parameters.sc+1
      					this.parameters.sc=switchCount
      					if (this.parameters.onLeft) {
      						this.parameters.onLeft=false
      						document.getElementById('imdiv').innerHTML="<img src='" + URL_stem + this.parameters.pairR +"'><p>Press SPACE to switch and y/n to answer</p>"
      						}
      					else {
      						this.parameters.onLeft=true
      						document.getElementById('imdiv').innerHTML="<img src='" + URL_stem + this.parameters.pairL +"'><p>Press SPACE to switch and y/n to answer</p>"     					
      						}
  						},
          	},
          },                                                          
        ]
      } 
    },
    {
      "type": "lab.html.Screen", //this first screen is the instructions, see text above
      "parameters": {},
	  "responses": {
		  "keypress(Space)": "continue"
	  },
      "messageHandlers": {},
      "title": "B1Intro",
      "content": b1instruct,
      "datacommit": false
    },        
    {
      "type": "lab.flow.Loop", //BLOCK 1 LOOP
      "parameters": {},
      //every time the loop runs, it will use a set of parameters from this list
      "templateParameters": b1data,
      "responses": {},
      "messageHandlers": {},
      "shuffle": true, //this means the trials will be in a shuffled order
      "title": "B1Trial",
      //the loop works by repeating a template, defined here
      "template": {
        "type": "lab.flow.Sequence",
        "parameters": {},
        "responses": {},
        "messageHandlers": {},
        "title": "B1Trial Sequence",
        // this is the content of the template, all of these are going to repeat x times
        "content": [
          {
            "type": "lab.html.Screen", //the get ready screen
            "parameters": {"getReadyText": getReadyBasic},
            "responses": {},
            "messageHandlers": {},
            "title": "GetReady",
            "content": "${parameters.getReadyText}",
            "timeout": getReadyDuration,
            "datacommit": false
          },
          {
            "type": "lab.html.Screen", //a fixation cross
            "responses": {},
            "title": "fixcross",
            "content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'>+</div></main>", 
            "timeout": fixCrossDuration,
            "datacommit": false            
          },           
          {
            "type": "lab.html.Screen", //a screen presenting our stimuli
            "parameters":{"sc":0,"onLeft":true}, //not really sure why we need to update these 
            "responses": {
              "keypress(y)": "yes", //these are the responses which end the trial and are logged
              "keypress(n)": "no",
            },  
            "title": "B1trialdisp", //tells us which panel we are using
            "content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;' id='imdiv'><img src='" + URL_stem + "${parameters.pairL}" +"'></div></main>" ,
            'events': {"keypress(Space)": function(event) { //we'll call this function to switch from left to right etc
      					switchCount=this.parameters.sc+1
      					this.parameters.sc=switchCount
      					if (this.parameters.onLeft) {
      						this.parameters.onLeft=false
      						document.getElementById('imdiv').innerHTML="<img src='" + URL_stem + this.parameters.pairR +"'>"
      						}
      					else {
      						this.parameters.onLeft=true
      						document.getElementById('imdiv').innerHTML="<img src='" + URL_stem + this.parameters.pairL +"'>"      					
      						}
  						},
          	},
          },                                                          
        ]
      } 
    },
    {
      "type": "lab.html.Screen", //instructions for Block 2
      "parameters": {},
	  "responses": {
		  "keypress(Space)": "continue"
	  },
      "messageHandlers": {},
      "title": "B2Intro",
      "content": b2instruct,
      "datacommit": false
    },        
    {
      "type": "lab.flow.Loop", //BLOCK 2 LOOP
      "parameters": {},
      //every time the loop runs, it will use a set of parameters from this list
      "templateParameters": b2data,
      "responses": {},
      "messageHandlers": {},
      "shuffle": true, //this means the trials will be in a shuffled order
      "title": "B2Trial",
      //the loop works by repeating a template, defined here
      "template": {
        "type": "lab.flow.Sequence",
        "parameters": {},
        "responses": {},
        "messageHandlers": {},
        "title": "B2Trial Sequence",
        // this is the content of the template, all of these are going to repeat x times
        "content": [
          {
            "type": "lab.html.Screen", //the get ready screen
            "parameters": {"getReadyText": getReadyBasic},
            "responses": {},
            "messageHandlers": {},
            "title": "GetReady",
            "content": "${parameters.getReadyText}",
            "timeout": getReadyDuration,
            "datacommit": false
          },
          {
            "type": "lab.html.Screen", //a fixation cross
            "responses": {},
            "title": "fixcross",
            "content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'>+</div></main>", 
            "timeout": fixCrossDuration,
            "datacommit": false            
          },           
          {
            "type": "lab.html.Screen", //a screen presenting our stimuli
            "parameters":{"sc":0,"onLeft":true}, //not really sure why we need to update these 
            "responses": {
              "keypress(y)": "yes", //these are the responses which end the trial and are logged
              "keypress(n)": "no",
            },  
            "title": "B1trialdisp", //tells us which panel we are using
            "content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;' id='imdiv'><img src='" + URL_stem + "${parameters.pairL}" +"'></div></main>" ,
            'events': {"keypress(Space)": function(event) { //we'll call this function to switch from left to right etc
      					switchCount=this.parameters.sc+1
      					this.parameters.sc=switchCount
      					if (this.parameters.onLeft) {
      						this.parameters.onLeft=false
      						document.getElementById('imdiv').innerHTML="<img src='" + URL_stem + this.parameters.pairR +"'>"
      						}
      					else {
      						this.parameters.onLeft=true
      						document.getElementById('imdiv').innerHTML="<img src='" + URL_stem + this.parameters.pairL +"'>"      					
      						}
  						},
          	},
          },                                                          
        ]
      } 
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
