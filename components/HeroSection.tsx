import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0">
        {/* Agriculture-themed background with improved fallback */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2"
          onError={(e) => {
            console.log('Video failed to load, falling back to background image');
            e.target.style.display = 'none';
          }}
          onLoadStart={() => console.log('Video loading started')}
          onCanPlay={() => console.log('Video can play')}
        >
          {/* Working agriculture-themed videos */}
          <source src="https://dl.dropbox.com/scl/fi/evlrc7gsay8t2aipd2m4t/drone-farm.mp4?rlkey=5sfvohslvavvg2mqcr0ra9nj3&st=52g3d56c&dl=0" type="video/mp4" />
          <source src="https://dl.dropbox.com/scl/fi/evlrc7gsay8t2aipd2m4t/drone-farm.mp4?rlkey=5sfvohslvavvg2mqcr0ra9nj3&st=52g3d56c&dl=0" type="video/mp4" />
          
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        
        {/* Fallback background image in case video fails */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2')`,
            zIndex: -1
          }}
        ></div>
      </div>
      
      <div className="relative z-10 p-8 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
          Empowering Farmers with AI-Driven Insights
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
          Get instant analysis on crop health, soil, market trends, and live weather data. Make smarter decisions for your farm.
        </p>
        <button 
          onClick={() => {
            // Smooth scroll to dashboard section
            const dashboardSection = document.getElementById('dashboard');
            if (dashboardSection) {
              dashboardSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105 duration-300 ease-in-out shadow-lg hover:shadow-xl"
        >
          Go to Dashboard
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
