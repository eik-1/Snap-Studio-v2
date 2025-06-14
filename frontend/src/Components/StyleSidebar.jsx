import React from 'react';
import { SquareUserRound as StyleIcon } from "lucide-react";
import StyleGrid from './StyleGrid';

function StyleSidebar({ styles, selectedStyle, setSelectedStyle }) {
  return (
    <div className="w-full h-full bg-white/90 backdrop-blur-lg border rounded-2xl p-5 shadow-md flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <StyleIcon className="text-gray-800" size={20} />
        <h2 className="text-base font-medium text-gray-800">Select Style</h2>
      </div>
     <StyleGrid selectedStyle={selectedStyle} setSelectedStyle={setSelectedStyle} styles={styles} />

      {selectedStyle && (
        <div className="mt-3 pt-3 border-t border-gray-100 ">
          <div className='flex gap-4 items-center'>
            <div className='h-max w-max p-[2px] border shadow-md rounded-[10px]'>

            
            <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden shadow-sm">
               <img
              src={styles.find(s => s.id === selectedStyle)?.image}
              alt={styles.find(s => s.id === selectedStyle)?.label}
              className="w-full h-full object-contain rounded-lg shadow-sm"
            />
            </div>
            </div>
           
          <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-700">
              {styles.find(s => s.id === selectedStyle)?.label}
            </span> Selected
          </p>
        </div>
      </div>
    )}
  </div>
);

}

export default StyleSidebar;