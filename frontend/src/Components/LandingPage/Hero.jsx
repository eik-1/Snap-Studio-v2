import React, { useState, useEffect } from 'react';

import { img1, img2, img3, img4, img5, img6 } from '@/assets/image';

const Hero = () => {
 
  const leftImages = [img1, img2, img3];
  const rightImages = [img4, img5, img6];
 
  const [leftImageIndex, setLeftImageIndex] = useState(0);
  const [rightImageIndex, setRightImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const leftInterval = setInterval(() => {
      setLeftImageIndex((prevIndex) => (prevIndex + 1) % leftImages.length);
    }, 4000);

    const rightInterval = setInterval(() => {
      setRightImageIndex((prevIndex) => (prevIndex + 1) % rightImages.length);
    }, 4000);

    return () => {
      clearInterval(leftInterval);
      clearInterval(rightInterval);
    };
  }, [leftImages.length, rightImages.length]);
  
  return (
    <div className=" overflow-hidden max-w-7xl mx-auto">
      <div className="relative z-10 mx-auto py-20">
        {/* Desktop Layout - Original 3-column */}
        <div className="block mt-4 lg:mt-12">
          <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-24 items-center">
            
            {/* Left Image Column */}
            <div className={`col-span-3 hidden lg:block transform transition-all duration-1000 ease-out -translate-y-6 ${
              isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}>
              <div className="relative">
                <div className="relative w-full h-80 rounded-3xl overflow-hidden shadow-xl border-8 border-white ">
                  {leftImages.map((img, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
                        index === leftImageIndex 
                          ? 'opacity-100 scale-100' 
                          : 'opacity-0 scale-105'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Portrait ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Center Content */}
            <div className={`lg:col-span-6 text-center transform transition-all duration-1000 ease-out delay-300 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="flex flex-col items-center gap-6"> 
                <div className="inline-flex items-center px-4 py-2 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-full text-xs lg:text-sm font-medium text-gray-700 shadow-lg">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
                  Now create your AI face in minutes!
                </div>
                
                <h1 className="text-4xl lg:text-6xl mt-4 font-bold leading-tight">
                  <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Your{' '}
                  </span>
                  <span className="bg-gradient-to-r from-sky-600 to-purple-500 bg-clip-text text-transparent">
                    AI
                  </span>
                  <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    {' '}Image
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Studio
                  </span>
                </h1>
                
                <p className="text-base lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Create headshots, product models, and captivating visuals in minutes — 
                  <span className="font-semibold text-gray-800"> no design skills needed</span>
                </p>
                
                <div className="pt-4">
                  <button className="group relative px-6 py-4 bg-gray-900 text-sm lg:text-base text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                    <span className="relative z-10">Create your AI Avatar Now</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Image Column */}
            <div className={`col-span-3 hidden lg:block transform transition-all duration-1000 ease-out delay-500 translate-y-6 ${
              isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}>
              <div className="relative">
                <div className="relative w-full h-80 rounded-3xl overflow-hidden shadow-xl border-8 border-white">
                  {rightImages.map((img, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
                        index === rightImageIndex 
                          ? 'opacity-100 scale-100' 
                          : 'opacity-0 scale-105'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;