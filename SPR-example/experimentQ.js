// Comic reading example with lab.js
// Example experiment by TF, Oct 2018

//choose one of the 3 counterbalanced sets
var DataSource = AllDataSources[Math.floor(Math.random()*AllDataSources.length)];

var n_trials = 3;//DataSource.length; //length of array gives number of sequences
var URL_stem = "img/"; //location of the stimuli, relative path to this file

// LAB.JS loop will handle randomisation, but need to transform the DataSource into an object for the trial list
// i.e., loop through the data source, adding each item to named properties
trialProps=['version','strip','condition','p1path','p2path','p3path','p4path','p5path','p6path'];
trials=[];
for (index = 0; index < n_trials; index++) {

	//for each trial, loop through and add them to a new object with named fields
	thisTrial={};
	for (p = 0; p < trialProps.length; p++) {
		thisTrial[trialProps[p]]=DataSource[index][p];
	}
	trials.push(thisTrial);

}

// Define a template for a trial (i.e., a full strip)
var trialTemplate = new lab.flow.Sequence({
  content: [
    // Pre-trial prompt screen ----------------------------------------------------------
    // Don't bother using external html for this
    // but substitutes a gray plus as a fixation cross
    new lab.html.Screen({
      content: '<main class="content-vertical-center content-horizontal-center"><div style="text-align:center;"><p>Get ready for the next strip!</p></div></main>',
      // Don't log data from this screen
      datacommit: false,
      // Display thi screen for 1s
      timeout: 1000,
    }),
    // Strip images x 6------------------------------------------------------------
    // This is the main stimulus and
    // the display that participants respond to.
    // Should really do this in a nested loop, but seems tricky to pass list of params?
	new lab.html.Screen({
	  title: 'p1', //helps identify objects
	  content: '<main class="content-vertical-center content-horizontal-center"><div><img src='+URL_stem+'${parameters.p1path}'+'></div></main>', 
	  responses: {
		'keypress(Space)': 'continue'
	  },
	}),
	new lab.html.Screen({
	  title: 'p2', //helps identify objects
	  content: '<main class="content-vertical-center content-horizontal-center"><div><img src='+URL_stem+'${parameters.p2path}'+'></div></main>', 
	  responses: {
		'keypress(Space)': 'continue'
	  },  
	}),
	new lab.html.Screen({
	  title: 'p3', //helps identify objects
	  content: '<main class="content-vertical-center content-horizontal-center"><div><img src='+URL_stem+'${parameters.p3path}'+'></div></main>', 
	  responses: {
		'keypress(Space)': 'continue'
	  },  
	}),
	new lab.html.Screen({
	  title: 'p4', //helps identify objects
	  content: '<main class="content-vertical-center content-horizontal-center"><div><img src='+URL_stem+'${parameters.p4path}'+'></div></main>', 
	  responses: {
		'keypress(Space)': 'continue'
	  },  
	}),
	new lab.html.Screen({
	  title: 'p5', //helps identify objects
	  content: '<main class="content-vertical-center content-horizontal-center"><div><img src='+URL_stem+'${parameters.p5path}'+'></div></main>', 
	  responses: {
		'keypress(Space)': 'continue'
	  },  
	}),
	new lab.html.Screen({
	  title: 'p6', //helps identify objects
	  content: '<main class="content-vertical-center content-horizontal-center"><div><img src='+URL_stem+'${parameters.p6path}'+'></div></main>', 
	  responses: {
		'keypress(Space)': 'continue'
	  },  
	}),       
    // Question screen ----------------------------------------------
    // just the same, but change to show progress too?
    new lab.html.Screen({
      // Each screen is assigned a title,
      // so that we can recognize it more easily
      // in the dataset.
      title: 'Q',
      content: '<main class="content-vertical-center content-horizontal-center"><div><img src='+URL_stem+'Question.jpg'+'></div></main>', 
      responses: {
        'keypress(1)': '1',
        'keypress(2)': '2',
        'keypress(3)': '3',
        'keypress(4)': '4',
        'keypress(5)': '5',
        'keypress(6)': '6',
        'keypress(7)': '7',                        
      },
    }), 
        
  ],
})

// With the individual components in place,
// now put together the entire experiment
var experiment = new lab.flow.Sequence({
  content: [
    // Initial instructions
    // THESE ARE STORED SEPARATELY AS HTML NOW
    new lab.html.Screen({
      contentUrl: 'pages/1-welcome.html',
      responses: {
        'keypress(Space)': 'continue'
      },
    }),
    // Actual trials
    new lab.flow.Loop({
      template: trialTemplate,
      templateParameters: trials,
      shuffle: true,
    }),
    // Thank-you page
    new lab.html.Screen({
      content: '<main class="content-vertical-center content-horizontal-center"><div style="text-align:center;"><p>That is the end of this part of the experiment!</p></div></main>',
      // Respond to clicks on the download button
		timeout: 1000,
    }),
  ],
  datastore: new lab.data.Store(),
})

// Go!
experiment.run()
