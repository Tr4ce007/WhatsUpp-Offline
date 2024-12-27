import { openDb, getStore } from './dbHandler';

const STORE_NAME = 'messages';

function getMessages() {
  return new Promise((resolve, reject) => {
    openDb().then((db) => {
      const store = db.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        reject('Error retrieving messages: ' + event.target.error);
      };
    }).catch((error) => {
      reject('Error opening database: ' + error);
    });
  });
}

function addMessage(message) {
  return new Promise((resolve, reject) => {
    openDb().then((db) => {
      const store = db.transaction(STORE_NAME, 'readwrite').objectStore(STORE_NAME);
      const index = store.index('to');
      const request = index.get(message.to);

      request.onsuccess = (event) => {
        let chat = event.target.result;

        if (!chat) {
          chat = { to: message.to, messages: [] };
        }

        chat.messages.push(message);

        const putRequest = store.put(chat);
        putRequest.onsuccess = () => {
          resolve('Message added successfully');
        };

        putRequest.onerror = (event) => {
          reject('Error adding message: ' + event.target.error);
        };
      };

      request.onerror = (event) => {
        reject('Error finding chat: ' + event.target.error);
      };
    }).catch((error) => {
      reject('Error opening database: ' + error);
    });
  });
}

function getMessagesByContactNumber(contactNumber) {
  return new Promise((resolve, reject) => {
    openDb().then((db) => {
      const store = db.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME);
      const index = store.index('to');
      const request = index.get(contactNumber);

      request.onsuccess = (event) => {
        const chat = event.target.result;
        if (chat) {
          resolve(chat.messages);
        } else {
          resolve([]);
        }
      };

      request.onerror = (event) => {
        reject('Error retrieving messages for contact: ' + event.target.error);
      };
    }).catch((error) => {
      reject('Error opening database: ' + error);
    });
  });
}

export { getMessagesByContactNumber, addMessage, getMessages };
