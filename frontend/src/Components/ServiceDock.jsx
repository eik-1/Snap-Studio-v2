import ServiceCard from "./ServiceCard"
import { services } from "@/data/serviceInfo"
function ServiceDock()
{
    return(
        <div className="w-full md:w-max h-max bg-white/85 backdrop-blur-md shadow-serviceDock w-xl rounded-3xl p-6 flex flex-wrap items-center justify-center gap-6 mx-auto border mt-12">
          {services.map((service) => (
            <ServiceCard
                key={service.id}
                image={service.images[0]}
                title={service.title}
                icon={service.icon}
                path={service.path}
                id={service.id}
                className={service.className}
            />
          ))}
        </div>
    )
}
export default ServiceDock