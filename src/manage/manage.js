import ScreenIndexedDB from "@/common/indexedDB";
import { getAllTabs } from "@/common/utils";

const sreenDB = new ScreenIndexedDB();

const display = async () => {
	const tabContainerDOM = document.getElementById('tab-container');
	const tabs = await getAllTabs();
	const grouped = tabs.reduce((grouped, tab) => {
		if (!grouped[tab.groupId]) grouped[tab.groupId] = [];
		grouped[tab.groupId].push(tab);
		return grouped;
	}, {});

	Object.values(grouped).forEach(tabs => displayGroup(tabs, tabContainerDOM))
}

const displayGroup = async (tabs, tabContainerDOM) => {
	if (!tabs || tabs.length == 0) return;
	const groupId = tabs[0].groupId;
	const groupName = (groupId == -1 || !groupId) ? 'Ungrouped Tab' : (await chrome.tabGroups.get(groupId)).title;
	const groupDOM = document.getElementById('groupTile').content.cloneNode(true);
	groupDOM.id = groupId;
	groupDOM.querySelector('.title').innerText = groupName;

	const promises = tabs.map(tab => displayTab(tab, groupDOM));
	Promise.all(promises).then(() => tabContainerDOM.appendChild(groupDOM))
}

const displayTab = (tab, groupDOM) => {
	return new Promise(resolve => {
		sreenDB.getByPrimaryIndex([tab.id], row => {
			const tabDOM = document.getElementById('tile').content.cloneNode(true);
			tabDOM.querySelector('.title').innerText = tab.title;
			row && (tabDOM.querySelector('.review').src = row.snapshot);
			tabDOM.querySelector('.tile').onclick = () => chrome.tabs.update(tab.id, {
				'active': true
			})
			groupDOM.querySelector('.tile-group').appendChild(tabDOM);
			resolve();
		})
	})
}

display();
document.onfocus = () => display();