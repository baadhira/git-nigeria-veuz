import React from 'react';
import { User } from 'lucide-react';
import sidebarTop from "../../assets/images/sidebar-top.png";
import sidebarInside from "../../assets/images/sidebar-inside.png";
import headerBg from "../../assets/images/register-header.png";
import loginImg from "../../assets/images/login.png";
import { useProgressBarContext } from "../../context/ProgressBarContext";

const RegistrationSidebar = () => {
  const { currentStep, setCurrentStep, steps,formData, setFormData ,selectedWorkshops, setSelectedWorkshops} = useProgressBarContext();
  return (
    <div className="order-1 lg:order-2 w-full lg:w-[40%] bg-white border border-gray-200 rounded-lg shadow-lg self-start lg:mt-8 relative overflow-hidden">
      {/* Header Background Image */}
      <div
              className="p-8 relative bg-cover bg-no-repeat justify-center lg:h-[5rem]"
              style={{
                backgroundImage: `url(${sidebarTop})`,
              }}
            >
              <img
                src={sidebarInside}
                alt="Center"
                className="absolute left-1/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain  w-40 h-40 lg:w-[17rem]"
              />
            </div>
     

      {/* Registration Information Button */}
      <div className="px-6 pt-6">
        <div className="bg-green-600 text-white px-4 py-3 rounded text-center font-bold text-sm">
          Registration Information 1
        </div>
      </div>

      {/* Content Section - All Centered */}
      <div className="p-6 text-center space-y-4">
        {/* Full Name */}
        <div>
          <div className="text-lg font-medium text-gray-500 uppercase mb-1 opacity-45">
            FULL NAME
          </div>
          <div className="text-sm text-gray-800 font-medium">
            {formData.firstName && formData.lastName 
              ? `${formData.firstName} ${formData.lastName}` 
              : ''}
          </div>
        </div>

        <div>
          <div className="text-s font-medium text-gray-500 uppercase mb-1 opacity-45">
            JOB TITLE
          </div>
          <div className="text-sm text-gray-800 font-medium">
            {formData.jobTitle || ''}
          </div>
        </div>

        {/* Company Name */}
        <div>
          <div className="text-lg font-medium text-gray-500 uppercase mb-1 opacity-45">
            COMPANY NAME
          </div>
          <div className="text-sm text-gray-800 font-medium">
            {formData.companyName || ''}
          </div>
        </div>

        {/* Country of Residence */}
        <div>
          <div className="text-lg font-medium text-gray-500 uppercase mb-1 opacity-45">
            COUNTRY OF RESIDENCE
          </div>
          <div className="text-sm text-gray-800 font-medium">
            {formData.country || ''}
          </div>
        </div>

        <div className="pt-4">
          <div className="text-lg font-medium text-gray-500 uppercase mb-2 opacity-45">
            BADGE CATEGORY
          </div>
          <div className="text-2xl font-bold text-gray-800">VISITOR</div>
        </div>
      </div>

      {/* Decorative Pattern */}
      <div className="absolute bottom-0 right-0 w-16 h-16 opacity-10">
        <div className="grid grid-cols-4 gap-1 h-full">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="bg-green-400 w-full h-full rounded-sm"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Demo component showing the sidebar with sample data
const Sidebar = () => {
  const sampleFormData = {
    firstName: "John",
    lastName: "Doe", 
    jobTitle: "Software Engineer",
    companyName: "Tech Corp",
    country: "United States"
  };

  return (
    // <div className="min-h-screen bg-gray-50 p-8">
    //   <div className="max-w-md mx-auto">
        <RegistrationSidebar formData={sampleFormData} />
    //   </div>
    // </div>
  );
};

export default Sidebar;