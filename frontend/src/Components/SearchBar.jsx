import { Search } from "lucide-react";
function SearchBar()
{
    return(
        <div className="w-2/5 h-max p-2 bg-white shadow-sm border border-purple-200 rounded-full flex items-center  mt-12">
            <div className="w-1/12 h-full flex items-center justify-center">
                <Search className="text-gray-500" />
            </div>
            <input
                type="text"
                placeholder="Search for services or tools"
                className="w-full h-full bg-transparent text-sm text-gray-500 px-2 rounded-full focus:outline-none placeholder:text-[0.7rem]"
            />
         </div>
    )
}
export default SearchBar