function FilterSelector({ 
  label, 
  isActive = false, 
  onClick 
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium 
        transition-all duration-200 whitespace-nowrap hover:scale-105
        ${isActive
          ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
          : 'bg-gray-900/10 text-black dark:bg-white/20 dark:text-white/80 '
        }
      `}
    >
      {label}
    </button>
  );
}

export default FilterSelector;