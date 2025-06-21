import ImageComparisonSlider from "./InputOutputCompare";
import React from "react";
import { Sparkles, Clock, Zap, ArrowRight } from "lucide-react";

function CompareSection() {
  const features = [
    { icon: Clock, text: "Minutes, not hours", accent: "text-blue-500" },
    { icon: Sparkles, text: "Photorealistic quality", accent: "text-purple-500" },
    { icon: Zap, text: "Instant processing", accent: "text-indigo-500" },
  ];

  return (
    <section className="relative w-full mt-32 lg:pt-8 px-6 sm:px-8 overflow-hidden max-w-7xl mx-auto ">

      <div className="relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 flex-wrap-reverse">
          {/* Left Content */}
          <div className="flex-1 space-y-10 text-center lg:text-left">
            {/* Main Heading */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
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

            {/* Features */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl shadow border border-gray-100 flex items-center justify-center">
                    <feature.icon className={`w-5 h-5 ${feature.accent}`} />
                  </div>
                  <span className="font-medium text-gray-800 text-sm sm:text-base">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
          <div className="w-full lg:w-auto flex justify-center lg:justify-start">
                  <button className="group relative px-6 py-4 flex gap-2 bg-gray-900 text-sm  text-white font-semibold rounded-2xl  hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                Start Creating Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Content - Image Comparison */}
          <div className=" mx-auto lg:mx-0">
            <ImageComparisonSlider />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CompareSection;
