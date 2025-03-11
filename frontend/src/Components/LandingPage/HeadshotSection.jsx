import { img1, img2 } from "@/assets/headshot-images"
import { useNavigate } from "react-router-dom"

export default function HeadshotSection() {
    const navigate = useNavigate()
    function handleClick() {
        navigate("/app")
    }
    return (
        <div className="relative z-10 max-w-7xl mx-auto mt-48">
            <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl p-6 sm:p-8 md:p-12 lg:p-16 bg-gradient-to-br from-white to-rose-50">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200 to-purple-300 opacity-30 rounded-full transform translate-x-12 -translate-y-12" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-slate-200 to-slate-300 opacity-30 rounded-full transform -translate-x-16 translate-y-12" />

                <div className="flex flex-col md:flex-row items-center md:gap-16">
                    <div className="w-full lg:w-1/2 order-2 md:order-1">
                        <div className="max-w-xl">
                         
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight">
                                <span className="relative">
                                    Studio-Quality Headshots
                                    <span className="absolute bottom-0 left-0 w-full h-2 bg-purple-200/50 -z-10 transform translate-y-2"></span>
                                </span>{" "}
                                for Your Professional Profile
                            </h2>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-700 mb-6">
                                Elevate Your Personal Brand Today
                            </h3>
                            <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
                                Upload a few of your photos and our AI-powered
                                platform will generate professional-grade
                                headshots with customized backgrounds, lighting,
                                and professional styling tailored to your
                                industry.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 mt-8">
                                <button
                                    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-rose-200/50 transition-all duration-300 transform hover:-translate-y-1"
                                    onClick={handleClick}
                                >
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="relative w-full md:w-1/2 order-1 md:order-2">
                        <div className="aspect-square h-[360px] w-full md:h-[500px]">
                            <div className="absolute left-6 top-20 sm:left-20 sm:top-16 md:left-18 md:top-4 rounded-2xl overflow-hidden shadow-2xl  -rotate-[25deg] md:rotate-12">
                                <div className="relative group">
                                    <img
                                        src={img1}
                                        alt="Professional male headshot"
                                        className="h-36 w-36 sm:w-52 sm:h-52 md:w-60 md:h-60 object-cover"
                                    />
                                </div>
                            </div>

                            <div className="absolute right-6 top-20 sm:right-20 sm:top-16 md:right-4 md:bottom-12 md:top-auto rounded-2xl overflow-hidden shadow-2xl  rotate-[25deg] md:-rotate-12">
                                <div className="relative group">
                                    <img
                                        src={img2}
                                        alt="Professional female headshot"
                                        className="h-36 w-36 sm:w-52 sm:h-52 md:w-60 md:h-60 object-cover "
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
