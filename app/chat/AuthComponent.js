// app/auth/AuthComponent.js
// app/auth/AuthComponent.js
"use client";
import { useState } from "react";
import { auth, googleProvider, signInWithPopup } from "../../lib/firebase";
import Image from "next/image";

export default function AuthComponent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Error signing in:", err);
      setError("Failed to sign in. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome to ChatApp</h2>
        <p style={styles.subtitle}>Sign in to start chatting</p>

        {error && <p style={styles.error}>{error}</p>}

        <button onClick={handleGoogleSignIn} style={styles.googleButton} disabled={loading}>
          {loading ? "Signing in..." : (
            <>
              <span style={styles.buttonText}>Sign in with Google</span>
            </>
          )}
        </button>
      </div>

      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Abieyuwa. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "50vh",
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: "#F7F9FC",
    marginTop : '180px',
    padding: "20px",
    borderRadius: '10px',
  },
  card: {
    padding: "40px 20px",
    borderRadius: "10px",
    backgroundColor: "#FFFFFF",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
  },
  title: {
    fontSize: "1.8em",
    color: "#333333",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "1em",
    color: "#555555",
    marginBottom: "20px",
  },
  googleButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 20px",
    backgroundColor: "#4285F4",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1em",
    transition: "background-color 0.3s",
  },
  buttonText: {
    marginLeft: "10px",
    fontWeight: "500",
  },
  footer: {
    marginTop: "20px",
    textAlign: "center",
    color: "#888888",
    fontSize: "0.9em",
  },
  "@media only screen and (max-width: 600px)": {
    card: {
      padding: "30px 15px",
    },
    title: {
      fontSize: "1.6em",
    },
    subtitle: {
      fontSize: "0.9em",
    },
    googleButton: {
      fontSize: "0.9em",
    },
  },
};
