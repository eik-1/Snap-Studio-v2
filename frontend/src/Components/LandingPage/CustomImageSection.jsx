import { useNavigate } from "react-router-dom"

export default function CustomImageSection() {
    const navigate = useNavigate()
    function handleClick() {
        navigate("/app")
    }
    return (
        <div className="relative z-10 max-w-7xl mx-auto ">
            <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden p-8 md:p-12 lg:p-16 bg-gradient-to-b from-gray-50 to-rose-50/70 ">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-16">
                    <div className="w-full lg:w-1/2 order-2 md:order-1">
                        <div className="max-w-xl">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl  font-bold text-gray-800 mb-4 leading-tight">
                                Turn your imagination into reality
                            </h2>
                            <h3 className="text-lg md:text-xl  font-normal text-gray-500 mb-6">
                                see yourself anywhere in the world with
                                stunning, photorealistic AI-generated images.
                                Just provide a prompt and let the magic happen.
                            </h3>

                            <div className="flex flex-col sm:flex-row gap-4 mt-8">
                                <button
                                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-rose-200/50 transition-all duration-300 transform hover:-translate-y-1"
                                    onClick={handleClick}
                                >
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="relative w-full md:w-1/2 order-1 md:order-2 rounded-xl">
                        <video
                            alt="app running"
                            className="h-full w-full object-fill rounded-xl"
                            autoPlay
                            muted
                            loop
                            playsInline
                          

                        >
                            <source
                                src={`https://res.cloudinary.com/doac8yyie/video/upload/v1745303725/snapstudio-custom_wfckdq.mp4`}
                                type="video/mp4"
                            />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>
        </div>
    )
}
