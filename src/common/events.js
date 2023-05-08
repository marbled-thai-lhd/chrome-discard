import { updateLabel } from "./display"
import { discardAllTab } from "./utils"

export const initEvent = () => {
	chrome.tabs.onUpdated.addListener(updateLabel)
	chrome.tabs.onReplaced.addListener(updateLabel)
	chrome.tabs.onRemoved.addListener(updateLabel)
}

export const initCommand = () => {
	chrome.commands.onCommand.addListener(async (command) => {
		if (command == 'cleanUp') {
			return discardAllTab();
		}
	});
}