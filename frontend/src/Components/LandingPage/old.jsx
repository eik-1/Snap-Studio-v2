import React, { useState, useEffect } from 'react';
import { img1, img2, img3, img4, img5, img6 } from '@/assets/image';

const Hero = () => {
 
  const leftImages = [img1, img2, img3];
  const rightImages = [img4, img5, img6];
 
  const [leftImageIndex, setLeftImageIndex] = useState(0);
  const [rightImageIndex, setRightImageIndex] = useState(0);

  useEffect(() => {
    const leftInterval = setInterval(() => {
      setLeftImageIndex((prevIndex) => (prevIndex + 1) % leftImages.length);
    }, 3000);
    

    return () => clearInterval(leftInterval);
  }, [leftImages.length]);
  
  useEffect(() => {

    const initialDelay = setTimeout(() => {
      const rightInterval = setInterval(() => {
        setRightImageIndex((prevIndex) => (prevIndex + 1) % rightImages.length);
      }, 3000);
      
 
      return () => clearInterval(rightInterval);
    }, 1500);
    
    return () => clearTimeout(initialDelay);
  }, [rightImages.length]);
  
  return (
    <div className="w-full bg-gradient-to-br mt-16 md:mt-24 py-16">
      <div className="max-w-6xl mx-auto px-4 relative">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="w-28 h-28 absolute lg:w-40 lg:h-40 lg:left-0 -left-16 mb-6 md:mb-0 transform -rotate-[16deg] translate-y-8 md:block hidden">
            <div className="absolute inset-0 rounded-2xl lg:rounded-3xl  drop-shadow-2xl overflow-hidden border-[6px] border-white">
            
              {leftImages.map((img, index) => (
                <img 
                  key={index}
                  src={img}
                  alt={`AI headshot ${index + 1}`}
                  className={`w-full h-full object-cover absolute transition-opacity duration-1000 ${
                    index === leftImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="max-w-lg text-center px-4 flex flex-col items-center  gap-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600">AI</span> Image Studio
            </h1>
            <p className="text-gray-600 text-base mb-8">
              Create headshots, product models, and
              captivating visuals in minutes — no design skills needed!
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              Create your AI Avatar Now
            </button>
          </div>
          
          <div className="w-28 h-28 lg:w-40 lg:h-40 absolute lg:right-0 -right-16 mt-6 md:mt-0 transform rotate-[16deg] -translate-y-28 lg:-translate-y-10 md:block hidden">
            <div className="absolute inset-0 rounded-2xl lg:rounded-3xl drop-shadow-2xl overflow-hidden border-[6px] border-white">
          
              {rightImages.map((img, index) => (
                <img 
                  key={index}
                  src={img}
                  alt={`AI headshot ${index + 1}`}
                  className={`w-full h-full object-cover absolute transition-opacity duration-1000 ${
                    index === rightImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;