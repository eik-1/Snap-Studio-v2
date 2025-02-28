import { TriangleAlert } from 'lucide-react';
function ErrorIndicator({handleClick})
{
    return(
        <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2 items-center">
        <TriangleAlert color="red"/> <p className="text-gray-600">An Error Occured</p>
        </div>
        
       { handleClick &&<button className="h-max w-max px-3 py-2 border-[1px] rounded-md drop-shadow-sm text-sm hover:scale-105 transition-all duration-200" onClick={handleClick}>Retry</button>}</div>
    )
}
export default ErrorIndicator