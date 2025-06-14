import WelcomeText from "./WelcomeText";

import SearchBar from "./SearchBar"
function HomeHeader() {
  return (
    <div className="h-max w-full  flex flex-col items-center justify-center mt-24   rounded-xl mx-auto">
         <WelcomeText className="text-2xl font-medium text-black/80 "/>
          <p className="text-sm text-black/40 mt-4">
              What do you want to create today?</p>
         <div className="w-full max-w-xl relative flex justify-center items-center mb-20">
          <SearchBar />
         </div>
       
         
    </div>
  );
}
export default HomeHeader;