'use strict';

console.log('Tab Search starting!');

function handleSpotlight(request) {
  var port = this;

  if (request.hasOwnProperty('query')) {
    chrome.tabs.query({active: false}, function(tabs) {
      chrome.tabs.sendMessage(port.sender.tab.id, {tabs: tabs});
    });
  } else if (request.hasOwnProperty('activate')) {
    chrome.tabs.update(request.activate, {active: true});
  }
}

chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(handleSpotlight.bind(port));
});
