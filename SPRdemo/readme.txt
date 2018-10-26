README for Self-paced reading experiment

Programmed in lab.js, and designed to work with Qualtrics

TF, Oct 2018

FOLDER STRUCTURE AND LINKS

The whole folder can be uploaded to GitHub pages so that it can be loaded as a webpage (independently and in an iframe within Qualtrics). 

Contents:

	DataSource.js: a file for loading in all the filenames or associated data. Alternatively, this could be uploaded elsewhere and called via URL. Linked in a separate script tag in index.html.

	index.html: a home page which will display while the experiment is loading. This also loads in the .js content

	/lib: folder with core files from the lab.js library

	script.js: the actual experiment code, this will be executed once the page loads

	style.css: from lab.js, this allows one to specify custom css

Images could be placed in a sub-folder, or linked from elsewhere on the web. The folder URL is indicated in script.js.


DATASOURCE, PARAMETERS AND CONDITION LABELS

This example uses counterbalanced trial information stored in DataSource.js. This list contains condition labels defined at the top of script.js, which are passed to each template trial by lab.js. They should appear in the results for each screen.


INTEGRATING WITH QUALTRICS




SUGGESTED WORKFLOW

Run a local copy of the code by opening the html in browser (with development tools for debugging). THEN run a hosted copy of the code on the web. THEN run a qualtrics survey with the html embedded.