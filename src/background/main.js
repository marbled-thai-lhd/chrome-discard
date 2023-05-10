import {
	initCommand,
	initEvent
} from "@/common/events";
import IndexedDB, { ADDED_ON_INDEX_NAME } from "@/common/indexedDB";
import {
	initStorage
} from "@/common/storage"
import {
	initTimer
} from "@/common/timer";

chrome.runtime.onInstalled.addListener(() => {
	initEvent();
	initStorage();
	initCommand();
	initTimer();
	const database = new IndexedDB();
	database.getAll({IDB: {
				table: 'screens',
				index: ADDED_ON_INDEX_NAME,
				predicate: 'getAllKeys',}}
				,
				e => console.log(e))
	// const metadata = {
	// 	'id': 1,
	// 	'sessionId': 1,
	// 	'added_on': new Date(),
	// 	'screen': "screen",
	// 	'pixRat': "devicePixelRatio"
	// };

	// database.putV2([{
	// 	IDB: {
	// 		table: 'screens',
	// 		data: metadata
	// 	}
	// }]);

})