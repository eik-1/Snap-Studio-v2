import { useState } from "react";

function ServiceCard({ service, onNavigate }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleNavigate = () => {
    if (onNavigate) {
      onNavigate(service?.path);
    }
  };

  return (
    <div 
      className="relative group mx-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        onClick={handleNavigate}
        className={`
          w-40 h-48 rounded-2xl overflow-hidden cursor-pointer bg-white
          transition-all duration-300 transform flex flex-col
          ${isHovered ? 'scale-105 shadow-lg' : 'shadow-md'}
        `}
      >
        {/* Image container */}
        <div className="w-full h-32 p-3 flex items-center justify-center">
          <div className="w-full h-full rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
            <img
              src={service?.images[0]}
              alt={service?.title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        
        {/* Title area */}
        <div className="px-3 pb-3 pt-1 flex-grow flex items-center justify-center">
          <p className="text-gray-800 font-medium text-center text-sm">
            {service?.title}
          </p>
        </div>
      </div>
    </div>
  );
}

// Optional wrapper component for the carousel effect
function ServiceCarousel({ services, onNavigate }) {
  return (
    <div className="flex overflow-x-auto scrollbar-hide py-4 px-3 -mx-2">
      {services?.map((service, index) => (
        <ServiceCard
          key={index}
          service={service}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
}

export { ServiceCard, ServiceCarousel };
export default ServiceCard;