import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0">
        {/* Using a working video URL from Pexels */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2"
          onError={(e) => {
            console.log('Video failed to load, falling back to poster image');
            e.target.style.display = 'none';
          }}
        >
          {/* Primary video source - Tom Fisk's drone footage of rice field terraces */}
          <source src="https://videos.pexels.com/video-files/2994205/2994205-hd_1920_1080_25fps.mp4" type="video/mp4" />
          
          {/* Fallback sources */}
          <source src="https://videos.pexels.com/video-files/2795750/2795750-hd_1920_1080_30fps.mp4" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/2086113/2086113-hd_1920_1080_25fps.mp4" type="video/mp4" />
          
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
