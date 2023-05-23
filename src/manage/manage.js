import { ACTIVATED, TIMER } from "@/common/const";
import ScreenIndexedDB from "@/common/indexedDB";
import { getSingleKey } from "@/common/storage";
import { clearTimer, initTimer } from "@/common/timer";
import {
	discardAllTab,
	discardTab,
	getAllTabs
} from "@/common/utils";

const screenDB = new ScreenIndexedDB();
let activeTab = null;
const display = async () => {
	const activated = await getSingleKey(ACTIVATED);
	document.getElementById('startStop').innerText = activated ? 'Stop It' : 'Start It';

	[...document.querySelectorAll('[data-ttl]')].forEach(e => clearInterval(e.dataset.ttl));

	const tabContainerDOM = document.getElementById('tab-container');
	tabContainerDOM.innerHTML = '';
	activeTab = (await chrome.tabs.query({
		active: true
	}))[0];
	const tabs = await getAllTabs();
	const filterTab = tabs.filter(tab => tab.id != activeTab.id);
	const grouped = filterTab.reduce((grouped, tab) => {
		if (!grouped[tab.groupId]) grouped[tab.groupId] = [];
		grouped[tab.groupId].push(tab);
		return grouped;
	}, {});

	Object.values(grouped).sort((a, b) => a[0].groupId - b[0].groupId).forEach((tabs, index) => displayGroup(tabs, tabContainerDOM, index));

	screenDB.getAll(results => {
		const tabIds = tabs.map(e => e.id);
		const recentTabs = results.filter(e => tabIds.includes(e.id)).sort((b, a) => a.updated_at - b.updated_at).slice(0, 5);

		const groupDOM = document.getElementById('groupTile').content.cloneNode(true);
		groupDOM.id = 0;
		groupDOM.querySelector('.tile-group').classList.add('recent');
		groupDOM.querySelector('.group-tile').style.order = -1;
		groupDOM.querySelector('.title').innerText = 'Recent';
		
		const promises = recentTabs.map((tab, index) => {
			tab = {
				...tab,
				...tabs.filter(e => e.id == tab.id)[0],
				index
			};
			return displayTab(tab, groupDOM);
		});
		Promise.all(promises).then(() => tabContainerDOM.appendChild(groupDOM))
	})
}

const displayGroup = async (tabs, tabContainerDOM, index) => {
	if (!tabs || tabs.length == 0) return;

	tabs.sort((a, b) => a.id - b.id);
	tabs.forEach((t, i) => t.index = i);

	const groupId = tabs[0].groupId;
	const groupName = (groupId == -1 || !groupId) ? 'Ungrouped Tab' : (await chrome.tabGroups.get(groupId)).title;
	const groupDOM = document.getElementById('groupTile').content.cloneNode(true);
	groupDOM.id = groupId;
	groupDOM.querySelector('.title').innerText = groupName;
	groupDOM.querySelector('.group-tile').style.order = groupId == -1 ? 999 : index;

	const promises = tabs.map(tab => displayTab(tab, groupDOM));
	Promise.all(promises).then(() => tabContainerDOM.appendChild(groupDOM))
}

const displayTab = (tab, groupDOM) => {
	return new Promise(resolve => {
		screenDB.getByPrimaryIndex([tab.id], async row => {
			const tabDOM = document.getElementById('tile').content.cloneNode(true);

			const tile = tabDOM.querySelector('.tile');
			tile.style.order = tab.index;
			tile.id = tab.id + '|' + (row && row.updated_at);
			tabDOM.querySelector('.title').innerText = tab.title;
			if (!tab.discarded) {
				const ttl = tabDOM.querySelector('.ttl');
				ttl.id = `${groupDOM.id}|${tab.id}|ttl`;
				const timer = await chrome.alarms.get(`${TIMER}${tab.id}`);
				ttl.dataset.ttl = setInterval(() => {
					if (!timer) return document.getElementById(ttl.id).innerHTML = '';
					const totalSeconds = Math.floor((timer.scheduledTime - Date.now()) / 1000);
					if (totalSeconds <= 0) return display();
					const second = totalSeconds % 60;
					const minute = Math.floor(totalSeconds / 60);
					document.getElementById(ttl.id).innerHTML = `(${minute}:${second.toString().padStart(2, '0')})`;
				}, 1000);

				tabDOM.querySelector('.discarded').remove();
				tabDOM.querySelector('.unbox').onclick = () => {
					discardTab(tab.id, true);
					clearTimer({tabId: tab.id})
					display();
					clearInterval(ttl.dataset.ttl);
				};
			} else {
				tabDOM.querySelector('.unbox').remove();
			}
			row && row.snapshot && (tabDOM.querySelector('.review').src = row.snapshot);
			tabDOM.querySelector('.review').onclick = async () => {
				await chrome.windows.update(tab.windowId, {
					'focused': true
				})
				chrome.tabs.update(tab.id, {
					'active': true
				});
				activeTab && chrome.tabs.remove(activeTab.id);
			}
			groupDOM.querySelector('.tile-group').appendChild(tabDOM);
			resolve();
		})
	})
}

const checkNeedToReDraw = async (cb) => {
	if (!activeTab) return;

	let drawedIds = [...document.querySelectorAll('.tile')].map(e => e.id);
	drawedIds = Array.from(new Set(drawedIds));

	const tabIds = (await getAllTabs()).filter(tab => tab.id != activeTab.id).map(e => e.id);
	screenDB.getAll(results => {
		const storeIds = results.filter(row => tabIds.includes(row.id)).map(row => {
			return row.id + '|' + row.updated_at
		});

		const difference = drawedIds
			.filter(x => !storeIds.includes(x))
			.concat(storeIds.filter(x => !drawedIds.includes(x)));
		
		cb(difference.length > 0);
	})
}

display();
window.onfocus = () => {
	if (!window.render || Date.now() - window.render > 1000) {
		checkNeedToReDraw(res => res && display())
	}
	window.render = Date.now();
};

document.getElementById('closeAll').onclick = async () => {
	await discardAllTab();
	setTimeout(() => display(), 100);
}

document.getElementById('startStop').onclick = async () => {
	const activated = await getSingleKey(ACTIVATED);
	if (activated) await chrome.alarms.clearAll();
	else await initTimer();

	const updateData = {};
	updateData[ACTIVATED] = !activated;
	await chrome.storage.local.set(updateData);
	setTimeout(() => display(), 100);
}