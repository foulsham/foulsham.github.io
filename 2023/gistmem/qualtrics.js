https://essex.eu.qualtrics.com/jfe/form/SV_beFIC5AD6ElOHMW

Qualtrics.SurveyEngine.addOnload(function()
{
	/*Place your JavaScript here to run when the page loads*/
		//console.log('A')
	
		//this code removes the "Powered by Qualtrics" label which might get in the way of our study
		//if it doesn't work, check page transitions are set to NONE
        var plug = document.getElementById("Plug"); //Get the Defined element
        plug.style.cssText += ';display:none !important;'; //Set the defined element's display style to "none"
});

Qualtrics.SurveyEngine.addOnReady(function()
{

//this code from lab.js will save the data in the embedded data field
	
// Listen for the study sending data
window.addEventListener('message', function(event) {

  // Make sure that the event is from lab.js, then ...
  if (event.data.type === 'labjs.data') {
    // ... extract the data lab.js is sending.

    // We're going to work with JSON data
    const data = event.data.json
	
	//because of character limits in embedded data, now chopping the data up a bit to make sure it is all saved
	//this works best if we have some idea how long it is going to be
	var datalen = data.length;
	Qualtrics.SurveyEngine.setEmbeddedData('data-len', datalen); //save the length so we know
	  console.log(datalen)
	  
	  //use two fields if data is less than 100k, since Q can handle up to 50k I think
	  if (datalen<100000) {
		  
		  try {
		  			o1 = data.slice(0,49999)
		  			Qualtrics.SurveyEngine.setEmbeddedData('labjs-data', o1)
			  		o2 = data.slice(49999,datalen)
			  		Qualtrics.SurveyEngine.setEmbeddedData('data-pt2', o2)
		  }
		  catch(err) {console.log('error saving overflows <100k')		  }				  
		  
	  }
	  
	  //use three if data is more, this will only be good up to 150k
	  if (datalen>=100000) {
		  
		  try {
		  			o1 = data.slice(0,49999)
		  			Qualtrics.SurveyEngine.setEmbeddedData('labjs-data', o1)
			  		o2 = data.slice(49999,99999)
			  		Qualtrics.SurveyEngine.setEmbeddedData('data-pt2', o2)
			  		o3 = data.slice(99999,datalen)
			  		Qualtrics.SurveyEngine.setEmbeddedData('data-pt3', o3)			  
		  }
		  catch(err) {console.log('error saving overflows >100k')		  }				  
		  
	  }	  
	  
	  //use four now!
	  if (datalen>=150000) {
		  
		  try {
		  			o1 = data.slice(0,49999)
		  			Qualtrics.SurveyEngine.setEmbeddedData('labjs-data', o1)
			  		o2 = data.slice(49999,99999)
			  		Qualtrics.SurveyEngine.setEmbeddedData('data-pt2', o2)
			  		o3 = data.slice(99999,149999)
			  		Qualtrics.SurveyEngine.setEmbeddedData('data-pt3', o3)			
			  		o4 = data.slice(149999,datalen)
			  		Qualtrics.SurveyEngine.setEmbeddedData('data-pt4', o4)					  
		  }
		  catch(err) {console.log('error saving overflows >150k')		  }				  
		  
	  }	  	  
	  
	  //to make life easier, also create a slimmed down version of the data...
	  //use JSON and edit the fields etc
	  try {

		  	console.log('trying to shorten encdata')
				const x=JSON.parse(data) //get the data back into JSON

				var shortOb = [];
			  //loop through, adding only the fields we want
				for (var i = 0, len = x.length; i < len; i++) {
					o={}
					// add any fields you want, I'm keeping names as short as possible
					
					//we can do a test like this to only include certain trials
					if (x[i].sender=='ExpImg') {
			  		o.i=x[i].ind;
					o.im=x[i].imList[0];
					o.c=x[i].cond;  
					o.seq=x[i].seq;  
					o.run=x[i].run;
					o.len=x[i].len;
					o.d=x[i].duration;						
				  	shortOb.push(o)
				  }
				}
			
			  //put it back to a string
			  var shortJS = JSON.stringify(shortOb);
				Qualtrics.SurveyEngine.setEmbeddedData('encdata', shortJS)
		  		console.log(shortJS)
		  
		  
		  console.log('trying to shorten testdata')
		  shortOb = [];
			  //loop through, adding only the fields we want
				for (var i = 0, len = x.length; i < len; i++) {
					o={}
					// add any fields you want, I'm keeping names as short as possible
					
					//we can do a test like this to only include certain trials
					if (x[i].sender=='TestImg') {
			  		o.im=x[i].imList[0];
					o.c=x[i].cond;  
					o.m=x[i].mem;
					o.d=x[i].duration;		
					o.r=x[i].response;	
				  	shortOb.push(o)
				  }
				}
			
			  //put it back to a string
			  shortJS = JSON.stringify(shortOb);
				Qualtrics.SurveyEngine.setEmbeddedData('Tdata', shortJS)
		  		console.log(shortJS)

		  }
		  catch(err) {

				console.log('error shortening JSON...')
		  }		

	  
    document.querySelector('.NextButton').click()
  }
})

});

Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/


});