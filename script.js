function openTab(tabName) {
    console.log("Opening tab:", tabName);

    // Hide all tab contents
    var tabContents = document.querySelectorAll(".tab-content");
    for (var content of tabContents) {
        content.style.display = 'none';
    }

    // Remove 'active' class from all tab buttons
    var tabButtons = document.querySelectorAll(".tab-button");
    for (var button of tabButtons) {
        button.classList.remove("active");
    }

    // Display the selected tab content and mark the button as active
    var selectedTabContent = document.getElementById(tabName);
    if (selectedTabContent) {
        selectedTabContent.style.display = 'block';
        Array.from(tabButtons).find(btn => btn.textContent.trim() === tabName)?.classList.add("active");
    } else {
        console.error("No content found for tab:", tabName);
    }
}

// document.getElementById("trails-button").addEventListener("click", openTrailsTab);
// function openTrailsTab(){
//   openTab('Trails');
// }

// document.getElementById("analytics-button").addEventListener("click", openAnalyticsTab);
// function openAnalyticsTab(){
//   openTab('Analytics');
// }

// // Ensure the document is fully loaded before assigning events
// document.addEventListener("DOMContentLoaded", function() {
//     openTab('Trails'); // Explicitly open the My Trails tab by default
// });

// document.body.addEventListener('click', respondToClick, true);
// function respondToClick(){
//   console.log("Yup, that happened");
// }

// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//     console.log("Message received");
//     if (message.type === 'updatePanel') {
//         // Update the side panel based on the received message
//         document.getElementById('someElement').textContent = message.details;
//     }
// });

var capturingTrail = false;

document.getElementById("createTrailBtn").addEventListener("click", openCreatingTrailSection);
function openCreatingTrailSection(){
  console.log("Create button clicked");
  var trailSummarySection = document.getElementById('trailSummary');
  trailSummarySection.textContent = 'Waiting for completion... ✨';
  var createTrailBtn = document.getElementById('createTrailBtn');
  var completeTrailBtn = document.getElementById('completeTrailBtn');
  var creatingTrailSection = document.getElementById('creatingTrailSection');
    // Change button text and color
    // createTrailBtn.textContent = 'Complete trail';
    // createTrailBtn.classList.add('active');
    createTrailBtn.style.display = 'none';
    completeTrailBtn.style.display = 'block';

    // Show the "Creating trail..." section
    creatingTrailSection.style.display = 'block';

  capturingTrail = true;
}

document.getElementById("completeTrailBtn").addEventListener("click", openCompletingTrailSection);
async function openCompletingTrailSection(){
  console.log("Complete button clicked");
  var trailSummarySection = document.getElementById('trailSummary');
  trailSummarySection.textContent = 'Processing... ✨';
  var createTrailBtn = document.getElementById('createTrailBtn');
  var completeTrailBtn = document.getElementById('completeTrailBtn');
  var creatingTrailSection = document.getElementById('creatingTrailSection');
  var creatingTrailHeading = document.getElementById('creatingTrailHeading');
    // Change button text and color
    createTrailBtn.style.display = 'block';
    // completeTrailBtn.classList.add('active');
    completeTrailBtn.style.display = 'none';

    // Hide the "Creating trail..." section
    // creatingTrailSection.style.display = 'none';

  capturingTrail = false;

    var prompt = "This is a screenshot of a user going through a web-based workflow. There may be one or more websites/tools involved, \
    and one or more images present. The user may not have completed a workflow. Based on this, can you output a summary of the user's workflow \
    with details that would be useful to another person going through similar steps? Output the summary in HTML format like: \n\
    <ol>\n\
      <li><b>In (name of first website/tool):</b>\n\
        <(Steps to perform, optionally as another list.)\n\
      </li>\n\
    </ol>\n\
    Do not include anything besides the HTML in your response. If there is no clear summary, output 'Sorry, we couldn't follow this trail.'\n\
    Be concise. Don't rely on specific queries, filenames, or details; instead, aim for a generalized description of the workflow. Brief, short bullet points \
    over long sentences.";

    var response = await makeOpenAIRequest(prompt, IMAGES);
    console.log("OpenAPI response: " + JSON.stringify(response));

    trailSummarySection.innerHTML = response;
    creatingTrailHeading.textContent = "Your new trail";
    IMAGES = [];
}

// chrome.tabs.onActivated.addListener( function(activeInfo){
//     chrome.tabs.get(activeInfo.tabId, function(tab){
//         y = tab.url;
//         console.log("you are here: "+y);
//     });
// });

chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
    if (tab.active && change.url) {
        console.log("Tab updated: "+change.url);           
    }
});

// WORKING ONE!
// chrome.tabs.onActivated.addListener( function(activeInfo){
//     chrome.tabs.get(activeInfo.tabId, function(tab){
//       if (!tab.url) return;
//       const url = new URL(tab.url);
//       console.log("Checking URL for trigger: " + url.origin);

//       if (['https://trails.productboard.com', 'https://app.productboard.com'].includes(url.origin)) {
//         var icon = document.getElementById('i1');
//         icon.style.display = 'block';
//       } else if (['https://kashaya.atlassian.net', 'https://irisjyan.atlassian.net'].includes(url.origin)) {
//         if (document.getElementById('i1').style.display == 'none') return;

//         var icon = document.getElementById('i2');
//         var line = document.getElementById('l1');
//         if (icon.style.display != 'none') {
//             var icon3 = document.getElementById('i3');
//             if (icon3.style.display != 'none') {
//                 icon = document.getElementById('i4');
//                 line = document.getElementById('l3');
//             }
//         }
//         icon.style.display = 'block';
//         line.style.display = 'block';
//       } else if (['https://www.figma.com'].includes(url.origin)) {
//         if (document.getElementById('i2').style.display == 'none') return;

//         var icon = document.getElementById('i3');
//         var line = document.getElementById('l2');
//         icon.style.display = 'block';
//         line.style.display = 'block';
//       } else if (['https://app.slack.com'].includes(url.origin)) {
//         if (document.getElementById('i4').style.display == 'none') return;

//         var icon = document.getElementById('i5');
//         var line = document.getElementById('l4');
//         icon.style.display = 'block';
//         line.style.display = 'block';
//       }
//     });
// });

// document.addEventListener('DOMContentLoaded', function() {
//   var createTrailBtn = document.getElementById('createTrailBtn');
//   var creatingTrailSection = document.getElementById('creatingTrailSection');

//   createTrailBtn.addEventListener('click', function() {
//     // Change button text and color
//     createTrailBtn.textContent = 'Complete trail';
//     createTrailBtn.classList.add('active');

//     // Show the "Creating trail..." section
//     creatingTrailSection.style.display = 'block';

//     chrome.tabs.captureVisibleTab(function(screenshotDataUrl) {
//       const screenshotImage = new Image();
//       screenshotImage.src = screenshotDataUrl;
//       screenshotContainer.appendChild(screenshotImage);
//     });
//   });
// });


var IMAGES = [];

chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    console.log("request: " + JSON.stringify(request));
    console.log("sender: " + JSON.stringify(sender));
    if (capturingTrail) {
        chrome.tabs.captureVisibleTab(null,{},function(dataUri){
            console.log(dataUri);
            IMAGES.push(dataUri);
        });
    }
    // if (sender.url === blocklistedWebsite)
    //   return;  // don't allow this web page access

    console.log("IMAGES: " + JSON.stringify(IMAGES));
  });

// import OpenAI from "openai";

// const openai = new OpenAI();


const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = "sk-proj-4C2AUoestCtCGwoM47g0T3BlbkFJqkSgQH8sYAXRkowawJKF";

async function makeOpenAIRequest(prompt, images) {
  try {
    content = [];
    content.push({
          "type": "text",
          "text": prompt
        });
    for (let i = 0; i < IMAGES.length; i++) {
        content.push({
          "type": "image_url",
          "image_url": {
            "url": images[i]
          }
        });
    }
    // content.push({
    //       "type": "image_url",
    //       "image_url": {
    //         "url": images[0]
    //       }
    //     });
    console.log("Request content: " + JSON.stringify(content));


    // Fetch the response from the OpenAI API with the signal from AbortController
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4-turbo",
        messages: [{ role: "user", content: content }],
      }),
    });

    const data = await response.json();
    console.log("OpenAPI response: " + JSON.stringify(data));
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error: ", error);
    return "";
  }

  return "";
}

// async function getScreenshot() {
//     var screenshot = await chrome.tabs.captureVisibleTab(null,{});
//     return screenshot;
// }
// var imageUrl = getScreenshot();
// console.log("ImageUrl = " + JSON.stringify(imageUrl));

var prompt = "This is a screenshot of a user going through a web-based workflow. There may be one or more websites/tools involved, \
and one or more images present. The user may not have completed a workflow. Based on this, can you output a summary of the user's workflow \
with details that would be useful to another person going through similar steps? Output the summary in HTML format like: \n\
<ol>\n\
  <li><b>In (name of first website/tool):</b>\n\
    <(Steps to perform, optionally as another list.)\n\
  </li>\n\
</ol>";

// var response = makeOpenAIRequest(prompt, [imageUrl]);
// console.log("OpenAPI response: " + JSON.stringify(response));