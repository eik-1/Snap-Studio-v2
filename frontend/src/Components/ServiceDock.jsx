import ServiceCard from "./ServiceCard"
import { services } from "@/data/serviceInfo"
function ServiceDock()
{
    return(
        <div className="w-4/6 h-52 bg-white shadow-serviceDock w-xl rounded-xl py-4 px-8 flex  gap-6 mx-auto border mt-12">
           {
            services.map((service, index) => (
                <ServiceCard
                    key={index}
                    service={service}
                />
            ))
           }
        </div>
    )
}
export default ServiceDock