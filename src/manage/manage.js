import ScreenIndexedDB from "@/common/indexedDB";
import { getAllTabs } from "@/common/utils";

const sreenDB = new ScreenIndexedDB();

const display = async () => {
	const tabContainer = document.getElementById('tab-container');
	const tabs = await getAllTabs();
	const grouped = tabs.reduce((tab, grouped) => {
		if (!grouped[tab.groupId]) grouped[tab.groupId] = [];
		grouped[tab.groupId].push(tab);
		return grouped;
	}, {});

	Object.values(grouped).forEach(displayGroup)
}

const displayGroup = async tabs => {
	if (!tabs || tabs.length == 0) return;
	const groupId = tabs[0].groupId;
	const groupName = groupId == -1 ? 'Ungrouped Tab' : (await chrome.tabGroups.get(groupId)).title;
	const groupDOM = document.getElementById('groupTile').cloneNode(true);
	groupDOM.id = groupId;
	groupDOM.querySelector('.title')[0].innerText = groupName;

	tabs.forEach(tab => displayTab(tab, groupDOM));

}

const displayTab = (tab, groupDOM) => {
	sreenDB.getByPrimaryIndex([tab.id], row => {
		const tabDOM = document.getElementById('tile').cloneNode(true);
		tabDOM.querySelector('.title')[0].innerText = tab.title;
		row && (tabDOM.querySelector('.review')[0].src = row.snapshot);
		tabDOM.onclick = () => chrome.tabs.update(tab.id, {
			'active': true
		})
		groupDOM.appendChild(tabDOM);
	})
}

display();
document.onfocus = () => display();