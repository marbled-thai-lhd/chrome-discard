import { updateLabel } from "./display"
import { onAlarmHandle, startTimer } from "./timer";
import { discardAllTab } from "./utils"

export const initEvent = () => {
	chrome.tabs.onUpdated.addListener(updateLabel);
	chrome.tabs.onReplaced.addListener(updateLabel);
	chrome.tabs.onRemoved.addListener(updateLabel);
	chrome.tabs.onActivated.addListener(startTimer);
	chrome.alarms.onAlarm.addListener(onAlarmHandle);
}

export const initCommand = () => {
	chrome.commands.onCommand.addListener(async (command) => {
		if (command == 'cleanUp') {
			return discardAllTab();
		}
	});
}