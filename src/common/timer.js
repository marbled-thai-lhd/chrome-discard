import { TIMER } from "./const";
import { getTTL } from "./storage";
import { discardTab, getAllTabs } from "./utils";

export const clearTimer = async (tab) => {
	const key = `${TIMER}${tab.tabId}`;
	await chrome.alarms.clear(key);
}

export const initTimer = async () => {
	await chrome.alarms.clearAll();
	(await getAllTabs()).forEach(startTimer)
}

export const startTimer = async tab => {
	if (!tab.tabId) return;
	
	const key = `${TIMER}${tab.tabId}`;
	await chrome.alarms.clear(key);
	const ttl = await getTTL();
	chrome.alarms.create(key, {
		when: Date.now() + ttl
	});
	
}

export const onAlarmHandle = async alarm => {
	const tabId = alarm.name.replace(TIMER, '');
	if (!tabId || tabId == "undefined") return;
	discardTab(Number(tabId));
}