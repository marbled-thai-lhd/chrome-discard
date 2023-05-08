export const clearAlarm = async (name) => {
	return await chrome.alarms.clear(name);
}

export const clearAllAlarm = async () => {
	return await chrome.alarms.clearAll();
}