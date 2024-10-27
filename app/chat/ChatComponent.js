// app/chat/ChatComponent.js
"use client";
import { useState, useEffect } from "react";
import { db, auth, signOut } from "../../lib/firebase";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";

export default function ChatComponent({ user }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Ensure useEffect is always called
  useEffect(() => {
    if (!user) return; // Early return if user is not available

    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [user]); // Add user as a dependency to rerun if user changes

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    try {
      await addDoc(collection(db, "messages"), {
        text: message,
        createdAt: serverTimestamp(),
        user: {
          uid: user.uid || "anonymous",
          displayName: user.displayName || "Anonymous",
        },
      });
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Handle loading state for user
  if (!user) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2 style={styles.welcomeText}>Wagwan, {user.displayName || "User"}</h2>
        <button style={styles.signOutButton} onClick={() => signOut(auth)}>Sign Out</button>
      </header>

      <div style={styles.chatBox}>
        {messages.map((msg) => (
          <div key={msg.id} style={msg.user?.uid === user.uid ? styles.myMessage : styles.otherMessage}>
            <strong>{msg.user?.displayName || "Unknown User"}: </strong>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          style={styles.input}
        />
        <button onClick={handleSendMessage} style={styles.sendButton}>Send</button>
      </div>
    </div>
  );
}

// Styles
const styles = {
  container: {
    maxWidth: "600px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    fontFamily: "'Roboto', sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    borderBottom: "2px solid #eee",
    paddingBottom: "10px",
  },
  welcomeText: {
    color: "#4A90E2",
    fontWeight: "500",
    fontSize: "1.2em",
  },
  signOutButton: {
    padding: "6px 12px",
    backgroundColor: "#FF5A5F",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  chatBox: {
    maxHeight: "400px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "10px",
    borderRadius: "4px",
    backgroundColor: "#FAFAFA",
    marginBottom: "10px",
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
    padding: "8px 12px",
    borderRadius: "8px",
    maxWidth: "70%",
    color: "#333",
    fontSize: "0.9em",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#F3F3F3",
    padding: "8px 12px",
    borderRadius: "8px",
    maxWidth: "70%",
    color: "#333",
    fontSize: "0.9em",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "10px",
  },
  input: {
    flexGrow: 1,
    padding: "12px",
    borderRadius: "20px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "16px",
    fontFamily: "'Roboto', sans-serif",
  },
  sendButton: {
    padding: "10px 20px",
    backgroundColor: "#4A90E2",
    color: "white",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "16px",
    fontFamily: "'Roboto', sans-serif",
  },
};

// Global Styles
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
`;

export const metadata = {
  title: 'Chat App',
  description: 'A real-time chat application built with Next.js and Firebase.',
};

// You can add global styles to your _app.js or layout.js
