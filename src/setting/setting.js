
import {
	MAX_ALLOW_RUNNING,
	SETTING_TTL, 
} from "@/common/const";

import { deleteExceptionUrl, getExptionList, getSingleKey, setExceptionUrl } from "@/common/storage";

const settingKeys = {};
settingKeys[SETTING_TTL] = 'Max time alive (minutes)';
settingKeys[MAX_ALLOW_RUNNING] = 'Max running tabs';

const display = async () => {
	const tableSetting = document.querySelector('table#settingContainer');

	Object.keys(settingKeys).forEach(async key => {
		const line = document.getElementById('setting').content.cloneNode(true);
		line.querySelector(".setting_name").innerHTML = settingKeys[key];
		const input = line.querySelector(".setting_value input");
		input.value = await getSingleKey(key) || '';
		input.name = key;
		tableSetting.appendChild(line);
	})
}

const displayExceptionList = async () => {
	const tableSetting = document.querySelector('table#exceptionsContainer');

	const urls = await getExptionList();
	urls.forEach(async url => {
		const line = document.getElementById('exception').content.cloneNode(true);

		const input = line.querySelector(".exception_value input");
		input.value = url;

		line.querySelector(".update").onclick = async () => {
			await deleteExceptionUrl(url);
			await setExceptionUrl(url);
			displayExceptionList();
		}

		line.querySelector(".delete").onclick = async () => {
			await deleteExceptionUrl(url);
			displayExceptionList();
		}

		tableSetting.appendChild(line);
	})

	Object.keys(settingKeys).forEach(async key => {
		const line = document.getElementById('setting').content.cloneNode(true);
		
	})
}

const saveSetting = () => {
	const settings = document.querySelectorAll('table#container input');
	settings.forEach(setting => {
		const data = {};
		data[setting.name] = setting.value;
		chrome.storage.local.set(data)
	})
}

document.querySelector('#saveSetting').onclick = () => saveSetting();
display();
displayExceptionList();