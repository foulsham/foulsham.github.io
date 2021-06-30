//Script for running MSc project on body image (Ferriece BJ). June 2021

//Script for running the experiment. Modified from a builder example from lab.js

//template code can be downloaded from  https://labjs.felixhenninger.com

//NOTES ON CHANGING!

//TO CHANGE THE INSTRUCTION TEXT edit this
	//var instructions = "You will now see a set of short comic strips like the ones you might see in a newspaper. Some of the images may have information missing, but your job is simply to read them and try to understand the story. You will see each panel one at a time. When you've read each panel, press SPACE to continue. At the end of each strip we'll ask you how easy it was to understand the story. Please press the space bar when you're ready."
	// To make it prettier, define it within html
	var instructions = "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'>"+
	"<p>INSTRUCTIONS GO HERE</p>"+
	"<p>?</p>"+
	"<p>Use the mouse to click on the image....</p>"+
	"<p><strong>?</strong></p>"+
	"<p>Please press SPACE when you're ready (you may need to click here with the mouse first!)</p>"+
	"</div></main>"
	var getReadyText = "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'><p>Get ready for the next trial!</p></div></main>"
	
//CHANGE THE ISI DURATIONS HERE
	var getReadyDuration = 2000
	var fixCrossDuration = 1000
	var imgDuration = 10000

//TO CHANGE THE SEQUENCE OF EVENTS IN A TRIAL...
	//head down to line 100ish where the inner loop template starts

//TO CHANGE THE SOURCE IMAGES ETC
	//var URL_stem = "https://foulsham.github.io/SPRdemo/img/"; //location of the stimuli, URL or...
	var URL_stem = "img/"; //location of the stimuli, relative path to this file
	
	//load in the list of images in each condition
	var DataSourcePS=AllDataSources[0];
	var DataSourcePT=AllDataSources[1];
	
	//randomly decide which condition we are in
	var R = Math.random();
	if (R<0.5) {
		var cond = "MostlyPS";
		var im1list = DataSourcePS.slice(0,10)
		var im2list = DataSourcePS.slice(10,20)
		var im3list = DataSourcePT.slice(0,10)
		var tlist = ['PS','PS','PT'];
		} else {
		var cond = "MostlyPT";
		var im1list = DataSourcePT.slice(0,10)
		var im2list = DataSourcePT.slice(10,20)
		var im3list = DataSourcePS.slice(0,10)		
		var tlist = ['PT','PT','PS'];		
		}

	//loop through trials, adding the listed images depending on the condition (and also mixing up which is which)

	var n_trials = 10; //length of array gives number of sequences

	// LAB.JS loop will handle randomisation, but need to transform the DataSource into an object for the trial list

		trials=[];
		for (index = 0; index < n_trials; index++) {

			//for each trial, loop through and add them to a new object with named fields
			thisTrial={};
			thisTrial["condition"]=cond;

			//shuffle the three images so they are not always in the same place, and keep track
			var reorder = [0,1,2];
			  var currentIndex = 3,  randomIndex;

			  // While there remain elements to shuffle...
			  while (0 !== currentIndex) {

				// Pick a remaining element...
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex--;

				// And swap it with the current element.
				[reorder[currentIndex], reorder[randomIndex]] = [
				  reorder[randomIndex], reorder[currentIndex]];
			  }
			  
			//images are now in each list
			var trialImList = [im1list[index],im2list[index],im3list[index]];
			thisTrial["imCondList"] = [tlist[reorder[0]],tlist[reorder[1]],tlist[reorder[2]]];
			thisTrial["imA"] = trialImList[reorder[0]];
			thisTrial["imB"] = trialImList[reorder[1]];
			thisTrial["imC"] = trialImList[reorder[2]];
			
			trials.push(thisTrial);
		}

		console.log(trials)
//TO CHANGE THE GET READY SCREEN TO GIVE AN UPDATE ON PROGRESS
// a handler function will run every time the screen is prepared to update this
	var trialIndex = 0
	var getReadyText = "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'>"+
	"<p>Get ready for the next trial!</p>"+
	"<p>This is trial " + trialIndex + " of "+n_trials+"</p>"+
	"</div></main>"
	var nextBigImage = "circle.jpg";
		
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
    "title": "Image experiment with mouse clicks",
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
    },
    {
      "type": "lab.flow.Loop", //next, we have a loop which is going to loop through all our trials
      "parameters": {},
      //every time the loop runs, it will use a set of parameters from this list
      "templateParameters": trials,
      "responses": {},
      "messageHandlers": {},
      "shuffle": true, //this means the trials will be in a shuffled order
      "title": "trialLoop",
      //the loop works by repeating a template, defined here
      "template": {
        "type": "lab.flow.Sequence",
        "parameters": {},
        "media": {},
        "responses": {},
        "messageHandlers": {},
        "title": "Trial Sequence",
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
				"<p>This is trial " + trialIndex + " of "+n_trials+"</p>"+
				"<p>(Click the image that you want to see for longer)</p>"+
				"</div></main>"
					this.parameters.getReadyText = getReadyText
					this.options.media.images=[URL_stem + this.parameters.imA,URL_stem + this.parameters.imB,URL_stem + this.parameters.imC]					
					//console.log("hello")
			}
},
            "title": "GetReady",
            "content": "${parameters.getReadyText}",
            "timeout": getReadyDuration,
            "datacommit": false
          },
//           {
//             "type": "lab.html.Screen", //a screen a central stimulus to click
//             "parameters": {},
//             "responses": {
//               "click.circclass": "click response" //should only fire on the image
//             },
//             "title": "circDisplay", //tells us which panel we are using
//             "content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'><img class='circclass'; src='img/circle.png'></div></main>",         
//           },          
          {
            "type": "lab.html.Screen", //a screen presenting our stimulus
            "parameters": {"clicked": "X"},
            "responses": {
              "keypress(q)": "quit"
              //"click.imclass": "click response" //should only fire on the image
            },
            "title": "imgChoice", //tells us which panel we are using
            "content": "<main><div style='text-align:center;'><img class='imclassA'; src='" + URL_stem + "${parameters.imA}"+"'></div><p>&nbsp;</p><div style='text-align:center;'><img class='imclassB'; src='" + URL_stem + "${parameters.imB}" +"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img class='imclassC'; src='"+ URL_stem + "${parameters.imC}"+"'></div></p></main>", 
			"events": {"click.imclassA": function(event) { //we'll call this function when we click on the image
							this.parameters.clicked = this.parameters.imA;
							this.end("ClickReceivedA"); //end the trial
							nextBigImage = this.parameters.imA;
  						},
  						"click.imclassB": function(event) { //we'll call this function when we click on the image
							this.parameters.clicked = this.parameters.imB;
							this.end("ClickReceivedB"); //end the trial
							nextBigImage = this.parameters.imB;
  						},
						"click.imclassC": function(event) { //we'll call this function when we click on the image
							this.parameters.clicked = this.parameters.imC;
							this.end("ClickReceivedC"); //end the trial
							nextBigImage = this.parameters.imC;
  						},  						
  						
          	},          
          },
          {
            "type": "lab.html.Screen", //the get ready screen
            "parameters": {"im": " "},
            "responses": {},
            "tardy": true,
            "messageHandlers": {"before:prepare": function anonymous(){ //this is a function which will happen each time we prepare this component
					this.parameters.im = "<main><div style='text-align:center;'><img height='500'; src='"+URL_stem+nextBigImage+"'></div></main>"									
			}
},
            "title": "imgDisplay",
            "content": "${parameters.im}",
            "timeout": imgDuration,
            "datacommit": false
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

//useful for debugging data
study.on('end', () => study.options.datastore.show())

// Let's go!
study.run()
