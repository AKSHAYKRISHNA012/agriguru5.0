import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import DashboardSection from './components/DashboardSection';
import Testimonials from './components/Testimonials';
import AIFeatureSection from './components/AIFeatureSection';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('agri-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('agri-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('agri-theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div className="antialiased text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <HeroSection />
        <DashboardSection />
        <AIFeatureSection />
        <Testimonials />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

export default App;