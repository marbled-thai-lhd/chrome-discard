import { ACTIVATED, EXCEPT } from "./const";

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
	const data = {};
	data[key] = true;
	await chrome.storage.local.set(data);
}

export const deleteExceptionUrl = async url => {
	const key = getExceptionKeyFromUrl(url);
	await chrome.storage.local.remove(key)
}

export const getExptionList = async () => {
	const keys = Object.keys(await chrome.storage.local.get(null));
	return keys.filter(k => k.indexOf(EXCEPT) == 0).map(k => k.replace(EXCEPT, ''));
}

const getSingleKey = async key => (await chrome.storage.local.get([key]))[key];
const getExceptionKeyFromUrl = url => `${EXCEPT}${new URL(url).origin}`;
