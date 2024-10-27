// app/page.js
"use client";
import { useState, useEffect } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import AuthComponent from "./chat/AuthComponent";
import ChatComponent from "./chat/ChatComponent";

export default function HomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <main style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      {user ? <ChatComponent user={user} /> : <AuthComponent setUser={setUser} />}
    </main>
  );
}
