import WelcomeText from "./WelcomeText";

import SearchBar from "./SearchBar"
function HomeHeader() {
  return (
    <div className="h-max w-full  flex flex-col items-center justify-center mt-16   rounded-xl mx-auto">
         <WelcomeText className="text-2xl font-medium text-black/75 "/>
         <SearchBar/>
         
    </div>
  );
}
export default HomeHeader;