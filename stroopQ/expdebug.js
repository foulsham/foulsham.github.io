//remaking stroop experiment to check coding

//template for trial
var trialTemplate = new lab.flow.Sequence({
  content: [
    // Pre-trial prompt screen ----------------------------------------------------------
    // Don't bother using external html for this
    // but substitutes a gray plus as a fixation cross
    new lab.html.Screen({
      content: "\u003Cmain class=\"content-vertical-center content-horizontal-center\"\u003E\n  \u003Cdiv style=\"font-size: 3.5rem\"\u003E\n    +\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E\n\n\u003Cfooter class=\"content-vertical-center content-horizontal-center\"\u003E\n  \u003Cp\u003E\n    What's the \u003Cem\u003Ecolor\u003C\u002Fem\u003E of \n    the word shown above? \u003Cbr\u003E\n    Please press \u003Ckbd\u003Er\u003C\u002Fkbd\u003E for red,\n    \u003Ckbd\u003Eg\u003C\u002Fkbd\u003E for green,\n    \u003Ckbd\u003Eb\u003C\u002Fkbd\u003E for blue and \u003Ckbd\u003Eo\u003C\u002Fkbd\u003E for orange.\n  \u003C\u002Fp\u003E\n\u003C\u002Ffooter\u003E\n",
      timeout: 500,
    }),

	new lab.html.Screen({
	  content: "\u003Cmain class=\"content-vertical-center content-horizontal-center\"\u003E\n  \u003Cdiv style=\"\n    font-size: 3.5rem;\n    font-weight: bold;\n    color: ${ parameters.color };\n  \"\u003E\n    ${ parameters.word }\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fmain\u003E\n\n\u003Cfooter class=\"content-vertical-center content-horizontal-center\"\u003E\n  \u003Cp\u003E\n    What's the \u003Cem\u003Ecolor\u003C\u002Fem\u003E of \n    the word shown above? \u003Cbr\u003E\n    Please press \u003Ckbd\u003Er\u003C\u002Fkbd\u003E for red,\n    \u003Ckbd\u003Eg\u003C\u002Fkbd\u003E for green,\n    \u003Ckbd\u003Eb\u003C\u002Fkbd\u003E for blue and \u003Ckbd\u003Eo\u003C\u002Fkbd\u003E for orange.\n  \u003C\u002Fp\u003E\n\u003C\u002Ffooter\u003E\n",
	  responses: {
              "keypress(r)": "red",
              "keypress(g)": "green",
              "keypress(b)": "blue",
              "keypress(o)": "orange"
            },
      correctResponse: "${ parameters.color }",      
	}),
    new lab.html.Screen({
      content: "\u003Cmain class=\"content-vertical-center content-horizontal-center\"\u003E\n\u003C\u002Fmain\u003E\n\n\u003Cfooter class=\"content-vertical-center content-horizontal-center\"\u003E\n  \u003Cp\u003E\n    What's the \u003Cem\u003Ecolor\u003C\u002Fem\u003E of \n    the word shown above? \u003Cbr\u003E\n    Please press \u003Ckbd\u003Er\u003C\u002Fkbd\u003E for red,\n    \u003Ckbd\u003Eg\u003C\u002Fkbd\u003E for green,\n    \u003Ckbd\u003Eb\u003C\u002Fkbd\u003E for blue and \u003Ckbd\u003Eo\u003C\u002Fkbd\u003E for orange.\n  \u003C\u002Fp\u003E\n\u003C\u002Ffooter\u003E\n",
      timeout: 500,
    }), 
        
  ],
})

// With the individual components in place,
// now put together the entire experiment
var experiment = new lab.flow.Sequence({
  content: [
    // Initial instructions
    new lab.html.Screen({
      content: "\u003Cheader class=\"content-vertical-center content-horizontal-center\"\u003E\n  \u003Ch1\u003EStroop Task\u003C\u002Fh1\u003E\n\u003C\u002Fheader\u003E\n\u003Cmain\u003E\n  \u003Cp\u003E\n    Welcome to the \u003Cstrong\u003EStroop experiment\u003C\u002Fstrong\u003E!\n  \u003C\u002Fp\u003E\n  \u003Cp\u003E\n    In this experiment, your task will be to \n    \u003Cstrong\u003Eidentify the color of the word shown \n    on the screen\u003C\u002Fstrong\u003E.\u003Cbr\u003E\n    The word itself is immaterial &mdash; \n    you can safely ignore it.\n  \u003C\u002Fp\u003E\n  \u003Cp\u003E\n    To indicate the color of the word, \n    please use the keys \u003Cstrong\u003Er\u003C\u002Fstrong\u003E, \n    \u003Cstrong\u003Eg\u003C\u002Fstrong\u003E, \u003Cstrong\u003Eb\u003C\u002Fstrong\u003E and \n    \u003Cstrong\u003Eo\u003C\u002Fstrong\u003E for \n    \u003Cspan style=\"color: red;\"\u003Ered\u003C\u002Fspan\u003E, \n    \u003Cspan style=\"color: green;\"\u003Egreen\u003C\u002Fspan\u003E, \n    \u003Cspan style=\"color: blue;\"\u003Eblue\u003C\u002Fspan\u003E and \n    \u003Cspan style=\"color: orange;\"\u003Eorange\u003C\u002Fspan\u003E, \n    respectively.\u003Cbr\u003E\n    Please answer quickly, and as \n    accurately as you can.\n  \u003C\u002Fp\u003E\n\u003C\u002Fmain\u003E\n\u003Cfooter class=\"content-vertical-center content-horizontal-center\"\u003E\n  Please press the space bar when you're ready.\n\u003C\u002Ffooter\u003E\n",
      responses: {
        'keypress(Space)': 'continue'
      },
    }),
    // Actual trials
    new lab.flow.Loop({
      template: trialTemplate,
      templateParameters: [
        {
          "color": "red",
          "word": "red"
        },
        {
          "color": "red",
          "word": "red"
        },
        {
          "color": "red",
          "word": "red"
        },
        ],
      shuffle: true,
    }),
    // Thank-you page
    new lab.html.Screen({
      content: "\u003Cheader class=\"content-vertical-center content-horizontal-center\"\u003E\n  \u003Ch1\u003EThank you!\u003C\u002Fh1\u003E\n\u003C\u002Fheader\u003E\n\u003Cmain\u003E\n  \u003Cp\u003E\n    You did a great job, thanks for taking the time!\n  \u003C\u002Fp\u003E\n\u003C\u002Fmain\u003E\n\u003Cfooter class=\"content-vertical-center content-horizontal-center\"\u003E\n  \u003Cp\u003E\n    If you have any questions or comments about this \n    experiment,\u003Cbr\u003E please be invited to contact\n    \u003Ca href=\"http:\u002F\u002Ffelixhenninger.com\"\u003E\n    Felix Henninger\u003C\u002Fa\u003E.\n  \u003C\u002Fp\u003E\n\u003C\u002Ffooter\u003E\n",
      timeout: 10,		
    }),
  ],
  datastore: new lab.data.Store(),
})

// Go!
experiment.run()