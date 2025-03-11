const Window = ({ children, title = "SnapStudio" }) => {
    return (
      <div className="flex flex-col rounded-lg shadow-xl w-full max-w-4xl overflow-hidden border border-gray-200">
       
        <div className="flex items-center px-2 sm:px-4 py-1 sm:py-2 bg-gray-100 border-b border-gray-200">
         
          <div className="flex space-x-1 sm:space-x-2 mr-2 sm:mr-4">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
          </div>
  
          <div className="text-xs sm:text-sm text-center text-gray-600 font-medium flex-grow truncate">
            {title}
          </div>
          
          
          <div className="w-8 sm:w-16"></div>
        </div>
        
        
        <div className="bg-white p-0 flex-grow">
          {children}
        </div>
      </div>
    );
  };
export default Window;