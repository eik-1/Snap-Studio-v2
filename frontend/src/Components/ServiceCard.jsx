import React from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils"; // Optional class combiner

const ServiceCard = ({
  icon: Icon,
  title,
  path,
  image,
  isNew = false,
  className = ""
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(path)}
      className={cn(
        `
        relative group cursor-pointer overflow-hidden
        rounded-2xl shadow-md
        transition-all duration-300 ease-in-out
        hover:scale-[1.03] hover:shadow-2xl
        max-h-40 max-w-40 aspect-square
        ring-1 ring-white/10 hover:ring-white/20
        bg-zinc-900/50 backdrop-blur-md
        `,
        className
      )}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Progressive Blur Layer */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 z-10">
        <div
          className="absolute inset-0 blur-md"
          style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      </div>

      {/* Glowing Border on Hover */}
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-white/10 group-hover:shadow-[0_0_20px_2px_rgba(255,255,255,0.08)] transition-all z-10" />

      {/* Content (above blur) */}
      <div className="relative z-20 flex flex-col justify-end h-full p-4">
        <div className="flex items-center gap-3 text-white">
          <div className="flex items-center justify-center">
            <Icon className=" w-4 h-4" strokeWidth={2} />
          </div>
          <h3 className=" font-semibold text-xs sm:text-sm">{title}</h3>
        </div>
      </div>

      {/* New Badge */}
      {isNew && (
        <div className="absolute top-3 right-3 z-20">
          <span className="px-2 py-0.5 text-[10px] uppercase font-semibold tracking-wide bg-pink-600 text-white rounded-full shadow-md">
            New
          </span>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
