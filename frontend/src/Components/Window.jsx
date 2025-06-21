const Window = ({ children, title = "SnapStudio" }) => {
    return (
      
      <div className="flex flex-col relative z-30 rounded-3xl  w-full max-w-5xl  overflow-hidden border-[12px] border-white ">
        
       
       
      <div className="bg-white p-0 flex-grow">
          {children}
        </div>
      </div>
    );
  };
export default Window;