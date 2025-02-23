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
        <div className={cn(`w-[12rem] sm:w-[14rem] h-[12rem] sm:h-[14rem] px-6 sm:px-6 pb-8 sm:pb-12 rounded-2xl bg-blue-500 relative flex items-end sm:text-2xl hover:scale-105 transition-all duration-300 ${className} cursor-pointer`)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={()=>setIsHovering(false)}
        >
           <motion.div className="absolute bottom-2 right-2"
          initial={{x: 10, opacity: 0}}
          animate={{x: isHovering ? 0 : 10, opacity: isHovering ? 1 : 0}}
         

          >
          <ChevronRightIcon size={24} />
          </motion.div>
            <div className="w-full h-max flex flex-col gap-4">
                <Icon className="w-8 h-8" />
                <h2 className="font-semibold ">
                   <span className="block">
                   Saved&nbsp;
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