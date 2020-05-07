
// jquery functions which interact with the video, slider etc

//These anon functions will load and autoplay the video, but that doesn't always work anyway.
// $(function() {
//   $('#currentTime').html($('#video_container').find('video').get(0).load());
//   $('#currentTime').html($('#video_container').find('video').get(0).play());
// })

//function that fires every x ms
//set the labels and keep a log of the ratings
setInterval(function() {
	var cTime=$('#video_container').find('video').get(0).currentTime;
  	$('#currentTime').html(cTime);
  	var cVal=$('#myRange').val()
  	$('#currentEmotion').html(cVal);
  timeseries.push([cTime,cVal]);
}, 500)
    
//when the doc is loaded, add an event which triggers when we are done
$(document).ready(function(){
	$('video').on('ended',function(){
		//this function fires at the end of the video
		//send a message to the parent (Qualtrics) and pass the data
		var m = JSON.stringify(timeseries);
		parent.postMessage(m,"*") 
		//change the text label to say we're at the end and can finish
		$('#instructLabel').html('End of video, click the "next" button to continue...');
	});
	
	  // Get a reference to the div on the page that will display the
	  // message text.
	  var viddiv = document.getElementById('video_container');
	  console.log("IF onready fires")

	  // A function to process messages received by the window.
	  function receiveMessage(e) {
	    // Check to make sure that this message came from the correct domain.
	  console.log("receive function fires")	  
	  console.log(e)	 	  
	    if (e.origin !== "essex.eu.qualtrics.com")
	      return;

	    // Update the div element to display the message.
	    viddiv.innerHTML = "Message Received: " + e.data;
	  }

	  // Setup an event listener that calls receiveMessage() when the window
	  // receives a new MessageEvent.
	  window.addEventListener('message', receiveMessage);	
	  parent.iframeReady();
	
});

//start a new array when script is first run
var timeseries = [['vidms','rating']];

//don't need this any more
//useful function for downloading a CSV from an array
function exportToCsv(filename, rows) {
        var processRow = function (row) {
            var finalVal = '';
            for (var j = 0; j < row.length; j++) {
                var innerValue = row[j] === null ? '' : row[j].toString();
                if (row[j] instanceof Date) {
                    innerValue = row[j].toLocaleString();
                };
                var result = innerValue.replace(/"/g, '""');
                if (result.search(/("|,|\n)/g) >= 0)
                    result = '"' + result + '"';
                if (j > 0)
                    finalVal += ',';
                finalVal += result;
            }
            return finalVal + '\n';
        };

        var csvFile = '';
        for (var i = 0; i < rows.length; i++) {
            csvFile += processRow(rows[i]);
        }

        var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }
