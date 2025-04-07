import SavedServiceCard from "@/Components/SavedServiceCard"
import { services } from "@/data/serviceInfo"

function MyImages() {
    function handleServiceClick(serviceType) {
        
    }

    return (
        <div className="w-full h-full bg-white relative flex flex-col md:flex-row md:items-center">
            {/* Sidebar */}
            <div className="w-[95%] flex-shrink-0 mx-auto md:mx-0 h-36 md:h-[95%] md:my-auto md:w-80 border-b-[1px] md:border-r-[1px] md:border-b-0 border-neutral-200">
                <div className="flex flex-col items-center mt-10 md:mt-32 gap-2">
                    <h2 className="text-3xl leading-relaxed text-center font-semibold bg-clip-text text-transparent bg-text-gradient">
                        My Images
                    </h2>
                    <p className="text-gray-500 text-sm">Explore your saved images</p>
                </div>
            </div>

            {/* Grid section */}
            <div className="md:h-full pt-8 px-4 w-full">
                <div className="flex flex-wrap gap-4 md:gap-6 w-4/5">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 px-2"
                        >
                            <SavedServiceCard
                                serviceName={service.name}
                                Icon={service.icon}
                                route={service.route}
                                className={service.className}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MyImages
