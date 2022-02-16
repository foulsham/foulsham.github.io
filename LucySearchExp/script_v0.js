//Script for running PS300 project on search (Lucy South). January 2022

//Script for running the experiment. Modified from a builder example from lab.js

//template code can be downloaded from  https://labjs.felixhenninger.com

//NOTES ON CHANGING!

//TO CHANGE THE INSTRUCTION TEXT edit this
	
	// To make it prettier, define it within html
	var instructions = "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'>"+
	"<p>In the following trials you will be asked to find a target image. You will be told what this target image is before seeing several images appear on the screen. The target image which you are asked to find may be present or it may be absent. </p>"+
	"<p>Once the images have appeared on the screen, please make a response as quickly as possible depending on whether the target image is there or not.</p>"+
	"<p><strong>Press Y if the target image is there and N if it is not</strong></p>"+
	"<p>Please press SPACE when you're ready (you may need to click here with the mouse first!)</p>"+
	"</div></main>"
	var getReadyText = "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'><p>Get ready for the next trial!</p></div></main>"
	
//CHANGE THE ISI DURATIONS HERE
	var getReadyDuration = 2000
	var fixCrossDuration = 1000
	var targetDuration = 2000

//TO CHANGE THE SEQUENCE OF EVENTS IN A TRIAL...
	//head down to line 100ish where the inner loop template starts

//TO CHANGE THE SOURCE IMAGES ETC
	var URL_stem = "img/"; //location of the stimuli, relative path to this file
	
	//load in the list of images in each condition
	//this is now done already in the html

	//loop through trials, adding the listed images depending on the condition (and also mixing up which is which)

	//what we want to do with info from spreadsheet...
	//extract images from each trial
	//shuffle the order
	//make the table for nice display
	//make a list for nice preloading
	//store the target name and set size separately
	
	//now including a "blank" image which helps give us a regular table.
	
	var n_trials = 96; //length of array gives number of sequences

	// LAB.JS loop will handle randomisation, but need to transform the DataSource into an object for the trial list

		trials=[];
		for (index = 0; index < n_trials; index++) {

			//for each trial, loop through and add them to a new object with named fields
			thisTrial={};
			thisTrial["c"]=DataSource[index][0];
			thisTrial["t"]=DataSource[index][1];			
			thisTrial["ss"]=DataSource[index][2];
			thisTrial["cr"]=DataSource[index][3];			

			//the number of images we have depends on the setsize
			if (thisTrial["ss"]>3) {
				var imlist = DataSource[index].slice(4,10);
			} else {
				var imlist = DataSource[index].slice(4,7);
			}
			//console.log(imlist)
			//shuffle the three images so they are not always in the same place
			
			  var currentIndex = thisTrial["ss"],  randomIndex;

			  // While there remain elements to shuffle...
			  while (0 !== currentIndex) {

				// Pick a remaining element...
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex--;

				// And swap it with the current element.
				[imlist[currentIndex], imlist[randomIndex]] = [
				  imlist[randomIndex], imlist[currentIndex]];
			  }
			  
			//images are now in each list, but let's also make a big string with the table etc.
			//we're using a 5 x 5 table at the moment NOW 3 x 3
			//randomize a 25 item list
			//then put our images or blank space in the structure
			var tablecells = [];

			for (var i = 1; i <= 9; i++) {
			   tablecells.push(i);
			}
				var currentIndex = 9,  randomIndex;

			  // While there remain elements to shuffle...
			  while (0 !== currentIndex) {

				// Pick a remaining element...
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex--;

				// And swap it with the current element.
				[tablecells[currentIndex], tablecells[randomIndex]] = [
				  tablecells[randomIndex], tablecells[currentIndex]];
			  }
			  
			  var T = "<main><table table-layout='fixed'; width='100%'><tbody>";
			  var c = 1
			  for (var tr = 1; tr<=3; tr++) {
			  	T = T+"<tr>";
			  	for (var td =1; td<=3; td++) {
			  		T = T+"<td>";
					if (tablecells[c-1]<=thisTrial["ss"]) {
							T = T+"<img src='" + URL_stem + imlist[tablecells[c-1]-1]+"'>";	
						} else {
							T = T+"<img src='" + URL_stem + "Blank.jpg'>";
						}
			  		T = T+"</td>";	
			  		c++;		  
			  		}
			  	T = T+"</tr>";	
			  	}
			  T = T+"</tbody></table>"	
			  
			for (var i = 0; i < imlist.length; i++) {
			   imlist[i]=URL_stem + imlist[i];
			}			
			imlist.push(URL_stem+"Blank.jpg");
			thisTrial["imList"] = imlist;
			thisTrial["imHTML"] = T;
			
			trials.push(thisTrial);
		}
    
//console.log(trials)

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
      "datacommit": false
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
        "datacommit": false,
        // this is the content of the template, all of these are going to repeat x times
        "content": [
          {
            "type": "lab.html.Screen", //the get ready screen
            "parameters": {"getReadyText": getReadyText},
            "responses": {},
            "messageHandlers": {"before:prepare": function anonymous(){ //this is a function which will happen each time we prepare this component
					trialIndex = trialIndex+1;
					getReadyText = "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'>"+
				"<p>Get ready for the next trial! (remember: press Y or N according to whether you find the target)</p>"+
				"<p>This is trial " + trialIndex + " of "+n_trials+"</p>"+
				"<p></p>"+
				"</div></main>"
					this.parameters.getReadyText = getReadyText
					//dealing with preloading...
					//this.options.media.images=[URL_stem + this.parameters.imA,URL_stem + this.parameters.imB,URL_stem + this.parameters.imC]					
					//console.log("hello")
			}
},
            "title": "GetReady",
            "content": "${parameters.getReadyText}",
            "timeout": getReadyDuration,
            "datacommit": false
},
          {
            "type": "lab.html.Screen", //the TARGET screen
            "parameters": {"getReadyText": getReadyText},
            "responses": {},
            "messageHandlers": {"before:prepare": function anonymous(){ //this is a function which will happen each time we prepare this component
					getReadyText = "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'>"+
				"<p>The target is...</p>"+
				"<p>"+this.parameters.t+"</p>"+
				"</div></main>"
					this.parameters.getReadyText = getReadyText
					//dealing with preloading...
					this.options.media.images=this.parameters.imList					
					//console.log("hello")
			}
},
            "title": "Target",
            "content": "${parameters.getReadyText}",
            "timeout": targetDuration,
            "datacommit": false
},       
          {
            "type": "lab.html.Screen", //a screen presenting our stimulus
            "responses": {
              "keypress(y)": "y",
              "keypress(n)": "n"
            },
            "title": "S", //tells us which panel we are using
            "content": "${parameters.imHTML}",         
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

//this is useful for debugging the length of the JSON export
// study.on('end', () => {
// 	study.options.datastore.show();
// 	var ds = study.options.datastore.exportJson();
// 	console.log(ds)
// 	console.log (ds.length)
// 	return ds.length;
// 	}
// )

//study.on('end', () => study.options.datastore.download())

// Let's go!
study.run()
//console.log(study.options.datastore.length)