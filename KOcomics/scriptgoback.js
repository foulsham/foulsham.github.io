//Script for running PS300 on ConstituentLayout (Konstantina O)

//Script for running the experiment. Modified from a builder example from lab.js

//template code can be downloaded from  https://labjs.felixhenninger.com

//LATEST CHANGES FEB 2021
// - added question screen, this is loaded from datasource and presented as an HTML at the end
// - this VERSION allows people to go back, meaning trial loop is rewritten to use functions
// - also added preloading which may help?

//NOTES ON CHANGING!

//TO CHANGE THE INSTRUCTION TEXT edit this
	//var instructions = "You will now see a set of short comic strips like the ones you might see in a newspaper. Some of the images may have information missing, but your job is simply to read them and try to understand the story. You will see each panel one at a time. When you've read each panel, press SPACE to continue. At the end of each strip we'll ask you how easy it was to understand the story. Please press the space bar when you're ready."
	// To make it prettier, define it within html
	var instructions = "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'>"+
	"<p>You will now see a set of short comic strips like the ones you might see in a newspaper.</p>"+
	"<p>Your job is simply to read them and try to understand the story.</p>"+
	"<p>You will see each panel one at a time. When you've read each panel, <b>press 2 to continue or press 1 to move back a panel.</b></p>"+
	"<p>At the end of each strip we'll ask you a True/False question about the story.</p>"+
	"<p>Please press SPACE when you're ready (you may need to click here with the mouse first!)</p>"+
	"</div></main>"
	var getReadyText = "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'><p>Get ready for the next strip!</p></div></main>"
	
	var questionText = "Press 1 for TRUE and 2 for FALSE"
	
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

		//this is the list of parameters that we are going to end up with for every "trial" sequence
		trialProps=["version","stripnum","strip","condition","p1path","p2path","p3path","p4path","p5path","p6path","qText","corrresp"];

		trials=[];
		for (index = 0; index < n_trials; index++) {

			//for each trial, loop through and add them to a new object with named fields
			thisTrial={};
			for (p = 0; p < trialProps.length; p++) {
				thisTrial[trialProps[p]]=DataSource[index][p];
			}
			trials.push(thisTrial);
		}

		var m = Math.random() //randomly order blocks 1 and 2
		if (m>0.5) {
			trialsB1=trials.slice(0,(n_trials/2));
			trialsB2=trials.slice((n_trials/2)); }
		else {
			trialsB2=trials.slice(0,(n_trials/2));
			trialsB1=trials.slice((n_trials/2)); }			
			


//TO CHANGE THE GET READY SCREEN TO GIVE AN UPDATE ON PROGRESS
// a handler function will run every time the screen is prepared to update this
	var trialIndex = 0
	var getReadyText = "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'>"+
	"<p>Get ready for the next strip!</p>"+
	"<p>This is trial " + trialIndex + " of "+n_trials+"</p>"+
	"</div></main>"
	//console.log(trials)
	
		
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
      //the loop works by repeating a template, defined here
      "template": {
        "type": "lab.flow.Sequence",
        "parameters": {},
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
				"<p>Get ready for the next strip!</p>"+
				"<p>Press 2 to move forward and 1 to move back to the previous panel.</p>"+
				"<p>This is trial " + trialIndex + " of "+n_trials+"</p>"+
				"</div></main>"
					this.parameters.getReadyText = getReadyText
					//this.options.media.images=[this.parameters.p1path]
					//console.log(this.options.media)
			}
},
            "title": "GetReady",
            "content": "${parameters.getReadyText}",
            "timeout": getReadyDuration,
            "datacommit": false
          },
              
		  {
			"type": "lab.html.Screen", //a screen presenting our stimulus. NEW: now just one screen with events which control looping
			"parameters":{"p":1,"panelTimes":[],"lastTime":0}, //keep track of panel count and response times
			"title": "panels", //tells us we are showing panels, have to handle everything else ourselves
			"media":{}, //new, for preloading. Sets up empty object which we then fill in beforeprep handler
			"content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;' id='imdiv'><img src='" + URL_stem + "${parameters.p1path}" +"'></div></main>", 
			'events': {"keypress(2)": function(event) { //we'll call this function to go to next panel
      					p=this.parameters.p+1
      					this.parameters.p=p
      					pt=this.parameters.panelTimes
      					x=null
      					switch (p) { //depending on the current panel set the new one
      					//when we switch, duration is the diff between last event time and time now
      						case 2: //we've advanced to 2, i.e., ended 1
      							ctext = URL_stem + this.parameters.p2path;
      							x={"p":1,"dur":this.timer-this.parameters.lastTime}; 
      							break;
      						case 3:
      							ctext = URL_stem + this.parameters.p3path;
      							x={"p":2,"dur":this.timer-this.parameters.lastTime};
      							break;      
      						case 4: 
      							ctext = URL_stem + this.parameters.p4path;
      							x={"p":3,"dur":this.timer-this.parameters.lastTime};
      							break;
      						case 5:
      							ctext = URL_stem + this.parameters.p5path;
      							x={"p":4,"dur":this.timer-this.parameters.lastTime};
      							break; 
      						case 6: 
      							ctext = URL_stem + this.parameters.p6path;
      							x={"p":5,"dur":this.timer-this.parameters.lastTime};
      							break;
      						case 7: //end component here by calling end, not sure how though!
      							x={"p":6,"dur":this.timer-this.parameters.lastTime};    							
      							this.end()							      													      					
      					}	
      					//add the data to our growing list						
      					pt.push(x);
      					this.parameters.panelTimes=pt;
      					//reset the last time
      					this.parameters.lastTime=this.timer;
      										
      					//now change it using div
      					document.getElementById('imdiv').innerHTML="<img src='" + ctext + "'>";
										},//end of this event
									
						"keypress(1)": function(event) { //we'll call this to go back a panel
      					p=this.parameters.p-1
      					this.parameters.p=p
      					pt=this.parameters.panelTimes
      					x=null      					
      					switch (p) { //depending on the current panel set the new one
      					  							
      						case 1: //we've come from 2
      							ctext = URL_stem + this.parameters.p1path;
      							x={"p":2,"dur":this.timer-this.parameters.lastTime};
      							break;
      						case 2:
      							ctext = URL_stem + this.parameters.p2path;
      							x={"p":3,"dur":this.timer-this.parameters.lastTime};
      							break;      
      						case 3: 
      							ctext = URL_stem + this.parameters.p3path;
      							x={"p":4,"dur":this.timer-this.parameters.lastTime};
      							break;
      						case 4:
      							ctext = URL_stem + this.parameters.p4path;
      							x={"p":5,"dur":this.timer-this.parameters.lastTime};
      							break; 
      						case 5: 
      							ctext = URL_stem + this.parameters.p5path;	
      							x={"p":6,"dur":this.timer-this.parameters.lastTime};				      													      					
      					}					
      					
      					//handle case where we've tried to go back on p1
      					if (p>0) {
							//add the data to our growing list						
							pt.push(x);
							this.parameters.panelTimes=pt;
							//reset the last time
							this.parameters.lastTime=this.timer;      					
												
							//now change it using div
							document.getElementById('imdiv').innerHTML="<img src='" + ctext + "'>";		
      					}   else {
      					
      						p=1;
      						this.parameters.p=p;
      					
      					}
											
							},//end of this event
						},//end of all events
				"messageHandlers": {"before:prepare": function anonymous(){ //this is a function which will happen each time we prepare this component
					this.options.media.images=[URL_stem + this.parameters.p1path,URL_stem + this.parameters.p2path,URL_stem + this.parameters.p3path,URL_stem + this.parameters.p4path,URL_stem + this.parameters.p5path,URL_stem + this.parameters.p6path]
					//console.log(this.options.media)
			}
},			
		  },
         
                
          {
            "type": "lab.html.Screen", //a screen presenting the question at the end EDITING CONTENT TO NOW SHOW QUESTION
            "responses": {
	            "keypress(1)": "1",
				"keypress(2)": "2",                 
            },
            "title": "Question", //tells us which panel we are using
            "content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'>" + "<p>" + "${parameters.qText}" + "</p><p>" + questionText +"</p></div></main>" 
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
      //the loop works by repeating a template, defined here
      "template": {
        "type": "lab.flow.Sequence",
        "parameters": {},
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
				"<p>Get ready for the next strip!</p>"+
				"<p>Press 2 to move forward and 1 to move back to the previous panel.</p>"+
				"<p>This is trial " + trialIndex + " of "+n_trials+"</p>"+
				"</div></main>"
					this.parameters.getReadyText = getReadyText
					//this.options.media.images=[this.parameters.p1path]
					//console.log(this.options.media)
			}
},
            "title": "GetReady",
            "content": "${parameters.getReadyText}",
            "timeout": getReadyDuration,
            "datacommit": false
          },
              
		  {
			"type": "lab.html.Screen", //a screen presenting our stimulus. NEW: now just one screen with events which control looping
			"parameters":{"p":1,"panelTimes":[],"lastTime":0}, //keep track of panel count and response times
			"title": "panels", //tells us we are showing panels, have to handle everything else ourselves
			"media":{}, //new, for preloading. Sets up empty object which we then fill in beforeprep handler
			"content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;' id='imdiv'><img src='" + URL_stem + "${parameters.p1path}" +"'></div></main>", 
			'events': {"keypress(2)": function(event) { //we'll call this function to go to next panel
      					p=this.parameters.p+1
      					this.parameters.p=p
      					pt=this.parameters.panelTimes
      					x=null
      					switch (p) { //depending on the current panel set the new one
      					//when we switch, duration is the diff between last event time and time now
      						case 2: //we've advanced to 2, i.e., ended 1
      							ctext = URL_stem + this.parameters.p2path;
      							x={"p":1,"dur":this.timer-this.parameters.lastTime}; 
      							break;
      						case 3:
      							ctext = URL_stem + this.parameters.p3path;
      							x={"p":2,"dur":this.timer-this.parameters.lastTime};
      							break;      
      						case 4: 
      							ctext = URL_stem + this.parameters.p4path;
      							x={"p":3,"dur":this.timer-this.parameters.lastTime};
      							break;
      						case 5:
      							ctext = URL_stem + this.parameters.p5path;
      							x={"p":4,"dur":this.timer-this.parameters.lastTime};
      							break; 
      						case 6: 
      							ctext = URL_stem + this.parameters.p6path;
      							x={"p":5,"dur":this.timer-this.parameters.lastTime};
      							break;
      						case 7: //end component here by calling end, not sure how though!
      							x={"p":6,"dur":this.timer-this.parameters.lastTime};    							
      							this.end()							      													      					
      					}	
      					//add the data to our growing list						
      					pt.push(x);
      					this.parameters.panelTimes=pt;
      					//reset the last time
      					this.parameters.lastTime=this.timer;
      										
      					//now change it using div
      					document.getElementById('imdiv').innerHTML="<img src='" + ctext + "'>";
										},//end of this event
									
						"keypress(1)": function(event) { //we'll call this to go back a panel
      					p=this.parameters.p-1
      					this.parameters.p=p
      					pt=this.parameters.panelTimes
      					x=null      					
      					switch (p) { //depending on the current panel set the new one
      					  							
      						case 1: //we've come from 2
      							ctext = URL_stem + this.parameters.p1path;
      							x={"p":2,"dur":this.timer-this.parameters.lastTime};
      							break;
      						case 2:
      							ctext = URL_stem + this.parameters.p2path;
      							x={"p":3,"dur":this.timer-this.parameters.lastTime};
      							break;      
      						case 3: 
      							ctext = URL_stem + this.parameters.p3path;
      							x={"p":4,"dur":this.timer-this.parameters.lastTime};
      							break;
      						case 4:
      							ctext = URL_stem + this.parameters.p4path;
      							x={"p":5,"dur":this.timer-this.parameters.lastTime};
      							break; 
      						case 5: 
      							ctext = URL_stem + this.parameters.p5path;	
      							x={"p":6,"dur":this.timer-this.parameters.lastTime};				      													      					
      					}					
      					
      					//handle case where we've tried to go back on p1
      					if (p>0) {
							//add the data to our growing list						
							pt.push(x);
							this.parameters.panelTimes=pt;
							//reset the last time
							this.parameters.lastTime=this.timer;      					
												
							//now change it using div
							document.getElementById('imdiv').innerHTML="<img src='" + ctext + "'>";		
      					}   else {
      					
      						p=1;
      						this.parameters.p=p;
      					
      					}
											
							},//end of this event
						},//end of all events
				"messageHandlers": {"before:prepare": function anonymous(){ //this is a function which will happen each time we prepare this component
					this.options.media.images=[URL_stem + this.parameters.p1path,URL_stem + this.parameters.p2path,URL_stem + this.parameters.p3path,URL_stem + this.parameters.p4path,URL_stem + this.parameters.p5path,URL_stem + this.parameters.p6path]
					//console.log(this.options.media)
			}
},			
		  },
         
                
          {
            "type": "lab.html.Screen", //a screen presenting the question at the end EDITING CONTENT TO NOW SHOW QUESTION
            "responses": {
	            "keypress(1)": "1",
				"keypress(2)": "2",                 
            },
            "title": "Question", //tells us which panel we are using
            "content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'>" + "<p>" + "${parameters.qText}" + "</p><p>" + questionText +"</p></div></main>" 
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
//study.on('end', () => study.options.datastore.show())

// Let's go!
study.run()

