
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
// 	  if(confirm('Video has ended! We can now download data...')){
// 	  exportToCsv('ratings.csv', timeseries)
// 	  };
		parent.postMessage(timeseries,"*")
// 		Qualtrics.SurveyEngine.setEmbeddedData('ts-data', timeseries)
// 		document.querySelector('.NextButton').click()	  
	});
});

//start a new array when script is first run
var timeseries = [['vidms','rating']];

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
