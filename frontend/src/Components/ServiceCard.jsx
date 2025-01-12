import { cn } from "@/lib/utils";

const ServiceCard=({ 
  title = '', 
  description = '',
  images = [],
  labelText = null,
  labelStyle=null,
  handleClick,
  className=''
}) => {


  return (
    <div
      className={cn(`relative rounded-2xl h-32 px-4 py-4  max-w-xs  flex items-center   cursor-pointer hover:scale-105 transition-all duration-300 ${className}   `)}
      onClick={handleClick}
    >
       {labelText && <div className={cn(`absolute right-2 top-2 z-[100] w-max h-max p-1 bg-white/60 rounded-full backdrop-blur-md text-[0.6rem] leading-tight tracking-tighter drop-shadow-sm ${labelStyle}`)}>
              {labelText}
          </div>}
      <div className=" flex justify-between items-center   ">
        <div className="max-w-[50%]">
          <h2 className="text-lg font-bold mb-2 leading-tight">
            {title}
          </h2>
         
          <p className="text-[0.6rem] font-normal leading-tight opacity-80">
            {description}
          </p>
        </div>

  
       <div className={`relative flex gap-4 h-max items-center `}>
         
          {images.map((image, index) => (
            <div
              key={index}
              className={`w-[4rem] h-[4rem] rounded-xl overflow-hidden shadow-lg drop-shadow-md z-10 transform ${
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