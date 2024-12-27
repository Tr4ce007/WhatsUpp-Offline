import { useEffect } from 'react';
import { useMessagesContext } from '../contexts/MessagesContext';
import useContact from './useContacts';

const useMessage = () => {
  const { selectedContact } = useContact();
  const { messages, fetchMessages, sendMessage } = useMessagesContext();

  useEffect(() => {
    if(selectedContact)fetchMessages(selectedContact);
  }, [selectedContact]);

  const sendNewMessage = async (msg) => {
    await sendMessage(msg);
  };

  const getMessages = (contactId) => messages[contactId] || [];

  return { messages, sendMessage, getMessages, sendNewMessage };
};

export default useMessage;
