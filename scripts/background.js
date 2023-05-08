import {
  clearAlarm,
  initEvent
} from './utils';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    active: false,
  });
  clearAlarm();
  initEvent();
});

chrome.commands.onCommand.addListener(async (command) => {
  if (command == 'cleanUp') {
    // TODO
  }
});


