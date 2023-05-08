const clearAlarm = () => chrome.alarms.clearAll();
const initEvent = () => {
	chrome.tabs.onUpdated.addListener(updateLabel)
	chrome.tabs.onReplaced.addListener(updateLabel)
	chrome.tabs.onRemoved.addListener(updateLabel)
}


export {
	clearAlarm,
	initEvent
}