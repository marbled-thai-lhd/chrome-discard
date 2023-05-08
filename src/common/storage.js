import { ACTIVATED } from "./const";

export const checkActive = async () => await getSingleKey(ACTIVATED);

export const initStorage = () => {
	const state = {};
	state[ACTIVATED] = false;
	chrome.storage.local.set(state);
}

export const checkExceptionUrl = async url => {
	const key = getExceptionKeyFromUrl(url);
	return await getSingleKey(key);
}

export const setExceptionUrl = async url => {
	const key = getExceptionKeyFromUrl(url);
	await chrome.storage.local.set(key, true)
}

export const deleteExceptionUrl = async url => {
	const key = getExceptionKeyFromUrl(url);
	await chrome.storage.local.remove(key)
}


const getSingleKey = async key => await chrome.storage.local.get([key])[key];
const getExceptionKeyFromUrl = url => `except_${new URL(url).hostname}`