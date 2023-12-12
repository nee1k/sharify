import React, { useRef, useState } from 'react';
import './Chat.css';

import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';
import 'firebase/compat/auth'; 
import 'firebase/compat/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


firebase.initializeApp({
  apiKey: "AIzaSyD7_SLNWgzhp7Ri2sOx_xBa-7nDZBDLMNA",
  authDomain: "chat-sharify.firebaseapp.com",
  projectId: "chat-sharify",
  storageBucket: "chat-sharify.appspot.com",
  messagingSenderId: "553394641200",
  appId: "1:553394641200:web:be610630737b9476e050f5",
  measurementId: "G-12S5N5NY2B"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  return (
    <div className="App">
      <header>
        <h1>Chat</h1>
        {/* Remove SignOut component */}
      </header>

      <section>
        <ChatRoom />
      </section>
    </div>
  );
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser || { uid: 'anonymous', photoURL: null };

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <main>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
        <button type="submit" disabled={!formValue}>send</button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === 'anonymous' ? 'received' : 'sent';

  return (
    <div className={`message ${messageClass}`}>
      <img 
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        margin: "2px 5px"}}
        
      src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt="User Avatar" />
      <p>{text}</p>
    </div>
  );
}

export default App;