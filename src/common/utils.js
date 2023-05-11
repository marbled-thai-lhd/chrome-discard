import ScreenIndexedDB from "./indexedDB";
import {
	checkExceptionUrl
} from "./storage";

export const getAllTabs = async (query = {}) => await chrome.tabs.query(query);

export const getCurrentTab = async () => {
	const tab = await getAllTabs({
		active: true
	});
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

export const saveTabPicture = async tab => {
	setTimeout(() => _saveTabPicture(tab), 400);
}

export const _saveTabPicture = async tab => {
	const tabInfo = await chrome.tabs.get(tab.tabId);
	// console.log("_saveTabPicture", tabInfo.active, tabInfo.active, tabInfo.status)
	if (!tabInfo.active) return;
	if (!tabInfo.status || tab.status == 'loading') return;
	const image = await chrome.tabs.captureVisibleTab(tab.windowId);
	const sreenDB = new ScreenIndexedDB();

	sreenDB.insertOrUpdate({
		'id': tab.tabId,
		'snapshot': image,
	})
}


// setTimeout(() => {
// sreenDB.insertOrUpdate({
// 	'id': 1,
// 	'sessionId': 1,
// 	'added_on': new Date(),
// 	'screen': "screen",
// 	'pixRat': "devicePixelRatio"
// })
// sreenDB.getAll(e => console.log(e))
// sreenDB.getByPrimaryIndex([1,1], e => console.log(e))
// 	sreenDB.delete([1, 1])
// }, 5000);