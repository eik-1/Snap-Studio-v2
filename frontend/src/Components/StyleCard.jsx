function StyleCard({ style, selectedStyle, setSelectedStyle }) {
    const isSelected = selectedStyle === style.id
    const isOtherSelected = selectedStyle && selectedStyle !== style.id

    return (
        <div className="relative group">
            <input
                type="radio"
                required
                id={style.id}
                name="style"
                value={style.id}
                checked={isSelected}
                onChange={() => {}}
                onClick={(e) =>
                    selectedStyle === style.id
                        ? setSelectedStyle(null)
                        : setSelectedStyle(style.id)
                }
                className="absolute opacity-0 w-full h-full cursor-pointer z-10"
            />
            <label
                htmlFor={style.id}
                className={`
          block w-full rounded-lg overflow-hidden transition-all duration-300 cursor-pointer
          hover:shadow-md transform hover:-translate-y-1 bg-white
          ${isSelected
              ? "ring-2 ring-purple-600 ring-offset-2 shadow-lg"
              : "border border-gray-200"
          }
          ${isOtherSelected ? "opacity-50" : "opacity-100"}
        `}
            >
                <div className="aspect-square relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent z-10" />
                    <img
                        src={style.image}
                        alt={style.label}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {isSelected && (
                        <div className="absolute top-2 right-2 z-20 bg-purple-600 rounded-full p-1">
                            <svg
                                className="w-3 h-3 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                    )}
                </div>
                <div className="py-2 px-1 flex justify-center items-center">
                    <h3 className="font-medium text-xs text-gray-700 text-center">
                        {style.label}
                    </h3>
                </div>
            </label>
        </div>
    )
}

export default StyleCard
