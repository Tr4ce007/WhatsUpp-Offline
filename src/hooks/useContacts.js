import { useEffect } from 'react';
import { useContactsContext } from '../contexts/ContactsContext';

const useContact = () => {
  const { contacts, setSelectedContact, fetchContacts, createContact, selectedContact, loggedInContact, updateContactMessage } = useContactsContext();

  useEffect(() => {
    fetchContacts();
  }, []);

  const addContact = async (name, number) => {
    if (name.trim() && number.trim()) {
      try {
        await createContact(name, number);
        fetchContacts();
      } catch (error) {
        console.log('error adding contact ',error);
      } 
    }
  };

  const selectContact = (contact) => {
    setSelectedContact(contact);
  };

  return { contacts, addContact, selectContact, selectedContact, loggedInContact, updateContactMessage };
};

export default useContact;
