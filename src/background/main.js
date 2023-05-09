import { initCommand, initEvent } from "@/common/events";
import { initStorage } from "@/common/storage"
import { initTimer } from "@/common/timer";

chrome.runtime.onInstalled.addListener(() => {
	initEvent();
	initStorage();
	initCommand();
	initTimer();
})