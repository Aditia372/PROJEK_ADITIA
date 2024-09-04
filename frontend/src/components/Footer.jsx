// src/components/Footer.js

import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-4">&copy; {new Date().getFullYear()} Galaxy Phone by Aditia. All rights reserved.</p>
        <p className="mb-6">Providing the best services to our customers since 2024.</p>
        <div className="flex justify-center space-x-4">
          <a href="https://www.facebook.com/aditia.nurohman.963/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
            <FaFacebook className="w-6 h-6" />
          </a>
          <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
            <FaTwitter className="w-6 h-6" />
          </a>
          <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
            <FaInstagram className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
