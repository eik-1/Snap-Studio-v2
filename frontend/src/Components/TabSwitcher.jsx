const TabSwitcher = ({ tabs, activeTab, setActiveTab  }) => {


  const handleTabClick = (index) => {
    setActiveTab(index);

    
  };

  return (
    <div className="flex w-max bg-gray-100 p-1 rounded-full shadow-sm">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`
            flex-1 py-2 px-4 text-center text-sm font-medium transition-all duration-200 ease-in-out
            flex items-center justify-center gap-2 cursor-pointer 
            ${activeTab === index 
              ? "bg-white rounded-full shadow-sm text-black" 
              : "bg-transparent text-gray-500 hover:text-gray-700"}
          `}
          onClick={() => handleTabClick(index)}
          aria-selected={activeTab === index}
          role="tab"
        >
          {tab.icon && (
            <span className={`${activeTab === index ? "text-purple-500" : "text-gray-400"}`}>
              {tab.icon}
            </span>
          )}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabSwitcher;
