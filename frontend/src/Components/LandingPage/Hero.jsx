
import ImageComparisonSlider from "./InputOutputCompare"
import { ArrowRight, Sparkles, Check } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Hero = () => {
    const navigate = useNavigate()
    function handleClick() {
        navigate("/app")
    }
    return (
        <div className="relative max-w-7xl h-max mt-16 md:mt-20 bg-gradient-to-r from-purple-50/50  to-indigo-50/50  py-16 rounded-2xl lg:rounded-3xl  mx-auto px-10">
            <main className="max-w-full mx-auto gap-24 lg:gap-8  flex lg:flex-row flex-col items-center justify-center lg:justify-between">
                <div className="max-w-[28rem]">
                    <div className="inline-flex items-center px-4 py-2 mb-8 rounded-full bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 shadow-sm">
                        <Sparkles className="h-4 w-4 mr-2 text-purple-500" />
                        <span className="text-sm font-medium text-purple-800">
                            Transform your imagery
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 leading-tight  mb-6">
                        Your{" "}
                        <span className="relative inline-block">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-fuchsia-500">
                                AI
                            </span>
                            <svg
                                className="absolute -bottom-1 w-full"
                                height="6"
                                viewBox="0 0 100 6"
                                preserveAspectRatio="none"
                            >
                                <path
                                    d="M 0 6 Q 50 -6 100 6"
                                    fill="none"
                                    stroke="url(#grad)"
                                    strokeWidth="2"
                                />
                                <defs>
                                    <linearGradient
                                        id="grad"
                                        x1="0%"
                                        y1="0%"
                                        x2="100%"
                                        y2="0%"
                                    >
                                        <stop offset="0%" stopColor="#A855F7" />
                                        <stop
                                            offset="50%"
                                            stopColor="#F43F5E"
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor="#FB923C"
                                        />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </span>{" "}
                        Image Studio{" "}
                     
                    </h1>
                    <p className="text-base text-gray-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Generate stunning AI-powered photos in any pose, place, or action—from professional Head shots to casual pictures—with just a simple prompt.
            </p>

           
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-8">
              <div className="flex items-center">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100 mr-2">
                  <Check className="h-3 w-3 text-green-600" />
                </span>
                <span className="text-sm text-gray-600">Instant Generation</span>
              </div>
              <div className="flex items-center">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100 mr-2">
                  <Check className="h-3 w-3 text-green-600" />
                </span>
                <span className="text-sm text-gray-600">Studio Quality</span>
              </div>
              <div className="flex items-center">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100 mr-2">
                  <Check className="h-3 w-3 text-green-600" />
                </span>
                <span className="text-sm text-gray-600">Multiple Styles</span>
              </div>
            </div>

                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <button
                            className="group px-6 py-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-500  text-white font-medium text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                            onClick={handleClick}
                        >
                            <span className="flex items-center">
                                Create Your AI Avatar Now
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>

                        <a
                            href="#howItWorks"
                            className="text-gray-600 font-medium underline-offset-4 hover:text-gray-900 transition-colors"
                        >
                            see how it works
                        </a>
                    </div>
                </div>
                <div className="">
                    <ImageComparisonSlider />
                </div>
               
            </main>
        </div>
    )
}

export default Hero
