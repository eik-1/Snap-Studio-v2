import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { ChevronRightIcon } from "lucide-react";
import { useState } from "react";
const ServiceCard=({ 
  title = '', 
  description = '',
  Icon = null,
  images = [],
  labelText = null,
  labelStyle=null,
  handleClick,
  className=''
}) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className={cn(`relative rounded-2xl h-max px-4 py-8  max-w-xs  flex items-center   cursor-pointer hover:scale-105 transition-all duration-300 active:scale-[0.98] ${className}   `)}
      onClick={handleClick}
      role="button"
      onMouseEnter={() => {setIsHovering(true)}} onMouseLeave={() => {setIsHovering(false)}}
    >
       {labelText && <div className={cn(`absolute right-2 top-2 z-[100] w-max h-max p-1 bg-white/60 rounded-full backdrop-blur-md text-[0.5rem] leading-tight tracking-tighter drop-shadow-sm ${labelStyle}`)}>
              {labelText}
          </div>}
          <motion.div className="absolute bottom-2 right-2"
          initial={{x: 10, opacity: 0}}
          animate={{x: isHovering ? 0 : 10, opacity: isHovering ? 1 : 0}}
         

          >
          <ChevronRightIcon size={24} />
          </motion.div>
      <div className=" flex justify-between items-center">
        <div className="max-w-[50%] flex flex-col gap-2">
          <div>
            {Icon && <Icon className={`w-6 h-6 ${title==="Generate HeadShots"?"text-black/70":"text-white/80"}` }/>}
          </div>
          <h2 className="text-[1.1rem]  font-semibold leading-tight">
            {title}
          </h2>
         
        { /* <p className="text-[0.575rem] font-normal leading-tight opacity-80">
            {description}
          </p>*/}
        </div>

  
       <div className={`relative flex gap-4 h-max items-center `}>
         
          {images.map((image, index) => (
            <div
              key={index}
              className={`w-[4rem] h-[4rem] sm:h-[3rem]  sm:w-[3rem] lg:h-[4rem] lg:w-[4rem] rounded-xl overflow-hidden shadow-lg drop-shadow-md z-10 transform ${
                (index %2=== 0 && images.length>1) ? 'rotate-[-20deg] translate-x-4' : 'rotate-[20deg] -translate-x-4'
              }`}
            >
              <img
                src={image}
                alt={`service pic ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ServiceCard;