const backgroundScripts = require('./webpack/background');
const popupScript = require('./webpack/popup');

module.exports = [
	backgroundScripts,
	popupScript,
];
