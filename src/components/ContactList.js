import React, { useState } from 'react';
import useContact from '../hooks/useContacts';
import { IMAGE_PLACEHOLDER } from '../utils/constants';
import '../styles/ContactList.css';

const ContactList = () => {
  const { contacts, addContact, selectContact, loggedInContact } = useContact();
  const [showForm, setShowForm] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', number: '' });

  const handleAddContact = () => {
    addContact(newContact.name, newContact.number);
    setNewContact({ name: '', number: '' });
    setShowForm(false);
  };

  return (
    <div className="contact-list">
      <div className="header">
        <h2>Contacts</h2>
        <button className="add-contact-btn" onClick={() => setShowForm(!showForm)}>
          +
        </button>
      </div>

      {showForm && (
        <div className="add-contact-form">
          <input
            type="text"
            placeholder="Name"
            value={newContact.name}
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Number"
            value={newContact.number}
            onChange={(e) => setNewContact({ ...newContact, number: e.target.value })}
          />
          <button onClick={handleAddContact}>Add</button>
        </div>
      )}

      {contacts.length === 0 ? (
        <p>No Contacts</p>
      ) : (
        contacts.map((contact) => (
          <div
            key={contact.id}
            className="contact-item"
            onClick={() => selectContact(contact)}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={IMAGE_PLACEHOLDER}
                alt="Profile"
                className="contact-photo"
              />
              <div className="contact-info" style={{ marginLeft: '10px' }}>
                <h4>{contact.name}</h4>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {contact?.lastMessage?.from === loggedInContact && (
                    <span className="contact-message-tick" style={{ marginRight: '5px' }}>✔✔</span>
                  )}
                  <p style={{ marginBottom: 0 }}>{contact?.lastMessage?.text || 'Start a new chat...'}</p>
                </div>
              </div>

            </div>
            {contact?.lastMessage?.timeStamp && (
              <span className="contact-message-time">
                {new Date(contact.lastMessage.timeStamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>

        ))
      )}
    </div>
  );
};

export default ContactList;