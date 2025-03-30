import React, { useState } from 'react';
import { Button } from "@/Components/UI/Button";
import { useModel } from "@/contexts/ModelContext";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";
import { imagesToZipBlob } from "@/services/utils/zipUtils";
import { ArrowLeft, Camera, Type, UserCircle, Key, Image, Check, Info } from "lucide-react";
import ImageInputBox from "@/Components/ImageInputBox";

const OnboardingFlow = () => {
  const {
    state: modelState,
    dispatch: modelDispatch,
    startModelTraining,
  } = useModel();
  
  const initialState = {
    modelName: "",
    triggerWord: "",
    gender: "",
  };

  const [formDataValues, setFormDataValues] = useState(initialState);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const { user } = useUser();
  const { toast } = useToast();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormDataValues({
      ...formDataValues,
      [name]: value,
    });
  }

  const handleSubmit = async () => {
    try {
      const zipBlob = await imagesToZipBlob(selectedImages);
      const formData = new FormData();
      formData.append("file", zipBlob, "images.zip");
      
      for (const [key, value] of Object.entries(formDataValues)) {
        formData.append(key, value);
      }
      
      formData.append("userId", user.$id);
      formData.append("userEmail", user.email);
      
      setLoader(true);
      await startModelTraining(formData);
      
      toast({
        title: "Model Training Started",
        description: "Your model training has started. You can logout and check back later",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "There was an error training the model. Please try again",
        variant: "destructive",
      });
    }
    
    setLoader(false);
    setSelectedImages([]);
    setFormDataValues(initialState);
  };

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      handleSubmit();
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const isCurrentPageValid = () => {
    switch (currentPage) {
      case 0:
        return true; // Intro page is always valid
      case 1:
        return formDataValues.modelName.trim() !== '';
      case 2:
        return formDataValues.triggerWord.trim() !== '';
      case 3:
        return formDataValues.gender !== '';
      case 4:
        return selectedImages.length > 0;
      default:
        return true;
    }
  };

  // Page definitions
  const pages = [
    { 
      title: "It All Starts With Your Avatar",
      description: "Train a personalized AI model that captures your unique style and essence. Create stunning imagery that's distinctly you.",
      icon: <Camera size={24} color="white" />,
      content: null,
    },
    {
      title: "Name Your Model",
      description: "Give your AI model a name that reflects its purpose or personality.",
      icon: <Type size={24} color="white" />,
      content: (
        <div className="bg-white p-6 rounded-lg border border-gray-300">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Model Name
          </label>
          <input
            type="text"
            name="modelName"
            value={formDataValues.modelName}
            onChange={handleChange}
            placeholder="e.g. Portrait Master, Style Pro"
            className="px-4 py-3 block w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-md"
          />
        </div>
      )
    },
    {
      title: "Set Your Trigger Word",
      description: "Choose a unique word that will activate your model during image generation.",
      icon: <Key size={24} color="white" />,
      content: (
        <div className="bg-white p-6 rounded-lg border border-gray-300">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trigger Word
          </label>
          <input
            type="text"
            name="triggerWord"
            value={formDataValues.triggerWord}
            onChange={handleChange}
            placeholder="e.g. avatar123, my_style"
            className="px-4 py-3 block w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-md"
          />
        </div>
      )
    },
    {
      title: "Select Gender",
      description: "This helps our AI understand your images better.",
      icon: <UserCircle size={24} color="white" />,
      content: (
        <div className="bg-white p-6 rounded-lg border border-gray-300">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <select
            name="gender"
            value={formDataValues.gender}
            onChange={handleChange}
            className="px-4 py-3 block w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-md"
          >
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-binary</option>
          </select>
        </div>
      )
    },
    {
      title: "Upload Your Images",
      description: "Select high-quality images that will train your model.",
      icon: <Image size={24} color="white" />,
      content: (
        <div className="bg-white p-6 rounded-lg border border-gray-300">
          <ImageInputBox
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
          />
        </div>
      )
    },
    {
      title: "Ready to Train Your Model",
      description: "You've completed all the steps! Click the button below to start training your custom model.",
      icon: <Check size={24} color="white" />,
      content: (
        <div className="bg-white p-6 rounded-lg border border-gray-300">
          <dl className="space-y-3 text-left">
            <div className="flex justify-between">
              <dt className="font-medium text-gray-500">Model Name:</dt>
              <dd className="font-semibold">{formDataValues.modelName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium text-gray-500">Trigger Word:</dt>
              <dd className="font-semibold">{formDataValues.triggerWord}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium text-gray-500">Gender:</dt>
              <dd className="font-semibold">{formDataValues.gender}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium text-gray-500">Images:</dt>
              <dd className="font-semibold">{selectedImages.length} selected</dd>
            </div>
          </dl>
        </div>
      )
    }
  ];

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left panel - for preview or imagery (hidden on mobile) */}
      <div className="hidden md:block md:w-2/5 bg-blue-900 relative">
        {/* Content for preview panel would go here */}
      </div>
      
      {/* Right panel - onboarding form */}
      <div className="w-full md:w-3/5 p-8 flex flex-col">
        {/* Back button */}
        {currentPage > 0 && (
          <div className="mb-4">
            <button 
              onClick={prevPage} 
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft size={20} />
            </button>
          </div>
        )}
        
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${((currentPage + 1) / pages.length) * 100}%` }}
              ></div>
            </div>
            <span className="ml-4 text-sm font-medium text-gray-600">{currentPage + 1}/{pages.length}</span>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">{pages[currentPage].title}</h1>
            <p className="mt-2 text-gray-600">{pages[currentPage].description}</p>
          </div>
          
          {/* Page content */}
          {pages[currentPage].content && (
            <div className="space-y-4">
              {pages[currentPage].content}
            </div>
          )}
          
          {/* First page get started button */}
          {currentPage === 0 && (
            <div className="mt-8">
              <Button 
                onClick={nextPage}
                className="w-full py-3 text-lg rounded-lg bg-black text-white hover:bg-gray-800"
              >
                Get Started
              </Button>
            </div>
          )}
        </div>
        
        {/* Navigation buttons */}
        {currentPage > 0 && (
          <div className="mt-8 flex justify-between items-center pt-4">
            <button
              onClick={prevPage}
              className="text-gray-500 hover:text-gray-700"
            >
              Back
            </button>
            
            {currentPage < pages.length - 1 ? (
              <Button
                onClick={nextPage}
                disabled={!isCurrentPageValid()}
                className="px-6 py-2 rounded-lg bg-black text-white disabled:bg-gray-300"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={loader || !isCurrentPageValid() || modelState?.currentTrainingId}
                className="px-6 py-2 rounded-lg bg-black text-white disabled:bg-gray-300"
              >
                {loader ? "Starting..." : "Start Training"}
              </Button>
            )}
          </div>
        )}
        
        {/* Help text */}
        <div className="mt-4 text-center text-xs text-gray-500">
          <span>Need some help? <a href="#" className="text-blue-600">Click here</a></span>
        </div>
        
        {/* Warning about existing model training */}
        {modelState?.currentTrainingId && (
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center gap-3">
              <Info size={24} className="text-amber-500" />
              <p className="text-sm text-amber-800">
                You already have a model training in progress. Please wait for it to complete before starting a new one.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingFlow;