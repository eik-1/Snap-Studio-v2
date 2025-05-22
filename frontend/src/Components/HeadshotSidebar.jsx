import React from 'react';
import { SquareUserRound as StyleIcon } from "lucide-react";
import { headshotStyles } from "@/data/formData"
import HeadshotStyles from './HeadshotStyles';

function HeadshotSidebar({ headshot, selectedStyle, setSelectedStyle }) {
  return (
    <div className="w-full h-full bg-white/90 backdrop-blur-lg border rounded-2xl p-5 shadow-md flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <StyleIcon className="text-gray-800" size={20} />
        <h2 className="text-base font-medium text-gray-800">Select Style</h2>
      </div>
     <HeadshotStyles selectedStyle={selectedStyle} setSelectedStyle={setSelectedStyle} />

      {selectedStyle && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Selected: <span className="font-medium text-gray-700">
              {headshotStyles.find(s => s.id === selectedStyle)?.label}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default HeadshotSidebar;