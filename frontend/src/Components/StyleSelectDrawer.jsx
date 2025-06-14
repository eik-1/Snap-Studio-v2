import {motion, AnimatePresence} from "motion/react"
import { X } from "lucide-react"
import { IoIosPerson as StyleIcon } from "react-icons/io";
import StyleGrid from "./StyleGrid";

function StyleSelectDrawer({isOpen,setIsOpen, selectedStyle, setSelectedStyle, styles})
{
    return(
        <>
            <AnimatePresence>
       {isOpen && <> <motion.div
          className="bg-[#00000038] backdrop-blur-[12px] h-[100dvh] w-[100dvw] z-[120] flex  fixed inset-0 px-4 s:px-8 pb-5 overflow-y-scroll pt-32 s:pt-16 "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
        <motion.div
        initial={{ opacity: 0, y: 150 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 250, damping: 18, mass:0.8 }}
        exit={{ opacity: 0, y: 150 }}
        className="relative  h-max w-full  bg-[#ffffff] rounded-3xl flex flex-col justify-start items-center p-6 gap-4 font-sans mx-auto  "
        >
            
                <div className="sticky  bg-neutral-300/45 backdrop-blur-sm p-1 rounded-full  -top-28 s:-top-12 h-max w-max cursor-pointer text-neutral-500 ml-auto z-50" onClick={()=>setIsOpen(false)}>
                    <X  strokeWidth={2.5} />
                </div>
                
                      <div className="text-base font-medium text-center text-gray-800 flex items-center justify-center">
                    <StyleIcon className="text-gray-800 inline-block mr-2" size={20} />
                    <h2>Select a style</h2>
                      </div>
               <StyleGrid selectedStyle={selectedStyle} setSelectedStyle={setSelectedStyle} styles={styles} />
            </motion.div>
        </motion.div>
            </>

        }
        </AnimatePresence>
        </>
    )
}
export default StyleSelectDrawer