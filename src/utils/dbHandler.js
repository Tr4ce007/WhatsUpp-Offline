const DB_NAME = 'whatsuppDB';
const DB_VERSION = 1;

const STORE_CONFIG = [
  { name: 'contacts', keyPath: 'id', autoIncrement: true },
  { name: 'messages', keyPath: 'id', autoIncrement: true, indexes: ['to'] }
];

let db = null;

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      STORE_CONFIG.forEach(storeConfig => {
        if (!db.objectStoreNames.contains(storeConfig.name)) {
          const store = db.createObjectStore(storeConfig.name, { keyPath: storeConfig.keyPath, autoIncrement: storeConfig.autoIncrement });

          if (storeConfig.indexes) {
            storeConfig.indexes.forEach(index => {
              store.createIndex(index, index);
            });
          }
        }
      });
    };

    request.onerror = (event) => {
      reject('Error opening database: ' + event.target.error);
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };
  });
}

function getStore(storeName, mode = 'readonly') {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, mode);
    const store = transaction.objectStore(storeName);

    transaction.onerror = (event) => {
      reject(event.target.error);
    };

    resolve(store);
  });
}

export { openDb, getStore };
