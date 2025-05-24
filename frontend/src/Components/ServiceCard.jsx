import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ 
  image, 
  title, 
  path,
  className = "" 
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    
      navigate(`${path}`);
    }
  

  return (
    <div
      className={`
        group relative cursor-pointer transition-all duration-500 ease-out
        ${className}
      `}
      onClick={handleNavigate}
    >
      {/* Main Card with premium glass effect */}
      <div className="
        relative bg-white/70 backdrop-blur-xl rounded-xl p-4
        border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.06)]
        hover:shadow-[0_32px_64px_rgba(0,0,0,0.12)] hover:bg-white/80
        transition-all duration-500 ease-out overflow-hidden
        hover:-translate-y-2 hover:scale-[1.02]
      ">
        
      
        
        

        {/* Image Container with sophisticated styling */}
        <div className="relative mb-4">
          <div className="
            aspect-square w-full max-w-[120px] mx-auto
            bg-gradient-to-br from-gray-50/80 to-gray-100/50 
            rounded-2xl p-2 border border-gray-200/30
            group-hover:border-purple-200/50 group-hover:shadow-lg
            transition-all duration-500 ease-out
            overflow-hidden relative
          ">
            {/* Subtle inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent rounded-xl" />
            
            {/* Image content */}
            <div className="relative w-full h-full flex items-center justify-center">
              {typeof image === 'string' ? (
                <img 
                  src={image} 
                  alt={title}
                  className="w-full h-full object-cover rounded-xl transition-all duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="text-5xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  {image}
                </div>
              )}
            </div>
            
            {/* Hover shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
          </div>
        </div>

        {/* Title with premium typography */}
        <div className="text-center relative z-10">
          <h3 className="
            text-xs font-medium text-gray-700 leading-tight
            group-hover:text-gray-900 transition-colors duration-300
            tracking-tight
          ">
            {title}
          </h3>
          
      
        
        </div>

    
        <div className="
          absolute inset-0 rounded-xl border border-transparent
          bg-gradient-to-r from-purple-200/50 via-transparent to-blue-200/50
          opacity-0 group-hover:opacity-100 transition-opacity duration-500
          pointer-events-none
        " />
      </div>
    </div>
  );
};
export default ServiceCard;

