//Script for running PS900 project on gist memory (Keiti, Aina). June 2023


//Script for running the experiment. Modified from a builder example from lab.js

//template code can be downloaded from  https://labjs.felixhenninger.com

//NOTES ON CHANGING!

//TO CHANGE THE INSTRUCTION TEXT edit this
	
	// To make it prettier, define these within html
	var instructions = "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'>"+
	"<p>Instructions go here. </p>"+
	"<p>....</p>"+
	"<p><strong>...</strong></p>"+
	"<p>The first few trials are for you to PRACTICE.</p>"+
	"<p>Please press SPACE when you're ready (you may need to click here with the mouse first!)</p>"+
	"</div></main>"
	var practestinstruct = "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'>"+
	"<p>(This is the PRACTICE). </p>"+
	"<p>You will now see some more images, some of which are the ones you saw previously and some of which are new images that you have not seen before. Did you see this before?</p>"+
	"<p><strong>Press Y if the image is and old one you saw before and N if it is not</strong></p>"+
	"<p></p>"+
	"<p>Please press SPACE when you're ready</p>"+
	"</div></main>"
	var pracinstruct = "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'>"+
	"<p>That is the end of the practice. The remaining trials work in exactly the same way. </p>"+
	"<p>For the first block, just try to remember each image. Press space when you have finished looking at each image to move on to the next one.</p>"+
	"<p></p>"+
	"<p>Please press SPACE when you're ready to start</p>"+
	"</div></main>"	
	var testinstruct = "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'>"+
	"<p>Now we will test your memory for what you have just seen. </p>"+
	"<p>You will now see some more images, some of which are the ones you saw previously and some of which are new images that you have not seen before. Did you see this before?</p>"+
	"<p><strong>Press Y if the image is and old one you saw before and N if it is not</strong></p>"+
	"<p>If you are not sure, just make your best guess.</p>"+
	"<p>Please press SPACE when you're ready</p>"+
	"</div></main>"	
	
	//not actually used anymore
	var getReadyText = "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'><p>Get ready for the next trial!</p></div></main>"
	
//CHANGE THE ISI DURATIONS HERE
	var getReadyDuration = 1000
	var fixCrossDuration = 1000

//TO CHANGE THE SEQUENCE OF EVENTS IN A TRIAL...
	//head down to line 100ish where the inner loop template starts

//TO CHANGE THE SOURCE IMAGES ETC
	var URL_stem = "img/"; //location of the stimuli, relative path to this file

	//load in the list of images in each condition
	//this is now done already in the html
		
	//we have a practice list for encoding and for test (PracticeDataSource, PracticeTest)
	
	//and we have counterbalanced lists for the experimental trials
	
	// reconfigure practice datasources
	
	var n_trials = 3;

		pracEncTrials=[];
		for (index = 0; index < n_trials; index++) {
		
			thisTrial={};
			thisTrial["imList"] = [URL_stem+PracticeDataSource[index]];
			var T = "<main class='content-vertical-center content-horizontal-center'>"+
			"<div style='text-align:center;'>"+
    		"<img src='" + URL_stem + PracticeDataSource[index]+"'>"+
			"<p>Try to remember this image. Press space to move on.</p> </div> </main>";
        	thisTrial["imHTML"] = T;
   
			pracEncTrials.push(thisTrial);
		}
	
	var n_trials = 6;

		pracTestTrials=[];
		for (index = 0; index < n_trials; index++) {
		
			thisTrial={};
			thisTrial["imList"] = [URL_stem+PracticeTest[index]];
			var T = "<main class='content-vertical-center content-horizontal-center'>"+
			"<div style='text-align:center;'>"+
    		"<img src='" + URL_stem + PracticeTest[index]+"'>"+
			"<p>Did you see this image before? Press Y or N.</p> </div> </main>";
        	thisTrial["imHTML"] = T;
   
			pracTestTrials.push(thisTrial);
		}		
		
	//for experimental trials, first randomly choose one of the two datasources
	var R = Math.floor(Math.random()*ExpDataSource.length);
	var EDS = ExpDataSource[R];
	var ET = ExpTest[R];
	
	//then randomise the encoding trials, but keeping the blocks together
	
		//make a list of the blocks and shuffle it
		var S = Array(9).fill(1).map( (_, i) => i+1 );
		var S2 = Array(9).fill(1).map( (_, i) => i+10 );
		
			var currentIndex = 9,  randomIndex;

			  // While there remain elements to shuffle...
			  while (0 !== currentIndex) {

				// Pick a remaining element...
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex--;

				// And swap it with the current element.
				[S[currentIndex], S[randomIndex]] = [
				  S[randomIndex], S[currentIndex]];
			  }

			var currentIndex = 9,  randomIndex;

			  // While there remain elements to shuffle...
			  while (0 !== currentIndex) {

				// Pick a remaining element...
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex--;

				// And swap it with the current element.
				[S2[currentIndex], S2[randomIndex]] = [
				  S2[randomIndex], S2[currentIndex]];
			  }
		S=S.concat(S2)
		
	//randomise order of run 1 and 2
	var m = Math.random() //randomly order blocks 1 and 2
	if (m>0.5) {
		A=S.slice(0,9);
		B=S.slice(9);
		S=B;
		S=S.concat(A);}	
		
	//loop through and filter to build the new object
	encTrials=[]
	for (index = 0; index < 18; index++) {
		
var F = EDS.filter(function(c) {return c[3]==this;},S[index])
		
		for (j = 0; j < F.length; j++) {
		
			thisTrial={};
			thisTrial["ind"]= F[j][0];
			thisTrial["imList"] = [URL_stem+F[j][1]];
			var T = "<main class='content-vertical-center content-horizontal-center'>"+
			"<div style='text-align:center;'>"+
    		"<img src='" + URL_stem + F[j][1]+"'>"+
			"<p>Try to remember this image. Press space to move on.</p> </div> </main>";
        	thisTrial["imHTML"] = T;
        	thisTrial["cond"]= F[j][2];
        	thisTrial["seq"]= F[j][3];
        	thisTrial["run"]= F[j][4];
        	thisTrial["len"]= F[j][5];        	        	
   
			encTrials.push(thisTrial);			
		
		}
		
		}
		
		

	//test trials will all get shuffled anyway
	var n_trials = ET.length;

		testTrials=[];
		for (index = 0; index < n_trials; index++) {
		
			thisTrial={};
			thisTrial["imList"] = [URL_stem+ET[index][0]];
			var T = "<main class='content-vertical-center content-horizontal-center'>"+
			"<div style='text-align:center;'>"+
    		"<img src='" + URL_stem + ET[index][0]+"'>"+
			"<p>Did you see this image before? Press Y or N.</p> </div> </main>";
        	thisTrial["imHTML"] = T;
        	thisTrial["cond"]= ET[index][1];
        	thisTrial["mem"]= ET[index][2];
   
			testTrials.push(thisTrial);
		}	
	
	//for practice, just use first 10 trials
	testTrials=testTrials.slice(0,10);
	encTrials=encTrials.slice(0,20);


//TO CHANGE THE GET READY SCREEN TO GIVE AN UPDATE ON PROGRESS
// a handler function will run every time the screen is prepared to update this
// not using this anymore
	var trialIndex = 0
	var nextBigImage = "circle.jpg";
		
// Define study
//this uses JSON syntax, so need to be careful with double quotes etc?

//this defines the overall study as one big object
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
    "title": "Image experiment",
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
      "type": "lab.flow.Loop", //next, we have a loop which is going to loop through all PRACTICE trials
      "parameters": {},
      //every time the loop runs, it will use a set of parameters from this list
      "templateParameters": pracEncTrials,
      "responses": {},
      "messageHandlers": {},
      "shuffle": true, //this means the trials will be in a shuffled order
      "title": "pracEncLoop",
      "datacommit": false,
      //the loop works by repeating a template, defined here
      "template": {
        "type": "lab.flow.Sequence",
        "parameters": {},
        "media": {},
        "responses": {},
        "messageHandlers": {},
        "title": "Prac Enc Sequence",
        "datacommit": false,
        // this is the content of the template, all of these are going to repeat x times
        "content": [
          {
            "type": "lab.html.Screen", //the TARGET screen
            "parameters": {"getReadyText": getReadyText},
            "responses": {},
            "messageHandlers": {"before:prepare": function anonymous(){ //this is a function which will happen each time we prepare this component
					getReadyText = "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'>"+
				"<p>Get ready!</p>"+
				"</div></main>"
					this.parameters.getReadyText = getReadyText
					//dealing with preloading...
					this.options.media.images=this.parameters.imList					
					//console.log("hello")
			}
},
            "title": "PracGR",
            "content": "${parameters.getReadyText}",
            "timeout": getReadyDuration,
            "datacommit": false
},       
          {
            "type": "lab.html.Screen", //a screen presenting our stimulus
            "responses": {
              "keypress(Space)": "continue"
            },
            "title": "PracImg", //tells us which panel we are using
            "content": "${parameters.imHTML}",  
            "datacommit": false,       
          },
        ]
      } 
    },
            {
      "type": "lab.html.Screen", //this is additional post practice instructions
      "parameters": {},
	  "responses": {
		  "keypress(Space)": "continue"
	  },
      "messageHandlers": {},
      "title": "Intro",
      "content": practestinstruct,
      "datacommit": false
    },
    {
      "type": "lab.flow.Loop", //next, we have a loop which is going to loop through all PRACTICE TEST trials
      "parameters": {},
      //every time the loop runs, it will use a set of parameters from this list
      "templateParameters": pracTestTrials,
      "responses": {},
      "messageHandlers": {},
      "shuffle": true, //this means the trials will be in a shuffled order
      "title": "pracTestLoop",
      "datacommit": false,
      //the loop works by repeating a template, defined here
      "template": {
        "type": "lab.flow.Sequence",
        "parameters": {},
        "media": {},
        "responses": {},
        "messageHandlers": {},
        "title": "Prac Test Sequence",
        "datacommit": false,
        // this is the content of the template, all of these are going to repeat x times
        "content": [
          {
            "type": "lab.html.Screen", //the TARGET screen
            "parameters": {},
            "responses": {},
            "messageHandlers": {"before:prepare": function anonymous(){ //this is a function which will happen each time we prepare this component
					//dealing with preloading...
					this.options.media.images=this.parameters.imList					
					//console.log("hello")
			}
},
            "title": "PracFixCross",
            "content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'><p>+</p></div></main>",
            "timeout": fixCrossDuration,
            "datacommit": false
},       
          {
            "type": "lab.html.Screen", //a screen presenting our stimulus
            "responses": {
              "keypress(y)": "y",
              "keypress(n)": "n"
            },
            "title": "PracTestImg", //tells us which panel we are using
            "content": "${parameters.imHTML}",  
            "datacommit": false,       
          },
        ]
      } 
    },
    
        {
      "type": "lab.html.Screen", //this is additional post practice instructions
      "parameters": {},
	  "responses": {
		  "keypress(Space)": "continue"
	  },
      "messageHandlers": {},
      "title": "Intro",
      "content": pracinstruct,
      "datacommit": false
    },
    {
      "type": "lab.flow.Loop", //next, we have a loop which is going to loop through all our trials
      "parameters": {},
      //every time the loop runs, it will use a set of parameters from this list
      "templateParameters": encTrials,
      "responses": {},
      "messageHandlers": {},
      "shuffle": false, //NOW using custom randomising earlier on
      "title": "trialLoop",
      "datacommit": false,
      //the loop works by repeating a template, defined here
      "template": {
        "type": "lab.flow.Sequence",
        "parameters": {},
        "media": {},
        "responses": {},
        "messageHandlers": {},
        "title": "Exp Sequence",
        "datacommit": false,
        // this is the content of the template, all of these are going to repeat x times
        "content": [
          {
            "type": "lab.html.Screen", //the TARGET screen
            "parameters": {"getReadyText": getReadyText},
            "responses": {},
            "messageHandlers": {"before:prepare": function anonymous(){ //this is a function which will happen each time we prepare this component
					getReadyText = "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'>"+
				"<p>Get ready!</p>"+
				"</div></main>"
					this.parameters.getReadyText = getReadyText
					//dealing with preloading...
					this.options.media.images=this.parameters.imList					
					//console.log("hello")
			}
},
            "title": "ExpGR",
            "content": "${parameters.getReadyText}",
            "timeout": getReadyDuration,
            "datacommit": false
},       
          {
            "type": "lab.html.Screen", //a screen presenting our stimulus
            "responses": {
              "keypress(Space)": "continue",
            },
            "title": "ExpImg", //tells us which panel we are using
            "content": "${parameters.imHTML}",  
            "datacommit": true       
          },
        ]
      } 
    },
            {
      "type": "lab.html.Screen", //this is additional post practice instructions
      "parameters": {},
	  "responses": {
		  "keypress(Space)": "continue"
	  },
      "messageHandlers": {},
      "title": "TestIntro",
      "content": testinstruct,
      "datacommit": false
    },
    {
      "type": "lab.flow.Loop", //next, we have a loop which is going to loop through all TEST trials
      "parameters": {},
      //every time the loop runs, it will use a set of parameters from this list
      "templateParameters": testTrials,
      "responses": {},
      "messageHandlers": {},
      "shuffle": true, //this means the trials will be in a shuffled order
      "title": "testLoop",
      "datacommit": false,
      //the loop works by repeating a template, defined here
      "template": {
        "type": "lab.flow.Sequence",
        "parameters": {},
        "media": {},
        "responses": {},
        "messageHandlers": {},
        "title": "Test Sequence",
        "datacommit": false,
        // this is the content of the template, all of these are going to repeat x times
        "content": [
          {
            "type": "lab.html.Screen", //the TARGET screen
            "parameters": {},
            "responses": {},
            "messageHandlers": {"before:prepare": function anonymous(){ //this is a function which will happen each time we prepare this component
					//dealing with preloading...
					this.options.media.images=this.parameters.imList					
					//console.log("hello")
			}
},
            "title": "FixCross",
            "content": "<main class='content-vertical-center content-horizontal-center'><div style='text-align:center;'><p>+</p></div></main>",
            "timeout": fixCrossDuration,
            "datacommit": false
},       
          {
            "type": "lab.html.Screen", //a screen presenting our stimulus
            "responses": {
              "keypress(y)": "y",
              "keypress(n)": "n"
            },
            "title": "TestImg",
            "content": "${parameters.imHTML}",  
            "datacommit": true,       
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