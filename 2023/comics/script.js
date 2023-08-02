//Script for running PS300 on ConstituentLayout (2023: Mariam)

//Script for running the experiment. Modified from a builder example from lab.js

//template code can be downloaded from  https://labjs.felixhenninger.com

// CHANGES 2023


// CHANGES FEB 2021
// - added question screen, this is loaded from datasource and presented as an HTML at the end
// - also added preloading which may help?

//NOTES ON CHANGING!

//TO CHANGE THE INSTRUCTION TEXT edit this
	//var instructions = "You will now see a set of short comic strips like the ones you might see in a newspaper. Some of the images may have information missing, but your job is simply to read them and try to understand the story. You will see each panel one at a time. When you've read each panel, press SPACE to continue. At the end of each strip we'll ask you how easy it was to understand the story. Please press the space bar when you're ready."
	// To make it prettier, define it within html
	var instructions = "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'>"+
	"<p>You will now see a set of short comic strips like the ones you might see in a newspaper.</p>"+
	"<p>Your job is simply to read them and try to understand the story.</p>"+
	"<p>You will see each panel one at a time. <strong>When you've read each panel, press SPACE to continue.</strong></p>"+
	"<p>At the end of each strip we'll ask you a simple question about the story.</p>"+
	"<p>Please press SPACE when you're ready to begin (you may need to click here with the mouse first!)</p>"+
	"</div></main>"
	var getReadyText = "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'><p>Get ready for the next strip!</p></div></main>"
	
	var questionText = "Press 1,2 or 3 to give the correct response"
	
//CHANGE THE ISI DURATIONS HERE
	var getReadyDuration = 2000

//TO CHANGE THE SEQUENCE OF EVENTS IN A TRIAL...
	//head down to line 108 where the inner loop template starts

//TO CHANGE THE SOURCE IMAGES ETC
	//var URL_stem = "https://foulsham.github.io/SPRdemo/img/"; //location of the stimuli, URL or...
	var URL_stem = "img/"; //location of the stimuli, relative path to this file

	//Deal with counterbalancing etc and re-configure so that we can use in lab.js template
	//using same datasource arrays as in previous experiments with jspsych

	// (AllDataSources is originally loaded in the html header)
	// choose one of the sets at random
	var DataSource = AllDataSources[Math.floor(Math.random()*AllDataSources.length)];

	var n_trials = DataSource.length; //length of array gives number of sequences

	// LAB.JS loop will handle randomisation, but need to transform the DataSource into an object for the trial list
	// i.e., loop through the data source, adding each item to named properties
	
	//NOW going to split this into blocks (manually)

		//this is the list of parameters that we are going to end up with for every "trial" sequence
		trialProps=["version","stripnum","strip","structure","condition","p1path","p2path","p3path","p4path","p5path","p6path","qText","q1","q2","q3","corrresp"];

		trials=[];
		for (index = 0; index < n_trials; index++) {

			//for each trial, loop through and add them to a new object with named fields
			thisTrial={};
			for (p = 0; p < trialProps.length; p++) {
				thisTrial[trialProps[p]]=DataSource[index][p];
			}
			trials.push(thisTrial);
		}
		
		//block by layout then randomly order the blocks
		//lab.js will handle shuffling within each block
		var arr = [0,12,24];
		var shuffledArr = arr.sort(() => Math.random() - 0.5);
		trialsB1=trials.slice(shuffledArr[0],shuffledArr[0]+12);
		trialsB2=trials.slice(shuffledArr[1],shuffledArr[1]+12);			
		trialsB3=trials.slice(shuffledArr[2],shuffledArr[2]+12);		
// 		trialsB1=trials.slice(shuffledArr[0],shuffledArr[0]+2);
// 		trialsB2=trials.slice(shuffledArr[1],shuffledArr[1]+2);			
// 		trialsB3=trials.slice(shuffledArr[2],shuffledArr[2]+2);			

//TO CHANGE THE GET READY SCREEN TO GIVE AN UPDATE ON PROGRESS
// a handler function will run every time the screen is prepared to update this
	var trialIndex = 0
	var getReadyText = "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'>"+
	"<p>Get ready for the next strip!</p>"+
	"<p>This is trial " + trialIndex + " of "+n_trials+"</p>"+
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
    "title": "Self-paced reading experiment with comics",
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
	"datacommit": false,
    },
    {
      "type": "lab.flow.Loop", //next, we have a loop which is going to loop through all our trials/strips
      "parameters": {},
      //every time the loop runs, it will use a set of parameters from this list
      "templateParameters": trialsB1,
      "responses": {},
      "messageHandlers": {},
      "shuffle": true, //this means the trials will be in a shuffled order
      "title": "TrialB1",
      "datacommit": false,
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
				"<p>Get ready for the next strip!</p>"+
				"<p>This is trial " + trialIndex + " of "+n_trials+"</p>"+
				"</div></main>"
					this.parameters.getReadyText = getReadyText
					this.options.media.images=[URL_stem + this.parameters.p1path,URL_stem + this.parameters.p2path,URL_stem + this.parameters.p3path,URL_stem + this.parameters.p4path,URL_stem + this.parameters.p5path,URL_stem + this.parameters.p6path]
					//console.log("hello")
			}
},
            "title": "GetReady",
            "content": "${parameters.getReadyText}",
            "timeout": getReadyDuration,
            "datacommit": false
          },
          {
            "type": "lab.html.Screen", //a screen presenting our stimulus
            "responses": {
              "keypress(Space)": "continue"
            },
            "title": "panel1", //tells us which panel we are using
            "content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'><img src='" + URL_stem + "${parameters.p1path}" +"'></div></main>" 
          },
          {
            "type": "lab.html.Screen", //a screen presenting our stimulus
            "responses": {
              "keypress(Space)": "continue"
            },
            "title": "panel2", //tells us which panel we are using
            "content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'><img src='" + URL_stem + "${parameters.p2path}" +"'></div></main>" 
          },     
          {
            "type": "lab.html.Screen", //a screen presenting our stimulus
            "responses": {
              "keypress(Space)": "continue"
            },
            "title": "panel3", //tells us which panel we are using
            "content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'><img src='" + URL_stem + "${parameters.p3path}" +"'></div></main>" 
          },
          {
            "type": "lab.html.Screen", //a screen presenting our stimulus
            "responses": {
              "keypress(Space)": "continue"
            },
            "title": "panel4", //tells us which panel we are using
            "content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'><img src='" + URL_stem + "${parameters.p4path}" +"'></div></main>" 
          },
          {
            "type": "lab.html.Screen", //a screen presenting our stimulus
            "responses": {
              "keypress(Space)": "continue"
            },
            "title": "panel5", //tells us which panel we are using
            "content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'><img src='" + URL_stem + "${parameters.p5path}" +"'></div></main>" 
          },
          {
            "type": "lab.html.Screen", //a screen presenting our stimulus
            "responses": {
              "keypress(Space)": "continue"
            },
            "title": "panel6", //tells us which panel we are using
            "content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'><img src='" + URL_stem + "${parameters.p6path}" +"'></div></main>" 
          },       
          {
            "type": "lab.html.Screen", //a screen presenting the question at the end EDITING CONTENT TO NOW SHOW QUESTION
            "responses": {
	            "keypress(1)": "1",
				"keypress(2)": "2",
				"keypress(3)": "3",                 
            },
            "title": "Question", //tells us which panel we are using
            "content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'>" + 
            	"<p>" + "${parameters.qText}" + "</p>" + 
            	"<p>1. " + "${parameters.q1}" +"</p>"+
            	"<p>2. " + "${parameters.q2}" +"</p>"+
            	"<p>3. " + "${parameters.q3}" +"</p>"+
            	"<p></p>"+
            	"<p>" + questionText +"</p>"+
            	"</div></main>" 
          },                                                   
        ]
      } 
    },
    {
      "type": "lab.flow.Loop", //next, we have a loop which is going to loop through all our trials/strips
      "parameters": {},
      //every time the loop runs, it will use a set of parameters from this list
      "templateParameters": trialsB2,
      "responses": {},
      "messageHandlers": {},
      "shuffle": true, //this means the trials will be in a shuffled order
      "title": "TrialB2",
      "datacommit": false,
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
				"<p>Get ready for the next strip!</p>"+
				"<p>This is trial " + trialIndex + " of "+n_trials+"</p>"+
				"</div></main>"
					this.parameters.getReadyText = getReadyText
					this.options.media.images=[URL_stem + this.parameters.p1path,URL_stem + this.parameters.p2path,URL_stem + this.parameters.p3path,URL_stem + this.parameters.p4path,URL_stem + this.parameters.p5path,URL_stem + this.parameters.p6path]
					//console.log("hello")
			}
},
            "title": "GetReady",
            "content": "${parameters.getReadyText}",
            "timeout": getReadyDuration,
            "datacommit": false
          },
          {
            "type": "lab.html.Screen", //a screen presenting our stimulus
            "responses": {
              "keypress(Space)": "continue"
            },
            "title": "panel1", //tells us which panel we are using
            "content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'><img src='" + URL_stem + "${parameters.p1path}" +"'></div></main>" 
          },
          {
            "type": "lab.html.Screen", //a screen presenting our stimulus
            "responses": {
              "keypress(Space)": "continue"
            },
            "title": "panel2", //tells us which panel we are using
            "content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'><img src='" + URL_stem + "${parameters.p2path}" +"'></div></main>" 
          },     
          {
            "type": "lab.html.Screen", //a screen presenting our stimulus
            "responses": {
              "keypress(Space)": "continue"
            },
            "title": "panel3", //tells us which panel we are using
            "content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'><img src='" + URL_stem + "${parameters.p3path}" +"'></div></main>" 
          },
          {
            "type": "lab.html.Screen", //a screen presenting our stimulus
            "responses": {
              "keypress(Space)": "continue"
            },
            "title": "panel4", //tells us which panel we are using
            "content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'><img src='" + URL_stem + "${parameters.p4path}" +"'></div></main>" 
          },
          {
            "type": "lab.html.Screen", //a screen presenting our stimulus
            "responses": {
              "keypress(Space)": "continue"
            },
            "title": "panel5", //tells us which panel we are using
            "content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'><img src='" + URL_stem + "${parameters.p5path}" +"'></div></main>" 
          },
          {
            "type": "lab.html.Screen", //a screen presenting our stimulus
            "responses": {
              "keypress(Space)": "continue"
            },
            "title": "panel6", //tells us which panel we are using
            "content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'><img src='" + URL_stem + "${parameters.p6path}" +"'></div></main>" 
          },       
          {
            "type": "lab.html.Screen", //a screen presenting the question at the end EDITING CONTENT TO NOW SHOW QUESTION
            "responses": {
	            "keypress(1)": "1",
				"keypress(2)": "2",
				"keypress(3)": "3",                 
            },
            "title": "Question", //tells us which panel we are using
            "content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'>" + 
            	"<p>" + "${parameters.qText}" + "</p>" + 
            	"<p>1. " + "${parameters.q1}" +"</p>"+
            	"<p>2. " + "${parameters.q2}" +"</p>"+
            	"<p>3. " + "${parameters.q3}" +"</p>"+
            	"<p></p>"+
            	"<p>" + questionText +"</p>"+
            	"</div></main>" 
          },                                                   
        ]
      } 
    },    
    {
      "type": "lab.flow.Loop", //next, we have a loop which is going to loop through all our trials/strips
      "parameters": {},
      //every time the loop runs, it will use a set of parameters from this list
      "templateParameters": trialsB3,
      "responses": {},
      "messageHandlers": {},
      "shuffle": true, //this means the trials will be in a shuffled order
      "title": "TrialB3",
      "datacommit": false,
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
				"<p>Get ready for the next strip!</p>"+
				"<p>This is trial " + trialIndex + " of "+n_trials+"</p>"+
				"</div></main>"
					this.parameters.getReadyText = getReadyText
					this.options.media.images=[URL_stem + this.parameters.p1path,URL_stem + this.parameters.p2path,URL_stem + this.parameters.p3path,URL_stem + this.parameters.p4path,URL_stem + this.parameters.p5path,URL_stem + this.parameters.p6path]
					//console.log("hello")
			}
},
            "title": "GetReady",
            "content": "${parameters.getReadyText}",
            "timeout": getReadyDuration,
            "datacommit": false
          },
          {
            "type": "lab.html.Screen", //a screen presenting our stimulus
            "responses": {
              "keypress(Space)": "continue"
            },
            "title": "panel1", //tells us which panel we are using
            "content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'><img src='" + URL_stem + "${parameters.p1path}" +"'></div></main>" 
          },
          {
            "type": "lab.html.Screen", //a screen presenting our stimulus
            "responses": {
              "keypress(Space)": "continue"
            },
            "title": "panel2", //tells us which panel we are using
            "content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'><img src='" + URL_stem + "${parameters.p2path}" +"'></div></main>" 
          },     
          {
            "type": "lab.html.Screen", //a screen presenting our stimulus
            "responses": {
              "keypress(Space)": "continue"
            },
            "title": "panel3", //tells us which panel we are using
            "content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'><img src='" + URL_stem + "${parameters.p3path}" +"'></div></main>" 
          },
          {
            "type": "lab.html.Screen", //a screen presenting our stimulus
            "responses": {
              "keypress(Space)": "continue"
            },
            "title": "panel4", //tells us which panel we are using
            "content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'><img src='" + URL_stem + "${parameters.p4path}" +"'></div></main>" 
          },
          {
            "type": "lab.html.Screen", //a screen presenting our stimulus
            "responses": {
              "keypress(Space)": "continue"
            },
            "title": "panel5", //tells us which panel we are using
            "content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'><img src='" + URL_stem + "${parameters.p5path}" +"'></div></main>" 
          },
          {
            "type": "lab.html.Screen", //a screen presenting our stimulus
            "responses": {
              "keypress(Space)": "continue"
            },
            "title": "panel6", //tells us which panel we are using
            "content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'><img src='" + URL_stem + "${parameters.p6path}" +"'></div></main>" 
          },       
          {
            "type": "lab.html.Screen", //a screen presenting the question at the end EDITING CONTENT TO NOW SHOW QUESTION
            "responses": {
	            "keypress(1)": "1",
				"keypress(2)": "2",
				"keypress(3)": "3",                 
            },
            "title": "Question", //tells us which panel we are using
            "content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'>" + 
            	"<p>" + "${parameters.qText}" + "</p>" + 
            	"<p>1. " + "${parameters.q1}" +"</p>"+
            	"<p>2. " + "${parameters.q2}" +"</p>"+
            	"<p>3. " + "${parameters.q3}" +"</p>"+
            	"<p></p>"+
            	"<p>" + questionText +"</p>"+
            	"</div></main>" 
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
study.on('end', () => study.options.datastore.show())

// Let's go!
study.run()
