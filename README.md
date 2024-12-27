# WhatsUpp Setup Guide

This is an offline version of popular messaging application.

## Check it out here
Deployed @ - 

## Steps for Installation

### Step 1: Clone the repository

First, clone the project in your local system:

```bash
git clone https://github.com/Tr4ce007/WhatsUpp-Offline.git
```

### Step 2: Go to the cloned directory

Go to the directory where you cloned : 

```bash
cd WhatsUpp-Offline
```

### Step 3: Install Dependencies

Install all the dependencies required to run the project:

```bash
npm install
```

### Step 4: Start the project

Now, start the project to view the website:

```bash
npm run start
```

### Step 5: Browse the website

Go to the url of the website:

```bash
http://localhost:3000
```


# Documentation

## Components

1. **ContactList**  
   Renders the list of all contacts for the logged-in user.

2. **Chat Window**  
   Renders the chat interface, including the header, message list, input field, and the send button.

3. **Message Window**  
   Displays the list of messages with timestamps. Messages are aligned left or right depending on whether they are sent or received, with distinctive colors and tick marks indicating their status.

## Hooks

1. **useContact**  
   A custom hook that provides a single point of access for managing contacts. It allows you to add new contacts and update the last message.

2. **useMessages**  
   A custom hook that manages fetching and sending messages, serving as the single point of interaction for message-related state.

## Contexts

1. **contactsContext**  
   A context that manages the state of all contacts within the application.

2. **messagesContext**  
   A context that manages the state of all messages within the application.

## Design Choices

The design follows modern industry standards and best practices, with an emphasis on maintainability, scalability, and ease of management. It is structured to support the growth of the codebase, ensuring flexibility for future updates and feature additions.

The architecture is modular, providing a clean separation of concerns. All components are designed to be easily extensible, enabling efficient management of both current and future requirements.
