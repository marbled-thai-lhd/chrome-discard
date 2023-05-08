import { initCommand, initEvent } from "@/common/events";
import { initStorage } from "@/common/storage"
import { clearAllAlarm } from "@/common/timer";

chrome.runtime.onInstalled.addListener(() => {
	initEvent();
	initStorage();
	initCommand();
	clearAllAlarm();
})