import camera3D from "../../assets/camera3d.png";
import ImageComparisonSlider from "./InputOutputCompare";
import { Camera, ShoppingBag, ArrowRightIcon } from "lucide-react";
import SparklesText from "../UI/SparklesText";
const Hero = () => {
  
  return (
    <div className="relative h-max mt-36  bg-white">
      

      <main className="max-w-full mx-auto gap-8  flex flex-row justify-around">
        <div className="max-w-md h-max flex flex-col justify-center gap-6">

        
        <h1 className="text-6xl font-bold text-[#1A1A1A]">

<span>Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-rose-400  to-orange-400">AI</span>{" "}
<SparklesText
    className="inline-block"
    text="Image Studio"
    colors={{first: '#ba68c8', second: '#fff176'}}
/>
{" "}
 </span>
<img src={camera3D} alt="" className="h-14 w-14 inline-block pb-1" />


</h1>


        
        <p className="text-gray-600 text-xl max-w-2xl mx-auto mb-4">
          Get custom images of you, any way you envision. With just a few photos of yourself and a simple prompt
        </p>
        <div className="flex items-center gap-4">
                                <Camera className="h-6 w-6 text-orange-500" />
                                <span className="text-lg text-neutral-600">
                                    <span className="font-semibold text-black  cursor-pointer">
                                        Take 100% AI photos
                                    </span>{" "}
                                    in any pose, place or action
                                </span>
                            </div>
                            <div className="flex items-center gap-4 ">
                                <ShoppingBag className="h-6 w-6 text-blue-500" />
                                <span className="text-lg text-neutral-600">
                                    <span className="font-semibold text-black  cursor-pointer">
                                        Try on clothes on your model
                                    </span>{" "}
                                    for your Shopify store
                                </span>
                            </div>

                            <button
      className={`relative w-max h-max px-4 py-2 border-[1px] drop-shadow-sm hover:drop-shadow-md hover:scale-105 transition-all rounded-full bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-rose-500 to-orange-500 flex items-center justify-center`}
    
    
    >
      <div>Create Your AI Model Now</div>
     
    </button>
  

 
  </div>
  <ImageComparisonSlider/>
         
        

        
          {/*<div className="absolute left-20 top-40 flex">
            <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg -rotate-12">
              <img src={i1} alt="AI generated im" className="w-full h-full object-cover"  />
            </div>
            <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg -ml-6 rotate-12">
              <img src={i2} alt="AI generated im" className="w-full h-full object-cover" />
            </div>
          </div>
          
          <div className="absolute right-20 -top-12 flex">
            <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg -rotate-12">
              <img src={i3} alt="AI generated im" className="w-full h-full object-cover" />
            </div>
            <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg -ml-6 rotate-12">
              <img src={i4} alt="AI generated im" className="w-full h-full object-cover" />
            </div>
          </div>*/}
      
      </main>
    </div>
  );
};

export default Hero;