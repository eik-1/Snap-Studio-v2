import React, { useState, useRef } from 'react';
import { LuSwitchCamera as ChangeIcon } from "react-icons/lu";
const ImageStyleImageUpload = ({ uploadedImage, onImageUpload, onRemoveImage }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = async (files) => {
    const file = files[0];
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }


    
    const reader = new FileReader();
    reader.onload = (e) => {

      onImageUpload && onImageUpload(file);
    };
    reader.readAsDataURL(file);
  };

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-2 w-full px-4 relative">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      <div
        className={`
         transition-all duration-200 flex w-full justify-center  items-center gap-2
          ${dragActive ? 'scale-105' : ''}
        `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
      
        >
      
        <div className="text-center flex flex-col gap-1 items-center">

           {uploadedImage ? (
            <>
            <div className='flex items-center gap-2'>
              <ChangeIcon className="h-5 w-5 text-gray-700 " />
               <p className={`text-sm font-medium transition-colors ${dragActive ? 'text-blue-600' : 'text-gray-700'}`}>
              <span className="text-blue-500 cursor-pointer"
                  onClick={openFileDialog}
              >Change</span> Image
            </p>
            </div>
           
            <p className="text-[0.675rem]  mt-1 text-red-400 cursor-pointer"
              onClick={onRemoveImage}
            >
              Remove Image
            </p>
            </>):(
              <>
               <div className='flex items-center gap-2'>
              <UploadIcon className="h-5 w-5 stroke-gray-700 translate-y-[2px]" />
               <p className={`text-sm font-medium transition-colors ${dragActive ? 'text-blue-600' : 'text-gray-700'}`}>
              <span className="text-blue-500 cursor-pointer"
                  onClick={openFileDialog}
              >Upload</span> your Image
            </p>
            </div>
           
            <p className="text-[0.675rem]  mt-1 text-gray-400">
              PNG, JPG, WEBP up to 10MB
            </p>
              </>

            )
          }
          </div>
          </div>

    </div>
  );
};
export default ImageStyleImageUpload;


function UploadIcon({className})
{
  return(
<div className='flex '>
      <svg className={` ${className}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
      stroke="currentColor"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      >
<path d="M21 10.5V13.6C21 15.8402 21 16.9603 20.564 17.816C20.1805 18.5686 19.5686 19.1805 18.816 19.564C17.9603 20 16.8402 20 14.6 20H7.4C5.15979 20 4.03969 20 3.18404 19.564C2.43139 19.1805 1.81947 18.5686 1.43597 17.816C1 16.9603 1 15.8402 1 13.6V8.4C1 6.15979 1 5.03969 1.43597 4.18404C1.81947 3.43139 2.43139 2.81947 3.18404 2.43597C4.03969 2 5.15979 2 7.4 2H11.5M18 7V1M15 4H21M15 11C15 13.2091 13.2091 15 11 15C8.79086 15 7 13.2091 7 11C7 8.79086 8.79086 7 11 7C13.2091 7 15 8.79086 15 11Z" />
</svg>

</div>
  )
}