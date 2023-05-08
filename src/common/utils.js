import { checkExceptionUrl } from "./storage";

export const getAllTabs = async () => await chrome.tabs.query({})

export const discardTab = async (tabId, force = false, callback = () => {}) => {
	let willDiscard = true;
	if (!force) {
		const tab = await chrome.tabs.get(tabId);
		if (!tab || !checkExceptionUrl(tab.url)) willDiscard = false;
	}

	return willDiscard && await chrome.tabs.discard(tabId);
}

export const discardAllTab = async () => {
	(await getAllTabs()).forEach(tab => !tab.discarded && discardTab(tab.id));
}