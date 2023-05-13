import ScreenIndexedDB from "@/common/indexedDB";
import { discardTab, getAllTabs } from "@/common/utils";

const screenDB = new ScreenIndexedDB();

const display = async () => {
	const tabContainerDOM = document.getElementById('tab-container');
	tabContainerDOM.innerHTML = '';
	const activeTab = (await chrome.tabs.query({active: true}))[0];
	const tabs = (await getAllTabs()).filter(tab => tab.id != activeTab.id);
	const grouped = tabs.reduce((grouped, tab) => {
		if (!grouped[tab.groupId]) grouped[tab.groupId] = [];
		grouped[tab.groupId].push(tab);
		return grouped;
	}, {});

	Object.values(grouped).forEach(tabs => displayGroup(tabs, tabContainerDOM));
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
		screenDB.getByPrimaryIndex([tab.id], row => {
			const tabDOM = document.getElementById('tile').content.cloneNode(true);
			
			tabDOM.querySelector('.title').innerText = tab.title;
			if (!tab.discarded) {
				tabDOM.querySelector('.discard').remove();
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
				})
			}
			groupDOM.querySelector('.tile-group').appendChild(tabDOM);
			resolve();
		})
	})
}

display();
document.onfocus = () => display();