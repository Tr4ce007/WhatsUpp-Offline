// contactsHandlerDB.js
import { openDb, getStore } from './dbHandler';

const STORE_NAME = 'contacts';

function getContacts() {
  return new Promise((resolve, reject) => {
    openDb().then((db) => {
      const store = db.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        reject('Error retrieving contacts: ' + event.target.error);
      };
    }).catch((error) => {
      reject('Error opening database: ' + error);
    });
  });
}

function insertContact(contact) {
  return new Promise((resolve, reject) => {
    if (!contact || !contact.name || !contact.number) {
      reject('Invalid contact data. Make sure to include name, number.');
      return;
    }

    openDb().then((db) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.add(contact);

      request.onsuccess = () => {
        resolve('Contact added successfully!');
      };

      request.onerror = (event) => {
        reject('Error adding contact: ' + event.target.error);
      };
    }).catch((error) => {
      reject('Error opening database: ' + error);
    });
  });
}

function updateLastMessage(id, newLastMessage) {
  return new Promise((resolve, reject) => {
    if (!id || !newLastMessage) {
      reject('Invalid data. Please provide a valid contact id and new lastMessage.');
      return;
    }

    openDb().then((db) => {
      const store = db.transaction(STORE_NAME, 'readwrite').objectStore(STORE_NAME);
      const request = store.get(id);

      request.onsuccess = (event) => {
        const contact = event.target.result;

        if (!contact) {
          reject('Contact with the given ID does not exist.');
          return;
        }

        contact.lastMessage = newLastMessage;

        const updateRequest = store.put(contact);

        updateRequest.onsuccess = () => {
          resolve('Contact updated successfully!');
        };

        updateRequest.onerror = (event) => {
          reject('Error updating contact: ' + event.target.error);
        };
      };

      request.onerror = (event) => {
        reject('Error retrieving contact: ' + event.target.error);
      };
    }).catch((error) => {
      reject('Error opening database: ' + error);
    });
  });
}

export { getContacts, insertContact, updateLastMessage };
