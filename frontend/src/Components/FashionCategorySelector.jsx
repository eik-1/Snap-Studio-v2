import {
    PiPants as PantsIcon,
    PiTShirt as ShirtIcon,
    PiDress as Dress,
} from "react-icons/pi"

function FashionCategorySelector({ selectedCategory, setSelectedCategory }) {

    const categories = [
        { id: "tops", label: "Top", icon: ShirtIcon },
        { id: "bottoms", label: "Bottom", icon: PantsIcon },
        { id: "one-pieces", label: "One Piece", icon: Dress },
    ]
  const handleTabClick = (index) => {
    setSelectedCategory(categories[index].id);
  };

  return (
    <div className="flex  h-10 bg-gray-100 p-1 rounded-full shadow-sm">
      {categories.map((category, index) => (
        <button
          key={index}
          className={`
             py-2 px-4 text-center text-xs font-medium transition-all duration-200 ease-in-out
            flex items-center justify-center gap-2 cursor-pointer 
            ${selectedCategory === category.id 
              ? "bg-white rounded-full shadow-sm text-black" 
              : "bg-transparent text-gray-500 hover:text-gray-700"}
          `}
          onClick={() => handleTabClick(index)}
          aria-selected={selectedCategory === category.id}
          role="tab"
        >
          {category.icon && (
            <span className={`${selectedCategory === category.id ? "text-purple-500" : "text-gray-400"}`}>
              <category.icon/>
            </span>
          )}
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default FashionCategorySelector;
