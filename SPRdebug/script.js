// Define study
const study = lab.util.fromObject({
  "title": "root",
  "type": "lab.flow.Sequence",
  "parameters": {},
  "plugins": [
    {
      "type": "lab.plugins.Metadata"
    },
    {
      "type": "lab.plugins.PostMessage"
    }
  ],
  "metadata": {
    "title": "",
    "description": "",
    "repository": "",
    "contributors": ""
  },
  "responses": {},
  "content": [
    {
      "type": "lab.html.Screen",
      "parameters": {},
      "responses": {},
      "messageHandlers": {
        "run": function anonymous() {
console.log('A')
var plug = document.getElementById("Plug"); //Get the Defined element
plug.style.cssText += ';display:none !important;'; //Set the defined element's display style to "none"
}
      },
      "title": "Intro",
      "content": "Hello...",
      "timeout": "1000"
    },
    {
      "type": "lab.flow.Loop",
      "parameters": {},
      "templateParameters": [
        {
          "imageName": "https:\u002F\u002Ffoulsham.github.io\u002FSPR-example\u002Fimg\u002FFP_1953.02.21_S_1.bmp",
          "condition": "FP"
        },
        {
          "imageName": "https:\u002F\u002Ffoulsham.github.io\u002FSPR-example\u002Fimg\u002FFP_1953.02.21_S_1.bmp",
          "condition": "FI"
        },
        {
          "imageName": "https:\u002F\u002Ffoulsham.github.io\u002FSPR-example\u002Fimg\u002FFP_1953.02.21_S_2.bmp",
          "condition": "NF"
        }
      ],
      "responses": {},
      "messageHandlers": {},
      "shuffle": false,
      "title": "Trial",
      "template": {
        "type": "lab.flow.Sequence",
        "parameters": {},
        "responses": {},
        "messageHandlers": {},
        "title": "Sequence",
        "content": [
          {
            "type": "lab.html.Screen",
            "parameters": {},
            "responses": {},
            "messageHandlers": {},
            "title": "fixcross",
            "content": "+",
            "timeout": "500"
          },
          {
            "type": "lab.html.Screen",
            "parameters": {},
            "responses": {
              "keypress(Space)": "continue"
            },
            "messageHandlers": {},
            "title": "panel",
            "content": "\u003Cmain class=\"content-vertical-center content-horizontal-center\"\u003E\u003Cdiv\u003E\u003Cimg src=\"${parameters.imageName}\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fmain\u003E "
          }
        ]
      }
    },
    {
      "type": "lab.html.Screen",
      "parameters": {},
      "responses": {},
      "messageHandlers": {},
      "title": "Bye",
      "content": "Bye!",
      "timeout": "100"
    }
  ]
})

// Add data storage support
study.options.datastore = new lab.data.Store()

// Let's go!
study.run()
