//Simple demo of face inversion effect

var imglist = ['TC.jpg','DC.jpg','BO.jpg','BC.jpg','WS.jpg','LDC.jpg','BJ.png','DT.jpg'];
var inv = [0,0,0,1,1,1,0,1];
var corresp=['act','pol','pol','pol','act','act','pol','pol'];

//NOTES ON CHANGING!

var URL_stem = "img/"; //location of the stimuli, relative path to this file //now defined earlier

//TO CHANGE THE INSTRUCTION TEXT edit this
	// To make it prettier, define it within html
	var instructions = "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'>"+
	"<p>This is a short face recognition test.</p>"+
	"<p>You will see a face for a short duration and all you have to do is say whether it was an ACTOR or a POLITICIAN. Press '1' for ACTOR and '2' for POLITICIAN.</p>"+
	"<p>Press SPACE to start (you may need to click here with the mouse first!)</p>"+
	"</div></main>"
	
//CHANGE THE ISI DURATIONS HERE
	var getReadyDuration = 2000
	var fixCrossDuration = 1000
	var faceDuration = 200

//TO CHANGE THE SOURCE IMAGES ETC

	var n_trials = imglist.length; //length of array gives number of sequences

	// LAB.JS loop will handle randomisation, but need to transform the DataSource into an object for the trial list
	// i.e., loop through the data source, adding each item to named properties

		trials=[];
		for (index = 0; index < n_trials; index++) {

			//for each trial, loop through and add them to a new object with named fields
			thisTrial={};
			thisTrial["img"]=imglist[index];
			thisTrial["inv"]=inv[index];
			thisTrial["corresp"]=corresp[index];
			trials.push(thisTrial);
		}
//TO CHANGE THE GET READY SCREEN TO GIVE AN UPDATE ON PROGRESS
// a handler function will run every time the screen is prepared to update this
//let's just use this for practice trials now
	var trialIndex = 0
	var getReadyText = "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'>"+
	"<p>Get ready for the next trial!</p>"+
	"<p>Press 1 for ACTOR and 2 for POLITICIAN, as quickly as possible...</p>"+
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
      "type": "lab.flow.Loop", //BLOCK 1 LOOP
      "parameters": {},
      //every time the loop runs, it will use a set of parameters from this list
      "templateParameters": trials,
      "responses": {},
      "messageHandlers": {},
      "media": {"images":imglist},
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
            "parameters": {},
            "responses": {},
            "messageHandlers": {},
            "title": "GetReady",
            "content": getReadyText,
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
            "parameters":{}, //not really sure why we need to update these 
            "timeout": faceDuration,
            "title": "B1trialdisp", //tells us which panel we are using
            "content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;' id='imdiv'><img src='" + "${parameters.img}" +"'></div></main>" ,

          },   
          {
            "type": "lab.html.Screen", //a screen presenting our stimuli
            "parameters":{}, //not really sure why we need to update these 
            "responses": {
              "keypress(1)": "act", //these are the responses which end the trial and are logged
              "keypress(2)": "pol",
            },  
            "title": "maskdisp", //tells us which panel we are using
            "content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;' id='imdiv'><img src='mask.jpg'></div></main>" ,

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
//study.on('end', () => study.options.datastore.show())

// Let's go!
study.run()
