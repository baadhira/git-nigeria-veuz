import React, { useState } from "react";
import { ChevronDown, User, Check, AlertCircle, CheckCircle } from "lucide-react";
import headerBg from "../assets/images/register-header.png";
import loginImg from "../assets/images/login.png";
import { useNavigate } from "react-router-dom";
import gitexLogo from "../assets/images/gitexnigeria.png";
import formBackground from "../assets/images/form-background.png";
import WorkshopSelector from "./WorkshopSelector";
import { useProgressBarContext } from "../context/ProgressBarContext";
import Steps from "./Steps/Steps";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
const validators = {
  required: (value) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return 'This field is required';
    }
    return null;
  },
  
  email: (value) => {
    if (!value) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  },
  
  emailMatch: (email, confirmEmail) => {
    if (!confirmEmail) return null;
    if (email !== confirmEmail) {
      return 'Email addresses do not match';
    }
    return null;
  },
  
  name: (value) => {
    if (!value) return null;
    if (value.length < 2) {
      return 'Name must be at least 2 characters long';
    }
    if (!/^[a-zA-Z\s'-]+$/.test(value)) {
      return 'Name can only contain letters, spaces, hyphens, and apostrophes';
    }
    return null;
  },
  
  phone: (value) => {
    if (!value) return null;
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10) {
      return 'Please enter a valid phone number';
    }
    return null;
  },
  
  companyName: (value) => {
    if (!value) return null;
    if (value.length < 2) {
      return 'Company name must be at least 2 characters long';
    }
    return null;
  },
  
  jobTitle: (value) => {
    if (!value) return null;
    if (value.length < 2) {
      return 'Job title must be at least 2 characters long';
    }
    return null;
  },
  
  workshopSelection: (workshops) => {
    const selectedCount = Object.values(workshops).filter(Boolean).length;
    if (selectedCount === 0) {
      return 'Please select at least one workshop';
    }
    if (selectedCount > 6) {
      return 'Maximum 6 workshops can be selected';
    }
    return null;
  }
};
const validationRules = {
  firstName: [validators.required, validators.name],
  lastName: [validators.required, validators.name],
  country: [validators.required],
  email: [validators.required, validators.email],
  confirmEmail: [(value, formData) => validators.emailMatch(formData.email, value)],
  mobileNumber: [validators.required, validators.phone],
  companyName: [validators.required, validators.companyName],
  jobTitle: [validators.required, validators.jobTitle],
  companyType: [validators.required],
  industry: [validators.required],
  workshops: [validators.workshopSelection]
};
export default function RegistrationForm() {
  const navigate = useNavigate();
  const [selectedWorkshops, setSelectedWorkshops] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    region: "",
    email: "",
    confirmEmail: "",
    nationality: "",
    mobileNumber: "",
    companyName: "",
    jobTitle: "",
    companyType: "",
    industry: "",
    workshops: {
      "Global Leaders Forum !NEW (3 Days)": false,
      "GITEX Main Stage": false,
      "Artificial Intelligence & Robotics (15)": false,
      "Future Health !NEW (2 Days)": false,
      "Cybersecurity (4 Days)": false,
      "Future Health !NEW (2 Days) - Copy": false,
      "Digital Cities (1 Day)": false,
      "Edtech (1 Day)": false,
      "Energy Transition (1 Day)": false,
      "Intelligent Connectivity (1 Day)": false,
      "Digital Finance (1 Day)": false,
      "Future Mobility (1 Day)": false,
    },
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentStep, setCurrentStep, steps } = useProgressBarContext();
  // const handleInputChange = (field, value) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [field]: value,
  //   }));
  // };
  const topics = [
    "Artificial Intelligence & Robotics",
    "Cybersecurity",
    "AI Everything",
    "Digital Finance",
  ];

  // const handleWorkshopChange = (workshop) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     workshops: {
  //       ...prev.workshops,
  //       [workshop]: !prev.workshops[workshop],
  //     },
  //   }));
  // };
  const validateField = (fieldName, value, formData = null) => {
    const rules = validationRules[fieldName];
    if (!rules) return null;

    for (const rule of rules) {
      const error = rule(value, formData || formData);
      if (error) return error;
    }
    return null;
  };
  // const currentStep = 1;
  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(validationRules).forEach(fieldName => {
      const error = validateField(fieldName, formData[fieldName], formData);
      if (error) {
        newErrors[fieldName] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }

    // Validate field in real-time if it was touched
    if (touched[field]) {
      const error = validateField(field, value, { ...formData, [field]: value });
      setErrors(prev => ({
        ...prev,
        [field]: error
      }));
    }
  };
  const handleFieldBlur = (fieldName) => {
    setTouched(prev => ({
      ...prev,
      [fieldName]: true
    }));

    const error = validateField(fieldName, formData[fieldName], formData);
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  };
  const handleWorkshopChange = (workshop) => {
    const newWorkshops = {
      ...formData.workshops,
      [workshop]: !formData.workshops[workshop],
    };

    setFormData((prev) => ({
      ...prev,
      workshops: newWorkshops,
    }));

    // Validate workshop selection
    if (touched.workshops) {
      const error = validateField('workshops', newWorkshops);
      setErrors(prev => ({
        ...prev,
        workshops: error
      }));
    }
  };
  const handleNext = async () => {
    setIsSubmitting(true);
    
    try {
      // Mark all fields as touched to show validation errors
      const allTouched = {};
      Object.keys(validationRules).forEach(field => {
        allTouched[field] = true;
      });
      setTouched(allTouched);

      const isValid = validateForm();
      
      if (!isValid) {
        // Scroll to first error
        const firstErrorField = Object.keys(errors)[0];
        if (firstErrorField) {
          const element = document.querySelector(`[data-field="${firstErrorField}"]`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.focus();
          }
        }
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to next step
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
      
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const getFieldState = (fieldName) => {
    const hasError = errors[fieldName];
    const isValid = touched[fieldName] && !hasError && formData[fieldName];
    
    return {
      hasError,
      isValid,
      className: `w-full p-2 md:p-3 border rounded focus:ring-2 focus:border-transparent text-sm md:text-base transition-colors ${
        hasError 
          ? 'border-red-500 focus:ring-red-500 bg-red-50' 
          : isValid 
            ? 'border-green-500 focus:ring-green-500 bg-green-50'
            : 'border-gray-300 focus:ring-green-500'
      }`
    };
  };
  // Error tooltip component
  const ErrorTooltip = ({ error, show }) => {
    if (!error || !show) return null;
    return (
      <div className="absolute top-full left-0 right-0 z-10 mt-1 transform">
        <div className="bg-red-600 text-white px-3 py-2 rounded-lg shadow-lg text-xs relative">
          <div className="absolute -top-1 left-4 w-2 h-2 bg-red-600 transform rotate-45"></div>
          <div className="flex items-center">
            <AlertCircle className="w-3 h-3 mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        </div>
      </div>
    );
  };

  // Error icon component for input fields
  const ErrorIcon = ({ error, show }) => {
    if (!error || !show) return null;
    return (
      <div className="absolute right-8 md:right-9 top-2 md:top-3">
        <AlertCircle className="w-4 h-4 md:w-5 md:w-5 text-red-500" />
      </div>
    );
  };

  // Success indicator component
  const SuccessIndicator = ({ show }) => {
    if (!show) return null;
    return (
      <div className="absolute right-2 md:right-3 top-2 md:top-3">
        <CheckCircle className="w-4 h-4 md:w-5 md:w-5 text-green-500" />
      </div>
    );
  };

  // Form progress indicator
  const getFormProgress = () => {
    const requiredFields = ['firstName', 'lastName', 'country', 'email', 'mobileNumber', 'companyName', 'jobTitle', 'companyType', 'industry'];
    const filledFields = requiredFields.filter(field => formData[field] && !errors[field]);
    const workshopsValid = !validateField('workshops', formData.workshops);
    
    const totalRequired = requiredFields.length + 1; // +1 for workshops
    const totalFilled = filledFields.length + (workshopsValid ? 1 : 0);
    
    return Math.round((totalFilled / totalRequired) * 100);
  };

  const formProgress = getFormProgress();
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-green-100 to-green-50 relative">
      {console.log(errors,'errorserrors')}
      <div
        className="bg-gradient-to-r from-lime-400 to-green-500 p-14 flex justify-between items-center flex-shrink-0 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url(${headerBg})`,
        }}
      >
        <img
          src={loginImg}
          alt="Center"
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain  w-40 h-40"
        />
      </div>
      <div
        style={{
          backgroundImage: `url(${formBackground})`,
        }}
      >
        {/* Header with steps */}

        <Steps />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto border border-green/100 rounded-lg shadow-lg">
          <div className="bg-white overflow-hidden py-2 w-full">
            {/* rounded-lg shadow-lg */}
            <div className="flex flex-col lg:flex-row gap-6 px-4 md:px-6 lg:px-8">
              {/* flex flex-col lg:flex-row gap-4 lg:gap-16 items-start justify-center */}
              <div className="w-full lg:w-[70%] flex flex-col gap-4 lg:gap-2">
                {/* flex flex-col lg:flex-col gap-4 lg:gap-2 items-start justify-center */}
                {/* Form Content */}
                <div className="flex-1 bg-white rounded-lg shadow p-2 md:p-8">
                  {/* Header */}
                  {/* <div className="w-full flex flex-col md:flex-row md:items-center justify-between  md:mb-8 gap-4 ">
                <h2 className="text-lg md:text-xl font-bold text-white bg-green-600 px-4 md:px-6 py-2 md:py-3 rounded text-center md:text-left">
                  Registration Information 1
                </h2>
                <div className="bg-green-700 text-white px-3 md:px-4 py-2 rounded text-xs md:text-sm font-medium text-center">
                  PREMIUM TICKET - FREE Incl. 19% VAT
                </div>
              </div> */}
                  <div className="bg-[linear-gradient(90deg,_#299D3F_0%,_#123F22_100%)] relative overflow-hidden lg:mb-10">
                    <div className="z-10 flex justify-between gap-6 px-6 py-4 text-white">
                      <h2 className="text-lg md:text-xl font-bold text-white py-1 md:py-1 rounded text-left md:text-left">
                        Registration Information 1
                      </h2>
                      <div className="bg-green-700 text-white px-3 md:px-4 py-2 rounded text-xs md:text-sm text-center border border-white/40">
                        PREMIUM TICKET - FREE Incl. 19% VAT
                      </div>
                    </div>
                  </div>
                  {/* <div className="w-full flex flex-col md:flex-row-reverse md:items-center justify-between mb-6 md:mb-8 gap-4">
                <h2 className="text-lg md:text-xl font-bold text-white bg-green-600 px-4 md:px-6 py-2 md:py-3 rounded text-center md:text-left">
                  Registration Information 1
                </h2>
                <div className="bg-green-700 text-white px-3 md:px-4 py-2 rounded text-xs md:text-sm font-medium text-center">
                  PREMIUM TICKET - FREE Incl. 19% VAT
                </div>
              </div> */}

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-6 mb-6 md:mb-8">
                    {/* Left Column */}
                    <div className="space-y-4 md:space-y-6">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        data-field="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        onBlur={() => handleFieldBlur("firstName")}
                        className={getFieldState("firstName").className}
                        placeholder="Enter your first name"
                      />
                      <SuccessIndicator show={getFieldState("firstName").isValid} />
                      <ErrorIcon error={errors.firstName} show={touched.firstName} />
                      <ErrorTooltip error={errors.firstName} show={touched.firstName} />
                    </div>
                  </div>


                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country of residence{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={formData.country}
                            onChange={(e) =>
                              handleInputChange("country", e.target.value)
                            }
                            className="w-full p-2 md:p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white text-gray-400 text-sm md:text-base"
                          >
                            <option value="">Please Select</option>
                            <option value="us">United States</option>
                            <option value="uk">United Kingdom</option>
                            <option value="in">India</option>
                            <option value="de">Germany</option>
                          </select>
                          <ChevronDown className="absolute right-2 md:right-3 top-2 md:top-3 h-4 w-4 md:h-5 md:w-5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="w-full p-2 md:p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nationality
                        </label>
                        <div className="relative">
                          <select
                            value={formData.nationality}
                            onChange={(e) =>
                              handleInputChange("nationality", e.target.value)
                            }
                            className="w-full p-2 md:p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white text-gray-400 text-sm md:text-base"
                          >
                            <option value="">Please Select</option>
                            <option value="us">American</option>
                            <option value="uk">British</option>
                            <option value="in">Indian</option>
                            <option value="de">German</option>
                          </select>
                          <ChevronDown className="absolute right-2 md:right-3 top-2 md:top-3 h-4 w-4 md:h-5 md:w-5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={(e) =>
                            handleInputChange("companyName", e.target.value)
                          }
                          className="w-full p-2 md:p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company type <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={formData.companyType}
                            onChange={(e) =>
                              handleInputChange("companyType", e.target.value)
                            }
                            className="w-full p-2 md:p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white text-gray-400 text-sm md:text-base"
                          >
                            <option value="">Please Select</option>
                            <option value="startup">Startup</option>
                            <option value="enterprise">Enterprise</option>
                            <option value="consulting">Consulting</option>
                            <option value="government">Government</option>
                          </select>
                          <ChevronDown className="absolute right-2 md:right-3 top-2 md:top-3 h-4 w-4 md:h-5 md:w-5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4 md:space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          className="w-full p-2 md:p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Region
                        </label>
                        <div className="relative">
                          <select
                            value={formData.region}
                            onChange={(e) =>
                              handleInputChange("region", e.target.value)
                            }
                            className="w-full p-2 md:p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white text-gray-400 text-sm md:text-base"
                          >
                            <option value="">Please Select</option>
                            <option value="north">North</option>
                            <option value="south">South</option>
                            <option value="east">East</option>
                            <option value="west">West</option>
                          </select>
                          <ChevronDown className="absolute right-2 md:right-3 top-2 md:top-3 h-4 w-4 md:h-5 md:w-5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm Email address
                        </label>
                        <input
                          type="email"
                          value={formData.confirmEmail}
                          onChange={(e) =>
                            handleInputChange("confirmEmail", e.target.value)
                          }
                          className="w-full p-2 md:p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mobile number <span className="text-red-500">*</span>
                        </label>
        
                        <PhoneInput
                          country={"us"}
                          inputStyle={{ width: "100%", height: "inherit" }}
                          buttonStyle={{ backgroundColor: "#e0e0e0" }}
                          value={formData.mobileNumber} // Make sure this matches your form state
                          onChange={(phone) => handleInputChange("mobileNumber", phone)} // Adjusting to call handleInputChange correctly
                          inputProps={{
                            name: "mobileNumber",
                            required: true,
                            autoFocus: true,
                          }}
                          className="phone-input"
                        />

                        {/* <div className="flex">
                          <div className="relative">
                            <select className="w-16 md:w-20 p-2 md:p-3 border border-r-0 border-gray-300 rounded-l focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white appearance-none text-sm md:text-base">
                              <option value="+234">🇳🇬</option>
                              <option value="+1">🇺🇸</option>
                              <option value="+44">🇬🇧</option>
                              <option value="+91">🇮🇳</option>
                            </select>
                            <span className="absolute right-1 top-2 md:top-3 text-xs text-gray-600">
                              +234
                            </span>
                          </div>
                          <input
                            type="tel"
                            value={formData.mobileNumber}
                            onChange={(e) =>
                              handleInputChange("mobileNumber", e.target.value)
                            }
                            className="flex-1 p-2 md:p-3 border border-gray-300 rounded-r focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                          />
                        </div> */}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Job title <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.jobTitle}
                          onChange={(e) =>
                            handleInputChange("jobTitle", e.target.value)
                          }
                          className="w-full p-2 md:p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Industry <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={formData.industry}
                            onChange={(e) =>
                              handleInputChange("industry", e.target.value)
                            }
                            className="w-full p-2 md:p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white text-gray-400 text-sm md:text-base"
                          >
                            <option value="">Please Select</option>
                            <option value="technology">Technology</option>
                            <option value="finance">Finance</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="manufacturing">Manufacturing</option>
                          </select>
                          <ChevronDown className="absolute right-2 md:right-3 top-2 md:top-3 h-4 w-4 md:h-5 md:w-5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Workshop Selection */}
                  <div className="mb-6 md:mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
                      <label className="block text-sm font-medium text-gray-700">
                        What products & services are you interested in?{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <button
                        onClick={() => setShowModal(true)}
                        className="bg-red-700 bg-[linear-gradient(90deg,_#AB0202_0%,_#240102_100%)] text-white px-3 md:px-4 py-2 rounded text-xs md:text-sm  self-start md:self-auto"
                      >
                        SELECT{" "}
                        <span className="font-bold">SOLUTIONS/PRODUCTS</span>
                      </button>
                    </div>
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-800 mb-2">
                        Main Categories
                      </h4>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {selectedWorkshops.map((topic, index) => (
                          <button
                            key={index}
                            className="bg-[#5E3169] text-white px-4 py-2 rounded-full text-sm w-full"
                          >
                            {topic?.name}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-800 mb-3 text-sm md:text-base">
                        Select Workshop{" "}
                        <span className="text-gray-500">
                          (Maximum 6 can Select)
                        </span>
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        {Object.keys(formData.workshops).map((workshop) => (
                          <label
                            key={workshop}
                            className="flex items-start space-x-3 text-xs md:text-sm"
                          >
                            <input
                              type="checkbox"
                              checked={formData.workshops[workshop]}
                              onChange={() => handleWorkshopChange(workshop)}
                              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-0.5 flex-shrink-0 accent-green-700"
                            />
                            <span className="text-gray-700 leading-tight">
                              {workshop}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Next Button */}
                </div>
              </div>
              {/* Sidebar */}
              {/* p-4 */}
              <div className="w-full lg:w-[40%] bg-green-600 text-white rounded-lg shadow md:p-6 relative overflow-hidden self-start max-h-[400px] lg:mt-8">
                {/* GITEX Header */}
                <div className="mb-6 md:mb-8">
                  <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-start gap-2 lg:gap-3 mb-4">
                    <div className="flex items-center gap-2 lg:gap-3">
                      <div className="text-xl md:text-2xl font-bold">GITEX</div>
                      <div className="bg-white text-green-600 px-2 py-1 rounded text-xs font-bold">
                        Ai
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <User className="w-3 h-3 md:w-4 md:h-4" />
                      <span>NETODA CROWN</span>
                    </div>
                  </div>
                  <div className="text-xs opacity-75 mb-3 md:mb-4">
                    14-18 OCT 2024 - ABU DHABI - UAE
                  </div>

                  <div className="bg-green-700 rounded px-3 py-2 text-center text-xs md:text-sm font-bold mb-3 md:mb-4">
                    Registration Information 1
                  </div>
                </div>

                {/* Registration Details */}
                <div className="space-y-1 md:space-y-2 text-xs md:text-sm opacity-75 mb-6 md:mb-8">
                  <div>FULL NAME</div>
                  <div>JOB TITLE</div>
                  <div>COMPANY NAME</div>
                  <div>COUNTRY OF RESIDENCE</div>
                </div>

                {/* Badge Category */}
                <div className="text-center">
                  <div className="text-xs md:text-sm opacity-75 mb-2">
                    BADGE CATEGORY
                  </div>
                  <div className="text-xl md:text-2xl font-bold">VISITOR</div>
                </div>

                {/* Decorative pixels */}
                <div className="absolute bottom-0 right-0 w-24 h-24 md:w-32 md:h-32 opacity-20">
                  <div className="grid grid-cols-6 md:grid-cols-8 gap-1 h-full">
                    {[...Array(36)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-green-400 w-full h-full opacity-60"
                      ></div>
                    ))}
                    {[...Array(28)].map((_, i) => (
                      <div
                        key={i + 36}
                        className="bg-green-500 w-full h-full opacity-80 hidden md:block"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center mt-6 mb-6 gap-2">
          {currentStep > 1 && (
            <button
              onClick={() => {
                if (currentStep < 4) {
                  setCurrentStep(currentStep - 1);
                }
                // else{
                //   setCurrentStep(currentStep - 1);
                // }
              }}
              className="bg-[linear-gradient(90deg,_#5C2F66_0%,_#25102C_100%)] text-white px-6 md:px-8 py-2 md:py-3 rounded font-bold transition-colors text-sm md:text-base"
            >
              PREVIOUS
            </button>
          )}
          <button
            // onClick={() => {
            //   if (currentStep < 4) {
            //     setCurrentStep(currentStep + 1);
            //   } else if (currentStep === 4) {
            //     navigate("/promo-code");
            //   }
            // }}
            onClick={handleNext}
            disabled={isSubmitting}
            className="bg-green-600 text-white px-6 md:px-8 py-2 md:py-3 rounded font-bold hover:bg-green-700 transition-colors text-sm md:text-base"
          >
            NEXT
          </button>
        </div>
        <div
          className="bg-gradient-to-r from-lime-400 to-green-500 bg-cover bg-center bg-no-repeat relative py-4"
          style={{
            backgroundImage: `url(${headerBg})`,
          }}
        >
          <div className="relative z-10 flex flex-col items-center justify-center text-white px-4">
            {/* ✅ Your Logo Image Here */}
            <img
              src={gitexLogo}
              alt="Gitex Logo"
              className="w-24 md:w-50 mb-4"
            />

            {/* Social Icons */}
            <div className="flex gap-2 md:gap-4">
              {["f", "t", "@", "in", "▶"].map((icon, i) => (
                <div
                  key={i}
                  className="w-6 h-6 md:w-8 md:h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all cursor-pointer"
                >
                  <span className="text-xs md:text-sm font-bold">{icon}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] shadow-lg relative">
            {/* overflow-y-auto */}
            <WorkshopSelector
              onClose={() => setShowModal(false)}
              selectedWorkshops={selectedWorkshops}
              setSelectedWorkshops={setSelectedWorkshops}
            />
          </div>
        </div>
      )}
    </div>
  );
}
