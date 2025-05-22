import HeadshotStyleCard from "./HeadshotStyleCard"
import { headshotStyles } from "@/data/formData"

function HeadshotStyles({ selectedStyle, setSelectedStyle })
{
    return(
         
      <div className="overflow-y-auto flex-grow pr-1 -mr-1">
        <div className="grid grid-cols-2  gap-3 px-1 pt-1">
          {headshotStyles.map((style) => (
            <HeadshotStyleCard
              key={style.id}
              style={style}
              selectedStyle={selectedStyle}
              setSelectedStyle={setSelectedStyle}
            />
          ))}
        </div>
      </div>
    )
}
export default HeadshotStyles
