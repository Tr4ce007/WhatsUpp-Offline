import React from 'react';
import '../styles/MessageList.css';
import { BACKGROUND_PLACEHOLDER } from '../utils/constants';
import useContact from '../hooks/useContacts';

const MessageList = ({ messages }) => {
  const { loggedInContact } = useContact();
  return (
    <div className='chat-list-container' style={{ backgroundImage: `url(${BACKGROUND_PLACEHOLDER})` }}>
      {
        (messages.length === 0) ? <div className='empty-window'>Chats are End To End Encrypted.</div>
          : (
            <div className='messages-list'>
              {messages?.map((msg) => (
                <div key={msg.id} className={`message ${msg.from === loggedInContact ? 'sent' : 'received'}`}>
                  <div className="message-text">
                    {msg.text}
                  </div>
                  <div className="message-info">
                    <span className="message-time">{new Date(msg.timeStamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    {msg.from === loggedInContact && <span className="message-tick">✔✔</span>}
                  </div>
                </div>
              ))}
            </div>
          )
      }
    </div>
  )
}

export default MessageList;