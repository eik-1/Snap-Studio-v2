import FashionSidebar from "@/Components/FashionSidebar"
import FashionActionDock from "@/Components/FashionActionDock";
import { useEffect, useState } from "react";   
import { motion, AnimatePresence } from "framer-motion";
import {  ChevronsLeftIcon, ChevronsRightIcon, UploadCloudIcon } from "lucide-react";
import ContentPanel from "@/Components/ContentPanel";


function FashionTryOnPage() {
const [dressImage, setDressImage] = useState(null)
    const [modelImage, setModelImage] = useState(null)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => window.innerWidth <= 768);


    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };
    useEffect(() => {
      
      window.addEventListener("resize", () => {
        if(window.innerWidth <= 768) {
        setIsSidebarCollapsed(true);
      }
      });
     
      return () => {
        window.removeEventListener("resize", () => {});
      }

    }, [isSidebarCollapsed]);
    return (
        <div className="sm:w-[calc(100%-4rem)] h-[calc(100vh-3rem)] mt-12  sm:ml-16 flex flex-col  md:flex-row relative overflow-hidden  ">
            {/* Sidebar Section */}
            <AnimatePresence mode="sync">
                {!isSidebarCollapsed && (
            <motion.section
                initial={false}
                key={"sidebar"}
              animate={{
                    width: isSidebarCollapsed ? "0%" : "25%",
                    opacity: isSidebarCollapsed ? 0 : 1
                }}
                transition={{
                    duration: 0.4,
                    ease: [0.4, 0, 0.2, 1]
                }}
                exit={{
                  
                    opacity: 0
                }}
                className="h-full py-4 overflow-hidden relative"
            >
                <div className="w-full h-full px-4">
                    <FashionSidebar
                        dressImage={dressImage}
                        setDressImage={setDressImage}
                        modelImage={modelImage}
                        setModelImage={setModelImage}
                    />
                </div>
                
                {/* Collapse Button */}
                <button
                    onClick={toggleSidebar}
                    className="absolute top-1/2 -translate-y-1/2 right-0 bg-white/90 backdrop-blur-lg border rounded-full p-2 shadow-md hover:bg-white transition-all duration-200 hover:shadow-lg z-20"
                    aria-label="Collapse sidebar"
                    style={{ opacity: isSidebarCollapsed ? 0 : 1, pointerEvents: isSidebarCollapsed ? 'none' : 'auto' }}
                >
                    <ChevronsLeftIcon className="text-gray-600" size={16} />
                </button>
            </motion.section>
                )}
            </AnimatePresence>

            {/* Main Content Section */}
            <motion.section
            initial={false}
                animate={{ 
                    width: isSidebarCollapsed ? "100%" : "75%"
                }}
                transition={{ 
                    duration: 0.4, 
                    ease: [0.4, 0, 0.2, 1] 
                }}
                className="h-full flex-shrink-0 relative pt-4 "
            >
               
                <div className=" w-full h-full flex flex-col items-center justify-center overflow-hidden">
                    <ContentPanel />
                </div>
                <FashionActionDock
                    dressImage={dressImage}
                    setDressImage={setDressImage}
                    modelImage={modelImage}
                    setModelImage={setModelImage}   />

            </motion.section>

            {/* Expand Button - shows when sidebar is collapsed */}
            <AnimatePresence>
                {isSidebarCollapsed && (
                    <motion.button
                        key="expand-button"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ 
                            duration: 0.3, 
                            delay: 0.2 
                        }}
                        onClick={toggleSidebar}
                        className="absolute top-1/2 -translate-y-2/3 left-0 hidden  bg-white/90 backdrop-blur-lg border  rounded-full px-3 py-4 shadow-md hover:bg-white transition-all duration-200 hover:shadow-lg z-50 md:flex flex-col gap-3"
                        aria-label="Expand sidebar"
                    >
                        <UploadCloudIcon className="text-gray-600" size={18} />
                        <ChevronsRightIcon className="text-gray-600" size={18} />
                    </motion.button>
                )}
            </AnimatePresence>
           
                 
        
        </div>
    );
}

export default FashionTryOnPage;