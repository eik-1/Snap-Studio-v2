import ServiceCard from "./ServiceCard"
import { services } from "@/data/serviceInfo"
function ServiceDock()
{
    return(
        <div className="w-full md:w-3/4 h-max bg-white shadow-serviceDock w-xl rounded-3xl py-4 px-8 flex flex-wrap  gap-6 mx-auto border mt-12">
          {services.map((service) => (
            <ServiceCard
                key={service.id}
                image={service.images[0]}
                title={service.title}
                icon={service.icon}
                path={service.path}
                id={service.id}
            />
          ))}
        </div>
    )
}
export default ServiceDock