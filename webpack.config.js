const backgroundScripts = require('./webpack/background');
const popupScript = require('./webpack/popup');
const manageScript = require('./webpack/manage');

module.exports = [
	backgroundScripts,
	popupScript,
	manageScript
];
