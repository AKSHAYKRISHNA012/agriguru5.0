
import React, { useState, useEffect } from 'react';
import { testimonialsData } from '../constants';
import { QuoteIcon } from './icons/QuoteIcon';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-primary-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
          What Farmers Say
        </h2>
        <div className="mt-10 relative h-48">
          {testimonialsData.map((testimonial, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="flex justify-center mb-4">
                <QuoteIcon className="w-10 h-10 text-primary-300 dark:text-primary-600" />
              </div>
              <blockquote className="text-xl italic text-gray-800 dark:text-gray-200">
                {testimonial.quote}
              </blockquote>
              <footer className="mt-4">
                <p className="font-semibold text-gray-700 dark:text-gray-100">{testimonial.author}</p>
                <p className="text-gray-500 dark:text-gray-400">{testimonial.location}</p>
              </footer>
            </div>
          ))}
        </div>
        <div className="flex justify-center space-x-2 mt-8">
            {testimonialsData.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                        currentIndex === index ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600 hover:bg-primary-200'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
