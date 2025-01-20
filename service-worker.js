// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// const GOOGLE_ORIGIN = 'https://www.google.com';
// const ENABLED_ORIGINS = [
//     'https://www.google.com',
//     'https://www.yahoo.com',
//     'https://trails.productboard.com',
//     'https://app.productboard.com',
//     'https://kashaya.atlassian.net',
//     'https://irisjyan.atlassian.net',
//     'https://figma.com',
//     'https://app.slack.com'
//   ];

// // Allows users to open the side panel by clicking on the action toolbar icon
// chrome.sidePanel
//   .setPanelBehavior({ openPanelOnActionClick: true })
//   .catch((error) => console.error(error));

// chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
//   if (!tab.url) return;
//   const url = new URL(tab.url);
//   // Enables the side panel on google.com
//   // if (url.origin === GOOGLE_ORIGIN) {
//   console.log("URL origin: " + url.origin);
//   // if (ENABLED_ORIGINS.includes(url.origin)) {

//   if (true) {
//     await chrome.sidePanel.setOptions({
//       // tabId,
//       path: 'sidepanel.html',
//       enabled: true
//     });
//   } else {
//     // Disables the side panel on all other sites
//     await chrome.sidePanel.setOptions({
//       tabId,
//       enabled: false
//     });
//   }
// });

// // background.js
// // Listen for messages from the content script
// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//     alert("Meesaged");
//     console.log("Message received");
//     if (message.action === 'openExtension') {
//         chrome.browserAction.setPopup({ popup: 'popup.html' });
//         chrome.browserAction.getPopup({}, function (popupUrl) {
//             if (popupUrl) {
//                 chrome.windows.create({
//                     url: popupUrl,
//                     type: 'popup',
//                     width: 400,
//                     height: 600,
//                 });
//             }
//         });
//     }
// });

// chrome.runtime.onConnect.addListener(function(port) {
//   console.assert(port.name === "knockknock");
//   port.onMessage.addListener(function(msg) {
//     if (msg.joke === "Knock knock")
//       port.postMessage({question: "Who's there?"});
//     else if (msg.answer === "Madame")
//       port.postMessage({question: "Madame who?"});
//     else if (msg.answer === "Madame... Bovary") {
//       port.postMessage({question: "I don't get it."});
//       console.log(msg.answer);
//     }
//   });
// });


// chrome.runtime.onMessageExternal.addListener(
//   function(request, sender, sendResponse) {
//     console.log("request: " + JSON.stringify(request));
//     console.log("sender: " + JSON.stringify(sender));
//     chrome.tabs.captureVisibleTab(null,{},function(dataUri){
//         console.log(dataUri);
//     });
//     // if (sender.url === blocklistedWebsite)
//     //   return;  // don't allow this web page access
//   });