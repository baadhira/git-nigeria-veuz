import React from 'react';

const RegistrationSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Green Pixelated Section */}
      <div className="relative h-20 md:h-24 bg-gradient-to-r from-lime-400 via-green-500 to-green-600 overflow-hidden">
        {/* Pixelated effect using multiple divs */}
        <div className="absolute inset-0">
          {/* Large pixels */}
          <div className="absolute top-0 right-0 w-8 h-8 bg-lime-300 opacity-80"></div>
          <div className="absolute top-2 right-8 w-6 h-6 bg-green-400 opacity-90"></div>
          <div className="absolute top-0 right-16 w-4 h-4 bg-lime-500"></div>
          <div className="absolute top-4 right-20 w-8 h-8 bg-green-300 opacity-70"></div>
          <div className="absolute top-8 right-4 w-6 h-6 bg-lime-400 opacity-85"></div>
          <div className="absolute top-12 right-12 w-4 h-4 bg-green-500 opacity-95"></div>
          <div className="absolute top-16 right-24 w-6 h-6 bg-lime-600"></div>
          
          {/* Medium pixels */}
          <div className="absolute top-1 right-32 w-3 h-3 bg-green-400 opacity-80"></div>
          <div className="absolute top-6 right-28 w-3 h-3 bg-lime-500 opacity-70"></div>
          <div className="absolute top-10 right-36 w-3 h-3 bg-green-600"></div>
          <div className="absolute top-14 right-32 w-3 h-3 bg-lime-400 opacity-90"></div>
          
          {/* Small pixels */}
          <div className="absolute top-3 right-40 w-2 h-2 bg-green-500"></div>
          <div className="absolute top-7 right-44 w-2 h-2 bg-lime-600 opacity-80"></div>
          <div className="absolute top-11 right-48 w-2 h-2 bg-green-400"></div>
          <div className="absolute top-15 right-40 w-2 h-2 bg-lime-500 opacity-75"></div>
          
          {/* Left side pixels */}
          <div className="absolute top-2 left-0 w-6 h-6 bg-lime-500 opacity-60"></div>
          <div className="absolute top-8 left-4 w-4 h-4 bg-green-400 opacity-80"></div>
          <div className="absolute top-14 left-2 w-5 h-5 bg-lime-600 opacity-70"></div>
        </div>
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
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 text-center relative z-10">
            {/* Green line above title */}
            <div className="w-32 h-1 bg-green-600 mx-auto mb-6"></div>
            
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
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
              Return to Homepage
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Green Pixelated Section */}
      <div className="relative h-20 md:h-24 bg-gradient-to-r from-green-600 via-green-500 to-lime-400 overflow-hidden">
        {/* Pixelated effect using multiple divs */}
        <div className="absolute inset-0">
          {/* Large pixels */}
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-lime-300 opacity-80"></div>
          <div className="absolute bottom-2 right-8 w-6 h-6 bg-green-400 opacity-90"></div>
          <div className="absolute bottom-0 right-16 w-4 h-4 bg-lime-500"></div>
          <div className="absolute bottom-4 right-20 w-8 h-8 bg-green-300 opacity-70"></div>
          <div className="absolute bottom-8 right-4 w-6 h-6 bg-lime-400 opacity-85"></div>
          <div className="absolute bottom-12 right-12 w-4 h-4 bg-green-500 opacity-95"></div>
          <div className="absolute bottom-16 right-24 w-6 h-6 bg-lime-600"></div>
          
          {/* Medium pixels */}
          <div className="absolute bottom-1 right-32 w-3 h-3 bg-green-400 opacity-80"></div>
          <div className="absolute bottom-6 right-28 w-3 h-3 bg-lime-500 opacity-70"></div>
          <div className="absolute bottom-10 right-36 w-3 h-3 bg-green-600"></div>
          <div className="absolute bottom-14 right-32 w-3 h-3 bg-lime-400 opacity-90"></div>
          
          {/* Small pixels */}
          <div className="absolute bottom-3 right-40 w-2 h-2 bg-green-500"></div>
          <div className="absolute bottom-7 right-44 w-2 h-2 bg-lime-600 opacity-80"></div>
          <div className="absolute bottom-11 right-48 w-2 h-2 bg-green-400"></div>
          <div className="absolute bottom-15 right-40 w-2 h-2 bg-lime-500 opacity-75"></div>
          
          {/* Left side pixels */}
          <div className="absolute bottom-2 left-0 w-6 h-6 bg-lime-500 opacity-60"></div>
          <div className="absolute bottom-8 left-4 w-4 h-4 bg-green-400 opacity-80"></div>
          <div className="absolute bottom-14 left-2 w-5 h-5 bg-lime-600 opacity-70"></div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;