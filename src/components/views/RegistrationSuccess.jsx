import React from 'react';
import headerBg from "../assets/images/register-header.png";
import { useNavigate } from "react-router-dom";
import { useProgressBarContext } from '../context/ProgressBarContext';

const RegistrationSuccess = () => {
  const navigate = useNavigate();
  const {
    currentStep, setCurrentStep,steps,formData, setFormData ,selectedWorkshops, setSelectedWorkshops,resetForm
  } = useProgressBarContext();
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Green Pixelated Section */}
      <div
        className="bg-gradient-to-r from-lime-400 to-green-500 p-14 flex justify-between items-center flex-shrink-0 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url(${headerBg})`,
        }}
      >
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-50 px-4 py-8 md:py-16">
        {/* Left side decorative squares */}
        <div className="absolute left-0 top-32 md:top-40">
          <div className="grid grid-cols-2 gap-1 opacity-20">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-lime-200"></div>
            <div className="w-8 h-8 md:w-12 md:h-12 bg-green-200"></div>
            <div className="w-8 h-8 md:w-12 md:h-12 bg-green-200"></div>
            <div className="w-8 h-8 md:w-12 md:h-12 bg-lime-200"></div>
          </div>
          <div className="grid grid-cols-3 gap-1 mt-2 opacity-15">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-lime-300"></div>
            <div className="w-6 h-6 md:w-8 md:h-8 bg-green-300"></div>
            <div className="w-6 h-6 md:w-8 md:h-8 bg-lime-300"></div>
            <div className="w-6 h-6 md:w-8 md:h-8 bg-green-300"></div>
            <div className="w-6 h-6 md:w-8 md:h-8 bg-lime-300"></div>
            <div className="w-6 h-6 md:w-8 md:h-8 bg-green-300"></div>
          </div>
        </div>

        {/* Right side decorative squares */}
        <div className="absolute right-0 top-64 md:top-80 opacity-10">
          <div className="grid grid-cols-2 gap-1">
            <div className="w-6 h-6 md:w-10 md:h-10 bg-lime-200"></div>
            <div className="w-6 h-6 md:w-10 md:h-10 bg-green-200"></div>
            <div className="w-6 h-6 md:w-10 md:h-10 bg-green-200"></div>
            <div className="w-6 h-6 md:w-10 md:h-10 bg-lime-200"></div>
          </div>
        </div>

        {/* Main Card */}
        <div className="mx-auto max-w-6xl">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 text-center relative z-10">
            {/* Green line above title */}
            <div className="w-82 h-1 bg-green-600 mx-auto mb-6 lg:w-82"></div>
            
            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              THANK YOU!
            </h1>
            
            {/* Subtitle */}
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-6">
              Your Registration Has Been Submitted Successfully
            </h2>
            
            {/* Description */}
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
              A Confirmation Email With Your Event Details Will Be Sent To 
              You Shortly. Please Check Your Inbox (And Spam Folder).
            </p>
            
            {/* Button */}
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            onClick={() => {
              navigate('/')
              setCurrentStep(1)
              setSelectedWorkshops([])
              resetForm()
            }}
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Green Pixelated Section */}
      <div
        className="bg-gradient-to-r from-lime-400 to-green-500 p-14 flex justify-between items-center flex-shrink-0 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url(${headerBg})`,
        }}
      >
      </div>
    </div>
  );
};

export default RegistrationSuccess;