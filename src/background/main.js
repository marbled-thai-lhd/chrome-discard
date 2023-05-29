import {
	initCommand,
	initEvent,
	initMessageListener
} from "@/common/events";
import {
	initStorage
} from "@/common/storage"

chrome.runtime.onInstalled.addListener(() => {
	initEvent();
	initStorage();
	initCommand();
	initMessageListener();
})