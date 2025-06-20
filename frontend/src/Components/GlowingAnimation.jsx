import { cn } from "@/lib/utils";
import {motion,useTime, useTransform} from 'motion/react'
function GlowingAnimation({className})
{
    const time=useTime();
    const rotate=useTransform(time, [0, 750], [0, 360],{
        clamp:false
    });
   
    const rotatingBackground= useTransform(rotate, (r)=>{
        return `conic-gradient(from ${r}deg, #ff4545, #006aff, #ff0095, #ff4545 )`
    })
  
    return (
        <motion.div className={cn(`blur-md ${className}`)}
        style={{
                 background:
                   rotatingBackground,
                

             }}
        ></motion.div>


    )
}
export default GlowingAnimation