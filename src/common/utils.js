import { checkExceptionUrl } from "./storage";

export const getAllTabs = async (query = {}) => await chrome.tabs.query(query);

export const getCurrentTab = async () => {
	const tab = await getAllTabs({ active: true });
	if (tab.length == 0) return null;
	return tab[0];
}

export const discardTab = async (tabId, force = false, callback = () => {}) => {
	let willDiscard = true;
	if (!force) {
		const tab = await chrome.tabs.get(tabId);
		if (!tab || tab.discarded || await checkExceptionUrl(tab.url)) willDiscard = false;
	}

	return willDiscard && await chrome.tabs.discard(tabId, callback);
}

export const discardAllTab = async () => {
	(await getAllTabs()).forEach(tab => !tab.discarded && discardTab(tab.id));
}