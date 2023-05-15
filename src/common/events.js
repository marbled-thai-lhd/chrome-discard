import {
	updateLabel
} from "./display"
import {
	clearTimer,
	onAlarmHandle,
	startTimer
} from "./timer";
import {
	clearUnusedStoreData,
	discardAllTab,
	numberOfTabsLimitter,
	saveTabPicture
} from "./utils"

let previousActiveTab = null;
export const initEvent = () => {
	chrome.tabs.onUpdated.addListener(onUpdated);
	chrome.tabs.onReplaced.addListener(updateLabel);
	chrome.tabs.onActivated.addListener(onActivated);
	chrome.tabs.onRemoved.addListener(onRemoved)
	chrome.alarms.onAlarm.addListener(onAlarmHandle);
	
	setInterval(() => console.log('hasListener', chrome.tabs.onActivated.hasListener(onActivated)), 5000);
}

export const initCommand = () => {
	chrome.commands.onCommand.addListener(async (command) => {
		if (command == 'cleanUp') {
			return discardAllTab();
		}
	});
}

const onActivated = async tab => {
	console.log("onActivated")
	updateLabel();
	await clearTimer(tab);
	previousActiveTab && startTimer(previousActiveTab);
	previousActiveTab = tab;
	saveTabPicture(tab);
	numberOfTabsLimitter();
}

const onUpdated = (tab, what) => {
	console.log("onUpdated", what.status)

	if (what.status != 'complete') return;
	updateLabel();
	saveTabPicture({
		tabId: tab
	});
	numberOfTabsLimitter();
}

const onRemoved = async tab => {
	console.log("onRemoved")
	if (previousActiveTab && previousActiveTab.tabId == tab) {
		previousActiveTab = undefined;
	}
	await clearTimer({
		tabId: tab
	})
	updateLabel();
	clearUnusedStoreData();
	numberOfTabsLimitter();
}