
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-300">
          © {new Date().getFullYear()} AgriGuru AI. All Rights Reserved.
        </p>
        <p className="mt-2 text-sm text-primary-300">
          Empowering Indian Agriculture through AI.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
