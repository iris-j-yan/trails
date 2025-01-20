console.log("content_script.js");

var trailsExtensionId = "gejlkfcjebgkcejhkcleoihndjpghiij";

// document.body.addEventListener('click', respondToClick, true);
function respondToClick(){
  console.log("cs: Yup, that happened");

	// var trailsExtensionId = "ekgadhleegkibpacdflgmobhafmieaal";
	// var port = chrome.runtime.connect(trailsExtensionId, {name: "knockknock"});
	// port.postMessage({joke: "Knock knock"});
	// port.onMessage.addListener(function(msg) {
	//   if (msg.question === "Who's there?")
	//     port.postMessage({answer: "Madame"});
	//   else if (msg.question === "Madame who?") {
	//     port.postMessage({answer: "Madame... Bovary"});
	//     console.log(msg.question);
	// 	}
	// });

// Make a simple request:
	var url = "google.x";
	chrome.runtime.sendMessage(trailsExtensionId, {openUrlInEditor: url},
	  function(response) {
	    if (!response.success)
	      handleError(url);
	  	console.log("response: " + JSON.stringify(response));
	  });
}

window.addEventListener('click', respondToClick, {capture: true});