import React, { useState } from 'react';
import useMessage from '../hooks/useMessages';
import '../styles/MessageComponent.css';
import { IMAGE_PLACEHOLDER } from '../utils/constants';
import MessageList from './MessageList';
import useContact from '../hooks/useContacts';

const MessageComponent = () => {
  const { selectedContact, loggedInContact, updateContactMessage } = useContact();
  const { messages, sendNewMessage } = useMessage();
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    const message = {};
    if (newMessage.trim()) {
      message.text = newMessage;
      message.to = String(selectedContact.number);
      message.from = String(loggedInContact);
      message.timeStamp = new Date().toISOString();

      sendNewMessage(message);
      updateContactMessage(message);
    }
    setNewMessage('');
  };


  return (
    <div className="chat-window">
      {!selectedContact ? (
        <div className="empty-chat">
          <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="WhatsApp for Web" className="whatsupp-logo" />
          <p className="tagline-web">WhatsApp for Web</p>
          <p className="encrypted-text">Chats are end-to-end encrypted</p>
        </div>
      ) : (
        <div>
          <div className="chat-header">
            <img src={IMAGE_PLACEHOLDER} alt={selectedContact.name} className="contact-img" />
            <h3>{selectedContact.name}</h3>
            <button className="options-btn">:</button>
          </div>

          <div className="messages">
            {messages && <MessageList messages={messages} />}
          </div>

          <div className="message-input">
            <button className="emoji-button">😊</button>
            <button className="clip-button">🔗</button>
            <input
              type="text"
              placeholder="Type a message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={handleSendMessage} className="send-button">&#9658;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageComponent;
