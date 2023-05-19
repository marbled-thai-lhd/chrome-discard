import { initEvent } from "@/common/events";
import { deleteExceptionUrl } from "@/common/storage";
import { getExptionList, setExceptionUrl } from "@/common/storage";
import { getCurrentTab } from "@/common/utils";

const initButton = () => {
	document.getElementById('addExeptions').onclick = addExeptions;
	document.getElementById('initEvents').onclick = () => initEvent() && initTimer();
	document.getElementById('settingPage').onclick = () => {
		window.open(chrome.runtime.getURL('setting/index.html'))
	};
}

const addExeptions = async () => {
	const activeTab = await getCurrentTab();
	let defaultURL = '';
	if (activeTab) {
		const url = new URL(activeTab.url);
		defaultURL = url.origin + url.pathname
	}
	const url = prompt("Except url", defaultURL);
	if (!url) return;

	setExceptionUrl(url);
}

initButton();