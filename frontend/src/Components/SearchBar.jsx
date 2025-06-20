import { Search, Camera, Image, Palette, Shirt, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const services = [
    { icon: <Camera size={16} />, label: "Headshot", route: "headshot" },
    { icon: <Image size={16} />, label: "Custom Image", route: "custom-image" },
    { icon: <Palette size={16} />, label: "Styles", route: "image-styles" },
    { icon: <Shirt size={16} />, label: "Fashion Try-On", route: "fashion" },
    
];

function SearchBar({ onNavigate }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const searchRef = useRef(null);
    const containerRef = useRef(null);
    const navigate = useNavigate();

    // Filter services based on search term
    const filteredServices = services.filter(service =>
        service.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle input change
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        setIsOpen(e.target.value.length > 0);
        setSelectedIndex(-1);
    };

    // Handle service selection
    const handleServiceSelect = (service) => {
        setSearchTerm("");
        setIsOpen(false);
        setSelectedIndex(-1);
        
      navigate(`/app/${service.route}`);
    };

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
        if (!isOpen || filteredServices.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev => 
                    prev < filteredServices.length - 1 ? prev + 1 : 0
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => 
                    prev > 0 ? prev - 1 : filteredServices.length - 1
                );
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < filteredServices.length) {
                    handleServiceSelect(filteredServices[selectedIndex]);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                setSelectedIndex(-1);
                searchRef.current?.blur();
                break;
        }
    };

    // Clear search
    const clearSearch = () => {
        setSearchTerm("");
        setIsOpen(false);
        setSelectedIndex(-1);
        searchRef.current?.focus();
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
                setSelectedIndex(-1);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 sm:w-full max-w-md mx-auto mt-12 z-40">
            <motion.div
                ref={containerRef}
                layout
                className="bg-white/85 backdrop-blur-md text-black/80 border shadow-md  overflow-hidden  rounded-3xl"
                animate={{ height: isOpen ? "18rem" : "3rem" }}
                 transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 20,
                        }}
            >
                {/* Search Input Section */}
                <div className="flex items-center px-4 py-3  h-12">
                    <Search size={18} className="text-gray-800 mr-3" />
                    <input
                        ref={searchRef}
                        type="text"
                        value={searchTerm}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onFocus={() => searchTerm.length > 0 && setIsOpen(true)}
                        placeholder="Search services..."
                        className="flex-1 bg-transparent text-gray-800 placeholder:text-gray-400 text-sm focus:outline-none"
                    />
                    
                    <AnimatePresence>
                        {searchTerm && (
                            <motion.button
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                onClick={clearSearch}
                                className="ml-2 p-1 text-gray-800  transition-colors"
                            >
                                <X size={14} />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>

           
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{  opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{  opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="border-t border-gray-200 mx-2"
                        >
                            {filteredServices.length > 0 ? (
                                <div className="py-2 overflow-y-auto max-h-64 pb-8">  
                                    {filteredServices.map((service, index) => (
                                        <motion.button
                                            key={service.route}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            onClick={() => handleServiceSelect(service)}
                                            className={`
                                                w-full px-4 py-2.5 flex items-center gap-3 text-left transition-colors
                                                rounded-[22px]
                                                ${index === selectedIndex 
                                                    ? 'bg-black/10' 
                                                    : 'hover:bg-black/5'
                                                }
                                            `}
                                        >
                                            <div className="text-black/80">
                                                {service.icon}
                                            </div>
                                            <span className="text-sm text-black/80">
                                                {service.label}
                                            </span>
                                        </motion.button>
                                    ))}
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="px-4 py-6 text-center"
                                >
                                    <p className="text-black/80 text-sm">
                                        No services found
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}

export default SearchBar;