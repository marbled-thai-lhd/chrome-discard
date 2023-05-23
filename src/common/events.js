import { ACTIVATED } from "./const";
import {
	updateLabel
} from "./display"
import { getSingleKey } from "./storage";
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
	chrome.tabs.onUpdated.removeListener();
	chrome.tabs.onUpdated.addListener(onUpdated);

	chrome.tabs.onReplaced.removeListener();
	chrome.tabs.onReplaced.addListener(updateLabel);

	chrome.tabs.onActivated.removeListener();
	chrome.tabs.onActivated.addListener(onActivated);

	chrome.tabs.onRemoved.removeListener();
	chrome.tabs.onRemoved.addListener(onRemoved)

	chrome.alarms.onAlarm.removeListener();
	chrome.alarms.onAlarm.addListener(onAlarmHandle);
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
	const activated = await getSingleKey(ACTIVATED);
	updateLabel();
	await clearTimer(tab);
	previousActiveTab && activated && startTimer(previousActiveTab);
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
}