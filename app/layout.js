// app/layout.js
import Head from "next/head";
import "./globals.css";

export const metadata = {
  title: "Chatty by Abieyuwa",
  description: "Join the chat and connect with others instantly on Chatty!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta property="og:title" content="Chatty 1.0 by Abieyuwa" />
        <meta property="og:description" content="Join the chat and connect with others instantly on Chatty 1.0!" />
        <meta property="og:image" content="/favicon.png" /> 
        <meta property="og:url" content="https://your-domain.com" />
        <meta name="twitter:card" content="summary" />
      </Head>
      <body>
        {children}
      </body>
    </html>
  );
}
