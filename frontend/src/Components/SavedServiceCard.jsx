import { cn } from "@/lib/utils"
import { ChevronRightIcon } from "lucide-react"
import { motion } from "motion/react"
import { useState } from "react"
import { Link } from "react-router-dom"
function SavedServiceCard({serviceName="Saved headshot", Icon, className, route})
{
    const [isHovering, setIsHovering] = useState(false)
    return(
        <Link to={`/app/myimages/${route}`}>
        <div className={cn(`w-[8rem] sm:w-[10rem] h-[8rem] sm:h-[10rem] px-4 sm:px-6  rounded-2xl bg-blue-500 relative flex justify-center items-center  sm:text-2xl hover:scale-105 transition-all duration-300 ${className} cursor-pointer`)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={()=>setIsHovering(false)}
        >
           <motion.div className="absolute bottom-2 right-2"
          initial={{x: 10, opacity: 0}}
          animate={{x: isHovering ? 0 : 10, opacity: isHovering ? 1 : 0}}
         

          >
          <ChevronRightIcon size={24} />
          </motion.div>
            <div className="w-full h-max flex flex-col gap-4 ">
                <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                <h2 className="font-semibold text-base sm:text-lg ">
                   <span className="block">

                    </span>
                    <span className="block">
                    {serviceName}
                    </span>
                   
                </h2>
            </div>
        </div>
        </Link>
    )
}
export default SavedServiceCard