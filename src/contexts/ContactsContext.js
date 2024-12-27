import React, { createContext, useContext, useState } from 'react';
import { getContacts, insertContact, updateLastMessage } from '../utils/contactsDbHandler';

const ContactsContext = createContext();

export const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [loggedInContact, setLoggedInContact] = useState('9876543210');

  const fetchContacts = async () => {
    getContacts().then(contacts => {
      setContacts(
        contacts.sort((a, b) => {
          const timeStampA = a.lastMessage?.timeStamp ? new Date(a.lastMessage.timeStamp) : -Infinity;
          const timeStampB = b.lastMessage?.timeStamp ? new Date(b.lastMessage.timeStamp) : -Infinity;
        
          return timeStampB - timeStampA;
        })
      );
    }).catch(error => {
      console.error('Error fetching contacts:', error);
    });
  }

  const createContact = async (name, number) => {
    insertContact({ name, number })
      .then(() => { })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const updateContactMessage = async (message) => {
    updateLastMessage(selectedContact.id, message)
      .then(() => {
        fetchContacts();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        createContact,
        fetchContacts,
        selectedContact,
        setSelectedContact,
        loggedInContact,
        setLoggedInContact,
        updateContactMessage
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

export const useContactsContext = () => useContext(ContactsContext);
