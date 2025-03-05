// important - old Component, not in use
import { useEffect, useState } from "react";
import axios from "axios";

import { useUser } from "@/contexts/UserContext";
import {motion, AnimatePresence} from "motion/react"
import { FadeLoader } from "react-spinners";
import { deleteSavedImage } from "@/services/api/services";
function SavedImageCollection()
{
    const [savedImages,setSavedImages]=useState([]);
    const [sId, setSId] = useState(null);
    const [isLoading, setIsLoading]=useState(true);
    const {user}=useUser();
  
    useEffect(()=>{
        async function fetchSavedImages()
        {
            console.log("fetching saved images")
            try
            {
                const response=await axios.post(`${import.meta.env.VITE_API_URL}/database/get-saved-images`,{
                    userId:user.$id
                })
                console.log(response.data.data)
                setSavedImages(response.data.data.imageUrls)
                setIsLoading(false);
            }
            catch(err)
            {
                setIsLoading(false);
                console.log(err)
            }
        }
        fetchSavedImages()
       
    },[user.$id])
    return(
        <>
        <div className="min-h-screen w-screen  flex-col  items-center">
            <h1 className="w-full text-center font-sans font-bold text-3xl mb-10 pt-12  text-gray-800 ">Your Collection</h1>
            {
                isLoading && <>
                    <div className="h-max w-full flex justify-center">
                            <FadeLoader
                                speedMultiplier={1.5}
                                color={"#ff4600"}
                                loading={isLoading}
                                height={15}
                                width={5}
                                radius={10}

                            />
                        
                    </div>
                </>
            }
            {
                !isLoading && savedImages.length===0 &&

                <h3 className="w-full text-center mt-10">
                    No Saved Images
                </h3>
            }
           {!isLoading &&savedImages.length!==0 &&<> <div className="h-max w-full flex flex-col items-center">
          

            
            <div className="w-3/5 h-max grid grid-cols-1 sm:grid-cols-3 gap-4 place-items-center">
                        {savedImages.map((url, index) => (
                            <motion.div
                                key={index}
                                layoutId={`container-${index}`}
                                className="h-52 w-52 mx-0 px-0  aspect-square overflow-hidden rounded-lg shadow-sm bg-white cursor-pointer relative"
                                onClick={() => setSId(index)}
                               
                            >
                                <motion.img
                                    layoutId={`image-${index}`}
                                    src={url}
                                    alt={`Grid image ${index + 1}`}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    loading="lazy"
                                />
                                
                            </motion.div>
                        ))}
                    </div>
                    </div>
                

                <AnimatePresence>
                    {sId !== null && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
                            onClick={() => setSId(null)}
                        >
                            <motion.div
                                layoutId={`container-${sId}`}
                                className="relative max-w-2xl  h-5/6 overflow-hidden rounded-lg"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <motion.img
                                    layoutId={`image-${sId}`}
                                    src={savedImages[sId]}
                                    alt={`Enlarged view ${sId + 1}`}
                                    className="w-full h-full object-contain"
                                />
                                <motion.button
                                    className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
                                    onClick={() => setSId(null)}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <line
                                            x1="18"
                                            y1="6"
                                            x2="6"
                                            y2="18"
                                        ></line>
                                        <line
                                            x1="6"
                                            y1="6"
                                            x2="18"
                                            y2="18"
                                        ></line>
                                    </svg>
                                </motion.button>
                              
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence></>}

               
            
        </div>
        </>

    )
}
export default SavedImageCollection