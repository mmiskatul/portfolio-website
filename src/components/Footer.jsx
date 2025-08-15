// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-blue-100 py-6 text-center select-none">
      <p className="text-sm">
        © {new Date().getFullYear()} Md. Miskatul Masabi. All rights reserved.
      </p>
    </footer>
  );
}
