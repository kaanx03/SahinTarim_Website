"use client";

import { useEffect } from "react";
import "./styles/globals.css";
import "./styles/components.css";
import "./styles/home.css";
import "./styles/product-detail.css";
import "./styles/product-list.css";
import "./styles/page.css";
import "./styles/about.css";
import "./styles/contact.css";

export default function RootLayout({ children }) {
  // Font Awesome CDN eklemek için
  useEffect(() => {
    const fontAwesomeScript = document.createElement("script");
    fontAwesomeScript.src = "https://kit.fontawesome.com/a076d05399.js";
    fontAwesomeScript.crossOrigin = "anonymous";
    document.body.appendChild(fontAwesomeScript);

    return () => {
      // Temizleme
      document.body.removeChild(fontAwesomeScript);
    };
  }, []);

  return (
    <html lang="tr">
      <head>
        <title>Şahintarım - Kaliteli Tohum ve Fideler</title>
        <meta
          name="description"
          content="Şahintarım - Organik ve kaliteli tohumların adresi"
        />
        <link rel="icon" href="/favicon.ico" />
        {/* Font Awesome (Alternatif CDN) */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
