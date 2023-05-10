import { updateLabel } from "./display"
import { clearTimer, onAlarmHandle, startTimer } from "./timer";
import { discardAllTab, saveTabPicture } from "./utils"

let previousActiveTab = null;
export const initEvent = () => {
	chrome.tabs.onUpdated.addListener(updateLabel);
	chrome.tabs.onReplaced.addListener(updateLabel);

	chrome.tabs.onActivated.addListener(async tab => {
		await clearTimer(tab);
		previousActiveTab && startTimer(previousActiveTab);
		previousActiveTab = tab;
		saveTabPicture(tab);
	});

	chrome.tabs.onRemoved.addListener(async tab => {
		if (previousActiveTab.tabId == tab) {
			previousActiveTab = undefined;
		}
		await clearTimer({tabId: tab})
		updateLabel()
	})
	chrome.alarms.onAlarm.addListener(onAlarmHandle);
}

export const initCommand = () => {
	chrome.commands.onCommand.addListener(async (command) => {
		if (command == 'cleanUp') {
			return discardAllTab();
		}
	});
}