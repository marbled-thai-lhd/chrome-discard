import { deleteExceptionUrl } from "@/common/storage";
import { getExptionList, setExceptionUrl } from "@/common/storage";
import { getCurrentTab } from "@/common/utils";

const initButton = () => {
	document.getElementById('addExeptions').onclick = addExeptions;
}

const removeUrl = async url => {
	await deleteExceptionUrl(url);
	render();
}

const render = async () => {
	const urls = await getExptionList();
	const ul = document.getElementById('exceptionList');
	ul.innerHTML = null;
	urls.forEach(url => {
		const li = document.createElement('li');
		const removeIcon = document.createElement('span');
		removeIcon.innerText = '-';
		removeIcon.onclick = () => removeUrl(url);
		li.innerHTML = `<span>${url}</span>`;
		li.appendChild(removeIcon)
		ul.appendChild(li);
	})
}

const addExeptions = async () => {
	const activeTab = await getCurrentTab();
	let defaultURL = '';
	if (activeTab) defaultURL = new URL(activeTab.url).origin
	const url = prompt("Except url", defaultURL);
	if (!url) return;

	await setExceptionUrl(url);
	render();
}

initButton();
render();