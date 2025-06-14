import StyleCard from "./StyleCard"
function StyleGrid({ selectedStyle, setSelectedStyle, styles })
{
    return(
         
      <div className="overflow-y-auto flex-grow pr-1 -mr-1">
        <div className="grid grid-cols-2  gap-3 px-1 pt-1">
          {styles.map((style) => (
            <StyleCard
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
export default StyleGrid
