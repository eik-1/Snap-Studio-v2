import HeadShotSidebar from "@/Components/HeadshotSidebar";
import HeadshotActionDock from "@/Components/HeadshotActionDock";
import { useEffect, useState } from "react";   
import { motion, AnimatePresence } from "framer-motion";
import {  ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";
import ContentPanel from "@/Components/ContentPanel";
import { IoIosPerson as ExpandIcon } from "react-icons/io";
import StyleSelectDrawer from "@/Components/StyleSelectDrawer";

function ImageStylesPage() {
    const [selectedStyle, setSelectedStyle] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => window.innerWidth <= 768);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };
    useEffect(() => {
      
      window.addEventListener("resize", () => {
        if(window.innerWidth > 768) {
          setIsSidebarCollapsed(false);
          setIsDrawerOpen(false);
      } else if(window.innerWidth <= 768) {
        setIsSidebarCollapsed(true);
      }
      });
     
      return () => {
        window.removeEventListener("resize", () => {});
      }

    }, [isSidebarCollapsed]);
    return (
        <div className=" h-[calc(100vh-3rem)] mt-12  flex flex-col  md:flex-row relative overflow-hidden  ">
            {/* Sidebar Section */}
            <AnimatePresence mode="wait">
                {!isSidebarCollapsed && (
                    <motion.section
                        key="sidebar"
                        initial={false}
                       
                        exit={{ 
                          
                            opacity: 0 
                        }}
                        transition={{ 
                            duration: 0.4, 
                            ease: [0.4, 0, 0.2, 1] 
                        }}
                        className="h-full  py-4 overflow-hidden relative"
                    >
                        <div className="w-full h-full px-4">
                            <HeadShotSidebar 
                                selectedStyle={selectedStyle} 
                                setSelectedStyle={setSelectedStyle} 
                            />
                        </div>
                        
                        {/* Collapse Button */}
                        <button
                            onClick={toggleSidebar}
                            className="absolute top-1/2 -translate-y-1/2 right-0 bg-white/90 backdrop-blur-lg border rounded-full p-2 shadow-md hover:bg-white transition-all duration-200 hover:shadow-lg z-20"
                            aria-label="Collapse sidebar"
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
                    width: isSidebarCollapsed ? "100%" : "66.666667%"
                }}
                transition={{ 
                    duration: 0.4, 
                    ease: [0.4, 0, 0.2, 1] 
                }}
                className="h-full flex-shrink-0 relative pt-4"
            >
                <div className=" w-full h-full flex flex-col items-center justify-center overflow-hidden">
                    <ContentPanel />
                </div>

                <HeadshotActionDock 
                    selectedStyle={selectedStyle}
                    setSelectedStyle={setSelectedStyle}
                    setIsDrawerOpen={setIsDrawerOpen}
                    isDrawerOpen={isDrawerOpen}
                />
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
                        <ExpandIcon className="text-gray-600" size={18} />
                        <ChevronsRightIcon className="text-gray-600" size={18} />
                    </motion.button>
                )}
            </AnimatePresence>
           
                    <StyleSelectDrawer
                        isOpen={isDrawerOpen}
                        setIsOpen={setIsDrawerOpen}
                        selectedStyle={selectedStyle}
                        setSelectedStyle={setSelectedStyle}/>
        
        </div>
    );
}

export default ImageStylesPage;