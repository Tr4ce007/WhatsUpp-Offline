import React from 'react';
import { ContactsProvider } from './contexts/ContactsContext';
import { MessagesProvider } from './contexts/MessagesContext';
import ContactList from './components/ContactList';
import MessageComponent from './components/MessageComponent';
import './styles/App.css';


const App = () => {
  return (
    <ContactsProvider>
      <MessagesProvider>
        <div className="app">
          <ContactList />
          <MessageComponent />
        </div>
      </MessagesProvider>
    </ContactsProvider>
  );
};

export default App;
