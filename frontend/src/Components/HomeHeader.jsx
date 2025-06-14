import WelcomeText from "./WelcomeText";

import SearchBar from "./SearchBar"
function HomeHeader() {
  return (
    <div className="h-max w-full  flex flex-col items-center justify-center mt-16   rounded-xl mx-auto">
         <WelcomeText className="text-2xl font-medium text-black/75 "/>
         <div className="w-full max-w-xl relative flex justify-center items-center mb-20">
          <SearchBar />
         </div>
       
         
    </div>
  );
}
export default HomeHeader;