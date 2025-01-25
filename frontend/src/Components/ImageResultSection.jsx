import { Image } from "lucide-react"
import { Download, Heart } from "lucide-react"
import { useState } from "react"
import { useImage } from "@/contexts/ImageContext"
import { motion } from "motion/react"

function ImageResultSection() {
    const { state:imageState } = useImage()
      const [selectedId, setSelectedId] = useState(null)
        const [isHovering, setIsHovering] = useState(false)
        console.log(imageState);
    return (
        <>
            <section className="w-full h-full  p-4 bg-white flex flex-col items-center justify-center gap-2 drop-shadow-sm">
                <h2 className="text-lg font-semibold bg-clip-text text-transparent text-center bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 w-max">
                    Your Generated Images
                </h2>
                
                   
                
                <div className="w-full h-full gap-4  p-2 bg-gray-50 rounded-lg  shadow-sm flex flex-col justify-center items-center">
                 {   imageState.generationStatus.status!=="success" && (<>  <Image size={64} color="lightgray" />
                    <p className="text-center text-neutral-300 text-sm">
                        No Image is generated, Your Generated images will be
                        shown here.
                    </p></>)}
                    {imageState.generationStatus.status==="success" && (
                        <>
                         <div className="relative h-full w-full grid grid-cols-2 gap-4 broder-[1px] border-red-600">
                         {imageState.generatedImageUrls.map((url, index) => (
                             <motion.div
                                 key={index}
                                 layoutId={`container-${index}`}
                                 className="h-full w-full aspect-square overflow-hidden rounded-lg shadow-sm bg-white cursor-pointer relative"
                                 onClick={() => setSelectedId(index)}
                                 onMouseEnter={() => setIsHovering(true)}
                                 onMouseLeave={() => setIsHovering(false)}
                             >
                                 <motion.img
                                     layoutId={`image-${index}`}
                                     src={url}
                                     alt={`Grid image ${index + 1}`}
                                     className="absolute inset-0 w-60 h-60 object-cover"
                                     loading="lazy"
                                 />
                                 {isHovering && (
                                     <>
                                         <a
                                             className="block absolute h-max w-max top-1 right-1 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 "
                                             href={url}
                                             download={"image" + index + ".png"}
                                             onClick={(e) => e.stopPropagation()}
                                         >
                                             <Download color="white" size={16} />
                                         </a>
                                         <div
                                             className="block absolute h-max w-max top-1 right-12 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
                                             onClick={(e) => {
                                                 e.stopPropagation()
                                               
                                             }}
                                         >
                                             <Heart
                                                 
                                             />
                                         </div>
                                     </>
                                 )}
                             </motion.div>
                         ))}
                     </div>
                     </>)}
                      
                
                </div>
            </section>
        </>
    )
}
export default ImageResultSection
