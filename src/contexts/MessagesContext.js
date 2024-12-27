import React, { createContext, useContext, useState } from 'react';
import { getMessagesByContactNumber, addMessage } from '../utils/messagesDbHandler';

const MessagesContext = createContext();


export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async (selectedContact) => {
    getMessagesByContactNumber(selectedContact.number).then((result) => {
      setMessages(result);
    }).catch((err) => {
      setMessages([]);
      console.log('error in getting messages by contact number', err);
    })
  }

  const sendMessage = async (msg) => {
    addMessage(msg).then( () => {}).catch((err) => {console.log('error adding message', err)});
    setMessages((prevMsg) => [...prevMsg, msg]);
  }

  return (
    <MessagesContext.Provider
      value={{
        messages,
        fetchMessages,
        sendMessage,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessagesContext = () => useContext(MessagesContext);
