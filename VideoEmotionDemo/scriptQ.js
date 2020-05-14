
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
	var totalDur=$('#video_container').find('video').get(0).duration;
	if((cTime>0) && (cTime<totalDur)){
		console.log(cTime);
		$('#currentTime').html(cTime);
		var cVal=$('#myRange').val()
		$('#currentEmotion').html(cVal);
	  timeseries.push([cTime,cVal]);
	};
}, 250) //set the interval in ms here. 250ms = 4Hz
    
//when the doc is ready, add the current video and then add an event to listen for the end
$(document).ready(function(){
	
	//get the URL query string and use it to set the video we're displaying on this trial
	//this is neat since we are embedding this and can customize the one html doc
	const queryString = window.location.search;
	console.log(queryString);
	const urlParams = new URLSearchParams(queryString);
	var thisVid = urlParams.get('vid');
	var viddiv = document.getElementById('video_container');
	
	var vidhtml = '<video preload="none" poster="poster.jpg" controls="" id="video" tabindex="0"><source type="video/mp4" src="'+
	thisVid+'.mp4" id="mp4"></source><source type="video/webm" src="'+thisVid+
	'.webm" id="webm"></source><p>Your setup does not support the HTML5 Video element.</p></video>'	;
	
	viddiv.innerHTML = vidhtml;	
	
	$('video').on('ended',function(){
		//this function fires at the end of the video
		//send a message to the parent (Qualtrics) and pass the data
		console.log("firing on end of vid");
		var m = JSON.stringify(timeseries);
		parent.postMessage(m,"*") 
		//change the text label to say we're at the end and can finish
		$('#instructLabel').html('End of video, click the "next" button to continue...');
	});	
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
