import { checkActive } from "./storage";

export const updateLabel = async () => {
	const active = await checkActive();
	chrome.action.setIcon({
		path: getPaths(active)
	});
}
const getPath = (state) => state ? '/assets/icons/started-*.png' : '/assets/icons/stopped-*.png';
const getPaths = (state) => {
	return [16, 32, 64, 128].reduce((acc, r) => (acc[r] = getPath(state).replace('*', r), acc), {});
}