import { Briefcase, Building, CheckCircle, Edit3, Globe, Mail, MapPin, Phone, User } from 'lucide-react';
import React from 'react';
import sidebarInside from "../../assets/images/sidebar-inside.png";
import sidebarTop from "../../assets/images/sidebar-top.png";
import { useProgressBarContext } from "../../context/ProgressBarContext";

const RegistrationSidebar = () => {
  const { currentStep, setCurrentStep, steps, formData, setFormData, selectedWorkshops, setSelectedWorkshops } = useProgressBarContext();
  
  const showDetailedInfo = currentStep > 1;
  
  const getCountryName = (countryCode) => {
    const countries = {
      'us': 'United States',
      'uk': 'United Kingdom', 
      'in': 'India',
      'de': 'Germany'
    };
    return countries[countryCode] || countryCode;
  };

  const getCompanyTypeDisplay = (type) => {
    const types = {
      'startup': 'Startup',
      'enterprise': 'Enterprise',
      'consulting': 'Consulting',
      'government': 'Government'
    };
    return types[type] || type;
  };

  const getIndustryDisplay = (industry) => {
    const industries = {
      'technology': 'Technology',
      'finance': 'Finance',
      'healthcare': 'Healthcare',
      'manufacturing': 'Manufacturing'
    };
    return industries[industry] || industry;
  };

  const getFormCompletionPercentage = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'companyName', 'jobTitle', 'country', 'companyType', 'industry'];
    const filledFields = requiredFields.filter(field => formData[field] && formData[field].trim() !== '');
    const workshopsSelected = selectedWorkshops.length > 0;
    const totalRequired = requiredFields.length + 1; 
    const totalFilled = filledFields.length + (workshopsSelected ? 1 : 0);
    return Math.round((totalFilled / totalRequired) * 100);
  };

  const completionPercentage = getFormCompletionPercentage();

  if (!showDetailedInfo) {
    return (
      <div className="order-1 lg:order-2 w-full lg:w-[40%] bg-white border border-gray-200 rounded-lg shadow-lg self-start lg:mt-8 relative overflow-hidden">
        <div
          className="p-8 relative bg-cover bg-no-repeat justify-center lg:h-[5rem]"
          style={{
            backgroundImage: `url(${sidebarTop})`,
          }}
        >
          <img
            src={sidebarInside}
            alt="Center"
            className="absolute left-1/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain w-40 h-40 lg:w-[17rem]"
          />
        </div>

        <div className="px-6 pt-6">
          <div className="bg-green-600 text-white px-4 py-3 rounded text-center font-bold text-sm">
            Registration Information 1
          </div>
        </div>

        <div className="p-6 text-center space-y-4">
          <div className="text-lg font-medium text-gray-500 uppercase mb-2 opacity-45">
            FORM PROGRESS
          </div>
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-600 mt-2 font-medium">
              {completionPercentage}% Complete
            </div>
          </div>

          <div className="pt-6">
            <div className="text-lg font-medium text-gray-500 uppercase mb-2 opacity-45">
              BADGE CATEGORY
            </div>
            <div className="text-2xl font-bold text-gray-800">VISITOR</div>
          </div>
        </div>

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
  }

  return (
    <div className="order-1 lg:order-2 w-full lg:w-[40%] bg-white border border-gray-200 rounded-lg shadow-lg self-start lg:mt-8 relative overflow-hidden">
      <div
        className="p-8 relative bg-cover bg-no-repeat justify-center lg:h-[5rem]"
        style={{
          backgroundImage: `url(${sidebarTop})`,
        }}
      >
        <img
          src={sidebarInside}
          alt="Center"
          className="absolute left-1/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain w-40 h-40 lg:w-[17rem]"
        />
      </div>

      <div className="px-6 pt-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded text-center font-bold text-sm flex items-center justify-center gap-2">
          <CheckCircle className="w-4 h-4" />
          Registration Complete
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide border-b border-gray-200 pb-2">
            Personal Information
          </h3>
          
          <div className="flex items-start gap-3">
            <User className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium text-gray-500 uppercase">Full Name</div>
              <div className="text-sm text-gray-800 font-medium truncate">
                {formData.firstName && formData.lastName 
                  ? `${formData.firstName} ${formData.lastName}` 
                  : 'Not provided'}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium text-gray-500 uppercase">Email</div>
              <div className="text-sm text-gray-800 font-medium truncate">
                {formData.email || 'Not provided'}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium text-gray-500 uppercase">Mobile</div>
              <div className="text-sm text-gray-800 font-medium truncate">
                {formData.mobileNumber || 'Not provided'}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium text-gray-500 uppercase">Country</div>
              <div className="text-sm text-gray-800 font-medium">
                {formData.country ? getCountryName(formData.country) : 'Not provided'}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4 space-y-3">
          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide border-b border-green-200 pb-2">
            Professional Information
          </h3>
          
          <div className="flex items-start gap-3">
            <Building className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium text-gray-500 uppercase">Company</div>
              <div className="text-sm text-gray-800 font-medium">
                {formData.companyName || 'Not provided'}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Briefcase className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium text-gray-500 uppercase">Job Title</div>
              <div className="text-sm text-gray-800 font-medium">
                {formData.jobTitle || 'Not provided'}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Globe className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium text-gray-500 uppercase">Industry</div>
              <div className="text-sm text-gray-800 font-medium">
                {formData.industry ? getIndustryDisplay(formData.industry) : 'Not provided'}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Building className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium text-gray-500 uppercase">Company Type</div>
              <div className="text-sm text-gray-800 font-medium">
                {formData.companyType ? getCompanyTypeDisplay(formData.companyType) : 'Not provided'}
              </div>
            </div>
          </div>
        </div>

        {selectedWorkshops.length > 0 && (
          <div className="bg-green-50 rounded-lg p-4 space-y-3">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide border-b border-green-200 pb-2">
              Selected Solutions ({selectedWorkshops.length})
            </h3>
            <div className="space-y-2">
              {selectedWorkshops.slice(0, 3).map((workshop, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-xs text-gray-700 font-medium">{workshop.name}</span>
                </div>
              ))}
              {selectedWorkshops.length > 3 && (
                <div className="text-xs text-green-600 font-medium pl-4">
                  +{selectedWorkshops.length - 3} more selected
                </div>
              )}
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-4 text-center">
          <div className="text-xs font-medium uppercase opacity-75 mb-1">Badge Category</div>
          <div className="text-xl font-bold">VISITOR</div>
        </div>

        <button
          onClick={() => setCurrentStep(1)}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2"
        >
          <Edit3 className="w-4 h-4" />
          Edit Registration Details
        </button>
      </div>

      <div className="absolute bottom-0 right-0 w-16 h-16 opacity-5">
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

const Sidebar = () => {
  return <RegistrationSidebar />;
};

export default Sidebar;