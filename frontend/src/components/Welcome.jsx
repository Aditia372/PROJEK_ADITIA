// src/components/WelcomePage.js

import React from 'react';
import { Button } from '@mui/material'; // Menggunakan Material UI untuk tombol

const WelcomePage = () => {
  return (
    <div className="relative w-full h-screen bg-cover bg-center bg-gradient-to-r from-blue-800 via-purple-800 to-red-800">
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
        <div className="text-center text-white px-6 py-8 bg-black bg-opacity-80 rounded-xl shadow-xl">
          <h1 className="text-4xl font-extrabold mb-4">Selamat Datang, Admin!</h1>
          <p className="text-lg mb-4">
            Kami sangat senang Anda berada di sini. Ini adalah dasbor admin Anda di mana Anda dapat mengelola produk, pengguna, dan pesanan.
          </p>
          <p className="text-sm mb-6">
            Jelajahi opsi di bilah samping untuk memulai.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
