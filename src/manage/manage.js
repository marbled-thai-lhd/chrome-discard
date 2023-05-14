import ScreenIndexedDB from "@/common/indexedDB";
import {
	discardTab,
	getAllTabs
} from "@/common/utils";

const screenDB = new ScreenIndexedDB();
let activeTab = null;
const display = async () => {
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
		groupDOM.id = -1;
		groupDOM.querySelector('.title').innerText = 'Recent';
		groupDOM.querySelector('.group-tile').style.order = -1;
		
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
		screenDB.getByPrimaryIndex([tab.id], row => {
			const tabDOM = document.getElementById('tile').content.cloneNode(true);

			const tile = tabDOM.querySelector('.tile');
			tile.style.order = tab.index;
			tile.id = tab.id + '|' + (row && row.updated_at);
			tabDOM.querySelector('.title').innerText = tab.title;
			if (!tab.discarded) {
				tabDOM.querySelector('.discarded').remove();
				tabDOM.querySelector('.unbox').onclick = () => {
					discardTab(tab.id, true);
					display();
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

const checkNeedToReDraw = async () => {
	if (!activeTab) return;

	const drawedIds = [...document.querySelectorAll('.tile')].map(e => e.id);
	const tabIds = (await getAllTabs()).filter(tab => tab.id != activeTab.id).map(e => e.id);
	screenDB.getAll(results => {
		const storeIds = results.filter(row => tabIds.includes(row.id)).map(row => {
			return row.id.id + '|' + row.updated_at
		});

		const difference = drawedIds
			.filter(x => !storeIds.includes(x))
			.concat(storeIds.filter(x => !drawedIds.includes(x)));
		
		console.log(tabIds, difference)
	})
}

display();
window.onfocus = () => checkNeedToReDraw();