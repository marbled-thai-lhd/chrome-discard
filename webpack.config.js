const backgroundScripts = require('./webpack/background');
const popupScript = require('./webpack/popup');
const manageScript = require('./webpack/manage');
const settingScript = require('./webpack/setting');

module.exports = [
	backgroundScripts,
	popupScript,
	manageScript,
	settingScript,
];
