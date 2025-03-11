import camera3D from "../../assets/camera3d.png";
import ImageComparisonSlider from "./InputOutputCompare";
import { Camera, ShoppingBag } from "lucide-react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/app");
  }
  return (
    <div className="relative h-max mt-32 sm:mt-36 bg-white">
      

      <main className="max-w-full mx-auto gap-24 sm:gap-8  flex flex-row flex-wrap justify-center sm:justify-between">
      <div className="max-w-lg">
                        <div className="inline-flex items-center px-4 py-2 mb-8 rounded-full bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 shadow-sm">
                            <Sparkles className="h-4 w-4 mr-2 text-purple-500" />
                            <span className="text-sm font-medium text-purple-800">Transform your imagery</span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                            Your{" "}
                            <span className="relative inline-block">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-rose-500 to-orange-500">
                                    AI
                                </span>
                                <svg className="absolute -bottom-1 w-full" height="6" viewBox="0 0 100 6" preserveAspectRatio="none">
                                    <path d="M 0 6 Q 50 -6 100 6" fill="none" stroke="url(#grad)" strokeWidth="2" />
                                    <defs>
                                        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#A855F7" />
                                            <stop offset="50%" stopColor="#F43F5E" />
                                            <stop offset="100%" stopColor="#FB923C" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </span>{" "}
                            Image Studio{" "}
                            <span className="inline-block relative">
                                <img
                                    src={camera3D}
                                    alt=""
                                    className="h-14 w-14 inline-block drop-shadow-lg"
                                />
                              
                            </span>
                        </h1>

                      

                        <div className="space-y-6 mb-12">
                            <div className="flex items-start">
                                
                                <div>
                                    <span className="block text-lg font-semibold text-gray-900 mb-1">
                                        Create 100% AI photos
                                    </span>
                                    <span className="text-gray-600">
                                        in any pose, place or action — from casual selfies to 
                                        professional portraits with perfect lighting with just a simple prompt
                                    </span>
                                </div>
                            </div>

                          
                           
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <button className="group px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-rose-500 to-orange-500 text-white font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                            onClick={handleClick}
                            >
                                <span className="flex items-center">
                                    Create Your AI Model Now
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>
                            
                            <a href="#howItWorks" className="text-gray-600 font-medium underline-offset-4 hover:text-gray-900 transition-colors">
                               see how it works
                            </a>
                        </div>
                    </div>
                    <div className="">
                    <ImageComparisonSlider/>
                    </div>
 
         
        

      </main>
    </div>
  );
};

export default Hero;