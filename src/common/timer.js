import { TIMER } from "./const";
import { getTTL } from "./storage";
import { discardTab } from "./utils";

export const clearAlarm = async (name) => {
	return await chrome.alarms.clear(name);
}

export const clearAllAlarm = async () => {
	return await chrome.alarms.clearAll();
}

export const startTimer = async tab => {
	const key = `${TIMER}${tab.tabId}`;
	await chrome.alarms.clear(key);
	const ttl = await getTTL();
	chrome.alarms.create(key, {
		when: Date.now() + ttl
	});
	
}

export const onAlarmHandle = async alarm => {
	const tabId = alarm.name.replace(TIMER, '');
	discardTab(tabId);
}