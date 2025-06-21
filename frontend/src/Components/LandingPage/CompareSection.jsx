import ImageComparisonSlider from "./InputOutputCompare"
import React from 'react';
import { Sparkles, Clock, Zap, ArrowRight, Star } from 'lucide-react';



function CompareSection() {
  const features = [
    { icon: Clock, text: "Minutes, not hours", accent: "text-blue-500" },
    { icon: Sparkles, text: "Photorealistic quality", accent: "text-purple-500" },
    { icon: Zap, text: "Instant processing", accent: "text-indigo-500" }
  ];

  const stats = [
    { number: "10M+", label: "Images Generated", accent: "border-blue-200" },
    { number: "99.9%", label: "Accuracy Rate", accent: "border-purple-200" },
    { number: "<2min", label: "Average Time", accent: "border-indigo-200" }
  ];

  return (
    <section className="relative w-full mt-32 lg:py-12 px-8  overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 space-y-8 flex md:block flex-col items-center">
            {/* Main Heading */}
            <div className="space-y-4">
             
              
              <h1 className="text-3xl lg:text-5xl font-bold  ">
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  Generate
                </span>
                <br />
                <span className="bg-gradient-to-r from-sky-600 to-purple-500 bg-clip-text text-transparent">
                  photorealistic
                </span>
                <br />
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  images in minutes!
                </span>
              </h1>
            </div>

          
            {/* Features */}
            <div className="flex flex-wrap gap-6 justify-center  ">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 ">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-md border border-gray-100 flex items-center justify-center group-hover:shadow-lg transition-shadow">
                    <feature.icon className={`w-5 h-5 ${feature.accent}`} />
                  </div>
                  <span className="font-medium text-gray-800">{feature.text}</span>
                </div>
              ))}
            </div>

           

            {/* CTA Button */}
            <div className="pt-6">
              <button className="group inline-flex items-center gap-3 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
                Start Creating Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Content - Image Comparison */}
          <div className="flex-shrink-0">
            <div className="relative">
           
              
              <ImageComparisonSlider />
         
             
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CompareSection;