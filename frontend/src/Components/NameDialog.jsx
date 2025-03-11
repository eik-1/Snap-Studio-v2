import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { CircleX, Check } from "lucide-react";
import { RotatingLines } from "react-loader-spinner";
import { useUser } from "@/contexts/UserContext";
import { changeUserName } from "@/services/api/services"
function Dialog({ isOpen, handleClose }) {
    const { user, setUser } = useUser();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [currentFirstName, setCurrentFirstName] = useState(user.first_name);
    const [currentLastName, setCurrentLastName] = useState(user.last_name);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    

    function onClose() {
        if (isSubmitting) return;
        handleClose(false);
    }
   

async function handleChangeName(){
        if (firstName.trim() || lastName.trim()) 
            {
            setIsSubmitting(true);
            try {
                const newUser = await changeUserName(firstName, lastName);
                console.log(newUser);
                const updatedUser = {
                    ...user,
                    first_name: newUser.user_metadata.first_name,
                    last_name: newUser.user_metadata.last_name,
                };
                setUser(updatedUser);
                setIsSubmitting(false);
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                    onClose();
                }, 1500);
            } 
            catch (err) {
                console.error(err); 
            }
                
          
        }
}

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="bg-[#00000038] backdrop-blur-[4px] h-[100dvh] w-[100dvw] z-[120] fixed inset-0 flex items-center justify-center p-4 font-sans"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="h-max w-full sm:w-4/5 md:w-3/5 bg-[#ffffff] border-[1px] p-8 rounded-2xl relative flex justify-start gap-2 font-sans origin-top overflow-hidden"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 250,
                            damping: 30,
                        }}
                    >
                        <div
                            className="absolute right-5 top-5 h-max w-max cursor-pointer"
                            onClick={onClose}
                        >
                            <CircleX color="#00000089" />
                        </div>

                        {showSuccess && (
                            <motion.div
                                className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <motion.div
                                    className="text-center"
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 200,
                                    }}
                                >
                                    <motion.div
                                        className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            delay: 0.2,
                                        }}
                                    >
                                        <Check className="h-8 w-8 text-green-600" />
                                    </motion.div>
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Name Updated
                                    </h3>
                                </motion.div>
                            </motion.div>
                        )}

                        <div className="flex flex-col h-full w-full">
                            <div className="mb-8">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Change Name
                                </h2>
                                <p className="text-gray-500 mt-1 text-sm">
                                    Update your name details
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-normal text-gray-700 mb-2">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder={`Current: ${currentFirstName}`}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-normal text-gray-700 mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder={`Current: ${currentLastName}`}
                                    />
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end space-x-3">
                                <motion.button
                                    type="button"
                                    onClick={handleChangeName}
                                    disabled={isSubmitting || (!firstName.trim() && !lastName.trim())}
                                    className="px-4 py-2 w-40 h-10 text-center flex justify-center text-white bg-purple-500 rounded-md disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                    
                                        <RotatingLines 
                                        strokeWidth="4"
                                        animationDuration="0.75"
                                        strokeColor="white"
                                        height="16"
                                        width="16"
                                        /> 
            
                                    ) : (
                                        "Save Changes"
                                    )}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default Dialog;