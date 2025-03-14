import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs } from '@/data/FAQ';

function FAQSection(){
  const [openIndex, setOpenIndex] = useState(null);


  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-12 text-center">
          <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-xs font-medium mb-4">
            Support
          </div>
          <h2 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-3">
            Frequently asked questions
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Everything you need to know about our product. Can't find the answer you're looking for? Reach out to our support team.
          </p>
        </div>
        
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`bg-white  rounded-xl border border-purple-100  transition-all duration-200 ${
                openIndex === index ? 'shadow-lg' : 'shadow-sm hover:shadow-md'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left px-6 py-4 focus:outline-none"
                aria-expanded={openIndex === index}
              >
                <span className={`font-medium ${openIndex === index ? 'text-indigo-600' : 'text-gray-800'}`}>
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`transition-transform duration-200 text-gray-400 ${
                    openIndex === index ? 'transform rotate-180 text-indigo-500' : ''
                  }`} 
                  size={18} 
                />
              </button>
              
              <div 
                className={`px-6 transition-all duration-200 ease-in-out overflow-hidden ${
                  openIndex === index ? ' pb-5 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 flex justify-center">
          <a 
            href="#" 
            className="flex items-center text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
          >
            <span>Contact support</span>
            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;