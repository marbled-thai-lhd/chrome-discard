export const SCHEMA_NAME = 'MagicChicken';
export const SCREENS_DB_NAME = 'screens';

export const PRIMARY_KEY = ['id', 'sessionId'];
export const PRIMARY_INDEX = 'PK';

class ScreenIndexedDB {
	constructor(options) {
		this.db = null;
		this.initialized = false;
		this.initializedPromise = null;

		this.open(options);
	}

	open() {
		const self = this;
		this.db && this.db.close();

		const openRequest = indexedDB.open(SCHEMA_NAME);

		openRequest.onupgradeneeded = e => {
			const thisDB = e.target.thisDB;

			if (!thisDB.objectStoreNames.contains(SCREENS_DB_NAME)) {
				thisDB.createObjectStore(SCREENS_DB_NAME, {
					keyPath: PRIMARY_KEY
				}).createIndex(PRIMARY_INDEX, PRIMARY_KEY, {
					unique: true
				});
			}
		};


		this.initializedPromise = new Promise((resolve, reject) => {
			openRequest.onsuccess = e => {
				self.db = e.target.result;
				self.initialized = true;
				resolve();
			};

			openRequest.onerror = reject;
		});
	}

	getTransaction(mode) {
		const self = this;
		const _getTransaction = (resolve, reject, retry = true) => {
			try {
				resolve(self.db.transaction([SCREENS_DB_NAME], mode));
			} catch (e) {
				if (e.name == 'InvalidStateError' && retry) {
					self.open();
					return reInitDB(resolve, reject, false)
				}

				reject();
				throw e;
			}
		};

		const reInitDB = (resolve, reject, retry = true) => {
			self.initializedPromise.then(() => _getTransaction(resolve, reject, retry));
		};


		if (this.db) return new Promise(_getTransaction);

		return new Promise(reInitDB);
	};


	getAll(callback, errorCallback = () => {}) {
		this.getTransaction('readonly')
			.then((transaction) => {
				const cursor = transaction.objectStore(SCREENS_DB_NAME).openCursor();
				const resultsRowsArray = [];

				cursor.onsuccess = e => {
					const result = e.target;
					if (!result) return callback(resultsRowsArray);

					resultsRowsArray.push(result.value);
					result.continue();
				};

				cursor.onerror = errorCallback;
			});
	};

	getByPrimaryIndex(query, callback) {
		this.getTransaction('readonly')
			.then(transaction => {
				const store = transaction.objectStore(SCREENS_DB_NAME);
				const request = store.index(PRIMARY_INDEX).get(IDBKeyRange.only(query.params));

				request.onsuccess = e => callback(e.target.result);
				request.onerror = () => callback()
			});
	};

	delete(query) {
		this.getTransaction('readwrite')
			.then(transaction => {
				const store = transaction.objectStore(SCREENS_DB_NAME);
				const request = store.index(query.IDB.index).get(IDBKeyRange.only(query.params));

				request.onsuccess = e => {
					const result = e.target.result;
					result && store.delete([result.id, result.sessionId]);
				};
			});
	};

	insertOrUpdate(data, key) {
		this.getTransaction('readwrite')
			.then(tx => tx.objectStore(SCREENS_DB_NAME).put(data, key));
	};

}

export default ScreenIndexedDB;