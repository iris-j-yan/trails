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

document.body.addEventListener('click', respondToClick, true);
function respondToClick(){
  console.log("Yup, that happened");
}

// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//     console.log("Message received");
//     if (message.type === 'updatePanel') {
//         // Update the side panel based on the received message
//         document.getElementById('someElement').textContent = message.details;
//     }
// });

document.getElementById("createTrailBtn").addEventListener("click", openCreatingTrailSection);
function openCreatingTrailSection(){
  console.log("Button clicked");
  var createTrailBtn = document.getElementById('createTrailBtn');
  var creatingTrailSection = document.getElementById('creatingTrailSection');
    // Change button text and color
    createTrailBtn.textContent = 'Complete trail';
    createTrailBtn.classList.add('active');

    // Show the "Creating trail..." section
    creatingTrailSection.style.display = 'block';
}

chrome.tabs.onActivated.addListener( function(activeInfo){
    chrome.tabs.get(activeInfo.tabId, function(tab){
        y = tab.url;
        console.log("you are here: "+y);
    });
});

chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
    if (tab.active && change.url) {
        console.log("you are here: "+change.url);           
    }
});

// function getCurrentTab() {
//   let queryOptions = { active: true, lastFocusedWindow: true };
//   return new Promise((resolve, reject) => {
//     chrome.tabs.query(queryOptions, ([tab]) => {
//       if (chrome.runtime.lastError) {
//         reject(new Error(chrome.runtime.lastError));
//       } else {
//         resolve(tab);
//       }
//     });
//   });
// }

// async function handleCurrentTab() {
//   try {
//     const tab = await getCurrentTab();
//     // Now you can work with the tab object
//     console.log(tab);
//   } catch (error) {
//     console.error('Error fetching the current tab:', error);
//   }
// }



chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (!tab.url) return;
  const url = new URL(tab.url);
  console.log("In URL: " + url.origin);
    // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //   // since only one tab should be active and in the current window at once
    //   // the return variable should only have one entry
    //   var activeTab = tabs[0];
    //   var activeTabId = activeTab.id; // or do whatever you need
    //   console.log("Active tab URL: " + activeTab.url.origin);
    //   const tab = getCurrentTab();
    //   // Now you can work with the tab object
    //   console.log("Async Active tab URL:" + tab.url.origin);
    // });
  if (['https://trails.productboard.com', 'https://app.productboard.com'].includes(url.origin)) {
    var icon = document.getElementById('i1');
    icon.style.display = 'block';
  } else if (['https://kashaya.atlassian.net', 'https://irisjyan.atlassian.net'].includes(url.origin)) {
    var icon = document.getElementById('i2');
    var line = document.getElementById('l1');
    if (icon.style.display != 'none') {
        var icon3 = document.getElementById('i3');
        if (icon3.style.display != 'none') {
            icon = document.getElementById('i4');
            line = document.getElementById('l3');
        }
    }
    icon.style.display = 'block';
    line.style.display = 'block';
  } else if (['https://www.figma.com'].includes(url.origin)) {
    var icon = document.getElementById('i3');
    var line = document.getElementById('l2');
    icon.style.display = 'block';
    line.style.display = 'block';
  } else if (['https://app.slack.com'].includes(url.origin)) {
    var icon = document.getElementById('i5');
    var line = document.getElementById('l4');
    icon.style.display = 'block';
    line.style.display = 'block';
  }
});

document.addEventListener('DOMContentLoaded', function() {
  var createTrailBtn = document.getElementById('createTrailBtn');
  var creatingTrailSection = document.getElementById('creatingTrailSection');

  createTrailBtn.addEventListener('click', function() {
    // Change button text and color
    createTrailBtn.textContent = 'Complete trail';
    createTrailBtn.classList.add('active');

    // Show the "Creating trail..." section
    creatingTrailSection.style.display = 'block';
  });
});
