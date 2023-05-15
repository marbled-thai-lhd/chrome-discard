import {
	DEFAULT_MAX_ALLOW_RUNNING,
	MAX_ALLOW_RUNNING
} from "./const";
import ScreenIndexedDB from "./indexedDB";
import {
	checkExceptionUrl,
	getSingleKey
} from "./storage";

const skipCapture = [
	"chrome://"
];

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

	return willDiscard && await chrome.tabs.discard(tabId, newTab => {
		const screenDB = new ScreenIndexedDB();
		newTab && screenDB.getByPrimaryIndex([tabId], row => {
			row && screenDB.insertOrUpdate({
				'id': newTab.id,
				'snapshot': row.snapshot,
				'updated_at': Date.now()
			})
			screenDB.delete([tabId]);
			callback(tabId, newTab)
		})
	});
}

export const discardAllTab = async () => {
	const activeTab = (await chrome.tabs.query({
		active: true
	}))[0];
	const tabs = (await getAllTabs()).filter(tab => tab.id != activeTab.id);
	tabs.forEach(tab => !tab.discarded && discardTab(tab.id));
}

export const saveTabPicture = async tab => {
	setTimeout(() => _saveTabPicture(tab), 400);
}

const _saveTabPicture = async tab => {
	const screenDB = new ScreenIndexedDB();
	const dbData = await new Promise(resolve => screenDB.getByPrimaryIndex([tab.tabId], result => resolve(result)));
	if (dbData && dbData.updated_at && Date.now() - dbData.updated_at < 1000) return;

	const tabInfo = await chrome.tabs.get(tab.tabId);
	if (skipCapture.filter(k => tabInfo.url.startsWith(k)).length > 0) return;

	if (!tabInfo.active) return;
	if (!tabInfo.status || tab.status == 'loading') return;
	const image = await chrome.tabs.captureVisibleTab(tab.windowId);

	screenDB.insertOrUpdate({
		'id': tab.tabId,
		'snapshot': image,
		'updated_at': Date.now()
	})
}

export const clearUnusedStoreData = () => {
	const screenDB = new ScreenIndexedDB();
	screenDB.getAll(async res => {
		const tabIds = (await getAllTabs()).map(e => e.id);
		res.forEach(row => {
			if (!tabIds.includes(row.id)) screenDB.delete([row.id])
		})
	})
}

export const numberOfTabsLimitter = async () => {
	const limit = Number(await getSingleKey(MAX_ALLOW_RUNNING)) || DEFAULT_MAX_ALLOW_RUNNING;
	let runningTab = (await getAllTabs())
		.filter(tabInfo => !tabInfo.discarded)
		.filter(tabInfo => skipCapture.filter(k => tabInfo.url.startsWith(k)).length == 0)
		.sort((a, b) => a.id - b.id);

	const promises = runningTab.map(tabInfo => {
		return new Promise(async resolve => {
			tabInfo.include = tabInfo.url && !(await checkExceptionUrl(tabInfo.url));
			resolve()
		})
	})

	Promise.all(promises).then(() => {
		runningTab = runningTab.filter(e => e.include);
		if (runningTab.length <= limit) return;
		console.log(runningTab, limit)
		for (let index = 0; index < runningTab.length - limit; index++) {
			discardTab(runningTab[index].id, true);
		}
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