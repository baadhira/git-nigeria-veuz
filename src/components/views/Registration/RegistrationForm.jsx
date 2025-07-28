import {
  AlertCircle,
  CheckCircle,
  ChevronDown,
  Edit3
} from "lucide-react";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import formBackground from "../../assets/images/form-background.png";
import gitexLogo from "../../assets/images/gitexnigeria.png";
import loginImg from "../../assets/images/login.png";
import headerBg from "../../assets/images/register-header.png";
import { useProgressBarContext } from "../../context/ProgressBarContext";
import Steps from "../Steps/Steps";
import WorkshopSelector from "../Workshop/WorkshopSelector";
import Sidebar from "./RegistrationSidebar";

const validators = {
  required: (value) => {
    if (!value || (typeof value === "string" && !value.trim())) {
      return "This field is required";
    }
    return null;
  },

  email: (value) => {
    if (!value) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }
    return null;
  },
  
  selectedWorkshopsValidation: (selectedWorkshops) => {
    if (!selectedWorkshops || selectedWorkshops.length === 0) {
      return 'Please select at least one solution/product';
    }
    if (selectedWorkshops.length > 5) {
      return 'Maximum 5 solutions/products can be selected';
    }
    return null;
  },
  
  emailMatch: (email, confirmEmail) => {
    if (!confirmEmail) return "Email addresses do not match";
    if (email !== confirmEmail) {
      return "Email addresses do not match";
    }
    return null;
  },

  name: (value) => {
    if (!value) return null;
    if (value.length < 2) {
      return "Name must be at least 2 characters long";
    }
    if (!/^[a-zA-Z\s'-]+$/.test(value)) {
      return "Name can only contain letters, spaces, hyphens, and apostrophes";
    }
    return null;
  },

  phone: (value) => {
    if (!value) return null;
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    if (!phoneRegex.test(value) || value.replace(/\D/g, "").length < 10) {
      return "Please enter a valid phone number";
    }
    return null;
  },

  companyName: (value) => {
    if (!value) return null;
    if (value.length < 2) {
      return "Company name must be at least 2 characters long";
    }
    return null;
  },

  jobTitle: (value) => {
    if (!value) return null;
    if (value.length < 2) {
      return "Job title must be at least 2 characters long";
    }
    return null;
  },

  workshopSelection: (workshops) => {
    const selectedCount = Object.values(workshops).filter(Boolean).length;
    if (selectedCount === 0) {
      return "Please select at least one workshop";
    }
    if (selectedCount > 6) {
      return "Maximum 6 workshops can be selected";
    }
    return null;
  },
};

const validationRules = {
  firstName: [validators.required, validators.name],
  lastName: [validators.required, validators.name],
  country: [validators.required],
  email: [validators.required, validators.email],
  confirmEmail: [
    (value, formData) => validators.emailMatch(formData.email, value),
  ],
  mobileNumber: [validators.required, validators.phone],
  companyName: [validators.required, validators.companyName],
  jobTitle: [validators.required, validators.jobTitle],
  companyType: [validators.required],
  industry: [validators.required],
  workshops: [validators.workshopSelection],
  selectedWorkshops: [validators.selectedWorkshopsValidation]
};

export default function RegistrationForm() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentStep, setCurrentStep, steps, formData, setFormData, selectedWorkshops, setSelectedWorkshops } = useProgressBarContext();

  const isReadOnly = currentStep > 1

  const validateField = (fieldName, value, formData = null) => {
    const rules = validationRules[fieldName];
    if (!rules) return null;

    for (const rule of rules) {
      let error;
      if (fieldName === 'selectedWorkshops') {
        error = rule(value);
      } else {
        error = rule(value, formData || formData);
      }
      if (error) return error;
    }
    return null;
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(validationRules).forEach((fieldName) => {
      let value = formData[fieldName];
      
      if (fieldName === 'selectedWorkshops') {
        value = selectedWorkshops;
      }
      
      const error = validateField(fieldName, value, formData);
      if (error) {
        newErrors[fieldName] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    if (isReadOnly) return; 

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }

    if (touched[field]) {
      const error = validateField(field, value, {
        ...formData,
        [field]: value,
      });
      setErrors((prev) => ({
        ...prev,
        [field]: error,
      }));
    }
  };

  const handleFieldBlur = (fieldName) => {
    if (isReadOnly) return;

    setTouched((prev) => ({
      ...prev,
      [fieldName]: true,
    }));

    const error = validateField(fieldName, formData[fieldName], formData);
    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  const handleWorkshopChange = (workshop) => {
    if (isReadOnly) return;

    const newWorkshops = {
      ...formData.workshops,
      [workshop]: !formData.workshops[workshop],
    };

    setFormData((prev) => ({
      ...prev,
      workshops: newWorkshops,
    }));

    if (touched.workshops) {
      const error = validateField("workshops", newWorkshops);
      setErrors((prev) => ({
        ...prev,
        workshops: error,
      }));
    }
  };

  useEffect(() => {
    if (touched.selectedWorkshops) {
      const error = validateField('selectedWorkshops', selectedWorkshops);
      setErrors(prev => ({
        ...prev,
        selectedWorkshops: error
      }));
    }
  }, [selectedWorkshops, touched.selectedWorkshops]);

  const handleNext = async () => {
    if (isReadOnly) {
      if (currentStep < 2) {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      } else if (currentStep === 2) {
        navigate("/promo-code");
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const allTouched = {};
      Object.keys(validationRules).forEach((field) => {
        allTouched[field] = true;
      });
      setTouched(allTouched);

      const isValid = validateForm();

      if (!isValid) {
        const firstErrorField = Object.keys(errors)[0];
        if (firstErrorField) {
          const element = document.querySelector(
            `[data-field="${firstErrorField}"]`
          );
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            element.focus();
          }
        }
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (currentStep < 2) {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      } else if (currentStep === 2) {
        navigate("/promo-code");
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleEdit = () => {
    setCurrentStep(1);
    window.scrollTo(0, 0);
  };

  const getFieldState = (fieldName) => {
    const hasError = errors[fieldName];
    const isValid = touched[fieldName] && !hasError && formData[fieldName];

    let baseClassName = `w-full p-2 md:p-3 border rounded focus:ring-2 focus:border-transparent text-sm md:text-base transition-colors appearance-none`;
    
    if (isReadOnly) {
      baseClassName += ` bg-gray-100 text-gray-700 cursor-not-allowed`;
    } else {
      baseClassName += ` ${
        hasError
          ? "border-red-500 focus:ring-red-500 bg-red-50"
          : isValid
          ? "border-green-500 focus:ring-green-500 bg-green-50"
          : "border-gray-300 focus:ring-green-500"
      }`;
    }

    return {
      hasError,
      isValid,
      className: baseClassName,
    };
  };

  const ErrorTooltip = ({ error, show }) => {
    if (!error || !show || isReadOnly) return null;
    return (
      <div className="absolute top-full left-0 right-0 z-10 transform">
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

  const ErrorIcon = ({ error, show }) => {
    if (!error || !show || isReadOnly) return null;
    return (
      <div className="absolute right-8 md:right-9 top-2 md:top-3">
        <AlertCircle className="w-4 h-4 md:w-5 md:w-5 text-red-500" />
      </div>
    );
  };

  const SuccessIndicator = ({ show }) => {
    if (!show || isReadOnly) return null;
    return (
      <div className="absolute right-2 md:right-3 top-2 md:top-3">
        <CheckCircle className="w-4 h-4 md:w-5 md:w-5 text-green-500" />
      </div>
    );
  };

  const getFormProgress = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "country",
      "email",
      "confirmEmail",
      "mobileNumber",
      "companyName",
      "jobTitle",
      "companyType",
      "industry",
    ];
    const filledFields = requiredFields.filter(
      (field) => formData[field] && !errors[field]
    );
    const workshopsValid = !validateField("workshops", formData.workshops);

    const totalRequired = requiredFields.length + 1;
    const totalFilled = filledFields.length + (workshopsValid ? 1 : 0);

    return Math.round((totalFilled / totalRequired) * 100);
  };

  const formProgress = getFormProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-green-100 to-green-50 relative">
      {console.log(currentStep,'currentStep in reg from')}
      {console.log(errors, "errorserrors")}
      <div
        className="bg-gradient-to-r from-lime-400 to-green-500 p-14 flex justify-between items-center flex-shrink-0 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url(${headerBg})`,
        }}
      >
        <img
          src={loginImg}
          alt="Center"
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain w-40 h-40"
        />
      </div>
      <div
        style={{
          backgroundImage: `url(${formBackground})`,
        }}
      >
        <Steps />

        <div className="max-w-7xl mx-auto border border-green/100 rounded-lg shadow-lg">
          <div className="bg-white overflow-hidden py-2 w-full">
            <div className="flex flex-col lg:flex-row gap-6 px-4 md:px-6 lg:px-8">
              <div className="order-2 lg:order-1 w-full lg:w-[70%] flex flex-col gap-4 lg:gap-2">
                <div className="flex-1 bg-white rounded-lg shadow p-2 md:p-8">
                  <div className="bg-[linear-gradient(90deg,_#299D3F_0%,_#123F22_100%)] relative overflow-hidden lg:mb-10">
                    <div className="z-10 flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-6 px-6 py-4 text-white">
                      <div className="flex items-center gap-3">
                        <h2 className="text-lg md:text-xl font-bold text-white py-1 md:py-1 rounded text-left md:text-left">
                          Registration Information 1
                        </h2>
                        {isReadOnly && (
                          <button
                            onClick={handleEdit}
                            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                            Edit
                          </button>
                        )}
                      </div>
                      <div className="bg-green-700 text-white px-3 md:px-4 py-2 rounded text-xs md:text-sm text-center border border-white/40">
                        PREMIUM TICKET - FREE Incl. 19% VAT
                      </div>
                    </div>
                  </div>

                  {isReadOnly && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-green-500">
                            Form completed successfully. Click "Edit" to make changes or "Next" to continue.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-6 mb-6 md:mb-8">
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
                            onChange={(e) =>
                              handleInputChange("firstName", e.target.value)
                            }
                            onBlur={() => handleFieldBlur("firstName")}
                            className={getFieldState("firstName").className}
                            placeholder="Enter your first name"
                            readOnly={isReadOnly}
                            disabled={isReadOnly}
                          />
                          <SuccessIndicator
                            show={getFieldState("firstName").isValid}
                          />
                          <ErrorIcon
                            error={errors.firstName}
                            show={touched.firstName}
                          />
                          <ErrorTooltip
                            error={errors.firstName}
                            show={touched.firstName}
                          />
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
                            onBlur={() => handleFieldBlur("country")}
                            className={getFieldState("country").className}
                            disabled={isReadOnly}
                          >
                            <option value="">Please Select</option>
                            <option value="us">United States</option>
                            <option value="uk">United Kingdom</option>
                            <option value="in">India</option>
                            <option value="de">Germany</option>
                          </select>
                          {!isReadOnly && (
                            <ChevronDown className="absolute right-2 md:right-3 top-2 md:top-3 h-4 w-4 md:h-5 md:w-5 text-gray-400 pointer-events-none" />
                          )}
                          <SuccessIndicator
                            show={getFieldState("country").isValid}
                          />
                          <ErrorIcon
                            error={errors.country}
                            show={touched.country}
                          />
                          <ErrorTooltip
                            error={errors.country}
                            show={touched.country}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            onBlur={() => handleFieldBlur("email")}
                            className={getFieldState("email").className}
                            placeholder="Enter your email address"
                            readOnly={isReadOnly}
                            disabled={isReadOnly}
                          />
                          <SuccessIndicator
                            show={getFieldState("email").isValid}
                          />
                          <ErrorIcon
                            error={errors.email}
                            show={touched.email}
                          />
                          <ErrorTooltip
                            error={errors.email}
                            show={touched.email}
                          />
                        </div>
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
                            className={`w-full p-2 md:p-3 border rounded focus:ring-2 focus:border-transparent text-sm md:text-base transition-colors appearance-none ${
                              isReadOnly 
                                ? "bg-gray-100 text-gray-700 cursor-not-allowed border-gray-300" 
                                : "border-gray-300 focus:ring-green-500"
                            }`}
                            disabled={isReadOnly}
                          >
                            <option value="">Please Select</option>
                            <option value="us">American</option>
                            <option value="uk">British</option>
                            <option value="in">Indian</option>
                            <option value="de">German</option>
                          </select>
                          {!isReadOnly && (
                            <ChevronDown className="absolute right-2 md:right-3 top-2 md:top-3 h-4 w-4 md:h-5 md:w-5 text-gray-400 pointer-events-none" />
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            data-field="companyName"
                            value={formData.companyName}
                            onChange={(e) =>
                              handleInputChange("companyName", e.target.value)
                            }
                            onBlur={() => handleFieldBlur("companyName")}
                            className={getFieldState("companyName").className}
                            placeholder="Enter your company name"
                            readOnly={isReadOnly}
                            disabled={isReadOnly}
                          />
                          <SuccessIndicator
                            show={getFieldState("companyName").isValid}
                          />
                          <ErrorIcon
                            error={errors.companyName}
                            show={touched.companyName}
                          />
                          <ErrorTooltip
                            error={errors.companyName}
                            show={touched.companyName}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company type <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            data-field="companyType"
                            value={formData.companyType}
                            onChange={(e) =>
                              handleInputChange("companyType", e.target.value)
                            }
                            onBlur={() => handleFieldBlur("companyType")}
                            className={`${
                              getFieldState("companyType").className
                            } appearance-none`}
                            disabled={isReadOnly}
                          >
                            <option value="">Please Select</option>
                            <option value="startup">Startup</option>
                            <option value="enterprise">Enterprise</option>
                            <option value="consulting">Consulting</option>
                            <option value="government">Government</option>
                          </select>
                          {!isReadOnly && (
                            <ChevronDown className="absolute right-10 md:right-11 top-2 md:top-3 h-4 w-4 md:h-5 md:w-5 text-gray-400 pointer-events-none" />
                          )}
                          <SuccessIndicator
                            show={getFieldState("companyType").isValid}
                          />
                          <ErrorIcon
                            error={errors.companyType}
                            show={touched.companyType}
                          />
                          <ErrorTooltip
                            error={errors.companyType}
                            show={touched.companyType}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            data-field="lastName"
                            value={formData.lastName}
                            onChange={(e) =>
                              handleInputChange("lastName", e.target.value)
                            }
                            onBlur={() => handleFieldBlur("lastName")}
                            className={getFieldState("lastName").className}
                            placeholder="Enter your last name"
                            readOnly={isReadOnly}
                            disabled={isReadOnly}
                          />
                          <SuccessIndicator
                            show={getFieldState("lastName").isValid}
                          />
                          <ErrorIcon
                            error={errors.lastName}
                            show={touched.lastName}
                          />
                          <ErrorTooltip
                            error={errors.lastName}
                            show={touched.lastName}
                          />
                        </div>
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
                            className={`w-full p-2 md:p-3 border rounded focus:ring-2 focus:border-transparent text-sm md:text-base transition-colors appearance-none ${
                              isReadOnly 
                                ? "bg-gray-100 text-gray-700 cursor-not-allowed border-gray-300" 
                                : "border-gray-300 focus:ring-green-500"
                            }`}
                            disabled={isReadOnly}
                          >
                            <option value="">Please Select</option>
                            <option value="north">North</option>
                            <option value="south">South</option>
                            <option value="east">East</option>
                            <option value="west">West</option>
                          </select>
                          {!isReadOnly && (
                            <ChevronDown className="absolute right-2 md:right-3 top-2 md:top-3 h-4 w-4 md:h-5 md:w-5 text-gray-400 pointer-events-none" />
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm Email address{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            data-field="confirmEmail"
                            value={formData.confirmEmail}
                            onChange={(e) =>
                              handleInputChange("confirmEmail", e.target.value)
                            }
                            onBlur={() => handleFieldBlur("confirmEmail")}
                            className={getFieldState("confirmEmail").className}
                            placeholder="Confirm your email address"
                            readOnly={isReadOnly}
                            disabled={isReadOnly}
                          />
                          <SuccessIndicator
                            show={getFieldState("confirmEmail").isValid}
                          />
                          <ErrorIcon
                            error={errors.confirmEmail}
                            show={touched.confirmEmail}
                          />
                          <ErrorTooltip
                            error={errors.confirmEmail}
                            show={touched.confirmEmail}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mobile number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          {isReadOnly ? (
                            <input
                              type="text"
                              value={formData.mobileNumber}
                              className={getFieldState("mobileNumber").className}
                              readOnly={true}
                              disabled={true}
                            />
                          ) : (
                            <PhoneInput
                              country={"us"}
                              inputStyle={{ width: "100%", height: "inherit" }}
                              buttonStyle={{ backgroundColor: "#e0e0e0" }}
                              value={formData.mobileNumber}
                              onChange={(phone) =>
                                handleInputChange("mobileNumber", phone)
                              }
                              inputProps={{
                                name: "mobileNumber",
                                required: true,
                                autoFocus: true,
                              }}
                              className="phone-input"
                            />
                          )}
                          <SuccessIndicator
                            show={getFieldState("mobileNumber").isValid}
                          />
                          <ErrorIcon
                            error={errors.mobileNumber}
                            show={touched.mobileNumber}
                          />
                          <ErrorTooltip
                            error={errors.mobileNumber}
                            show={touched.mobileNumber}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Job title <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            data-field="jobTitle"
                            value={formData.jobTitle}
                            onChange={(e) =>
                              handleInputChange("jobTitle", e.target.value)
                            }
                            onBlur={() => handleFieldBlur("jobTitle")}
                            className={getFieldState("jobTitle").className}
                            placeholder="Enter your job title"
                            readOnly={isReadOnly}
                            disabled={isReadOnly}
                          />
                          <SuccessIndicator
                            show={getFieldState("jobTitle").isValid}
                          />
                          <ErrorIcon
                            error={errors.jobTitle}
                            show={touched.jobTitle}
                          />
                          <ErrorTooltip
                            error={errors.jobTitle}
                            show={touched.jobTitle}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Industry <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            data-field="industry"
                            value={formData.industry}
                            onChange={(e) =>
                              handleInputChange("industry", e.target.value)
                            }
                            onBlur={() => handleFieldBlur("industry")}
                            className={`${
                              getFieldState("industry").className
                            } appearance-none`}
                            disabled={isReadOnly}
                          >
                            <option value="">Please Select</option>
                            <option value="technology">Technology</option>
                            <option value="finance">Finance</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="manufacturing">Manufacturing</option>
                          </select>
                          {!isReadOnly && (
                            <ChevronDown className="absolute right-10 md:right-11 top-2 md:top-3 h-4 w-4 md:h-5 md:w-5 text-gray-400 pointer-events-none" />
                          )}
                          <SuccessIndicator
                            show={getFieldState("industry").isValid}
                          />
                          <ErrorIcon
                            error={errors.industry}
                            show={touched.industry}
                          />
                          <ErrorTooltip
                            error={errors.industry}
                            show={touched.industry}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6 md:mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
                      <label className="block text-sm font-medium text-gray-700">
                        What products & services are you interested in?{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="flex flex-col">
                        <button
                          onClick={() => {
                            if (!isReadOnly) {
                              setShowModal(true);
                              setTouched(prev => ({
                                ...prev,
                                selectedWorkshops: true
                              }));
                            }
                          }}
                          className={`px-3 md:px-4 py-2 rounded text-xs md:text-sm self-start md:self-auto transition-colors ${
                            isReadOnly 
                              ? "bg-gray-400 text-gray-200 cursor-not-allowed" 
                              : "bg-red-700 bg-[linear-gradient(90deg,_#AB0202_0%,_#240102_100%)] text-white hover:opacity-90"
                          }`}
                          disabled={isReadOnly}
                        >
                          {isReadOnly ? "VIEW" : "SELECT"}{" "}
                          <span className="font-bold">SOLUTIONS/PRODUCTS</span>
                        </button>
                        
                        {errors.selectedWorkshops && touched.selectedWorkshops && !isReadOnly && (
                          <div className="flex items-center mt-2">
                            <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0 text-red-500" />
                            <span className="text-red-500 text-xs">{errors.selectedWorkshops}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-800 mb-2">
                        Main Categories
                      </h4>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {selectedWorkshops.map((topic, index) => (
                          <button
                            key={index}
                            className="bg-[#5E3169] text-white lg:px-4 lg:py-2 rounded-full lg:text-sm w-full cursor-default sm:px-1 sm:py-1 sm:text-xs rounded-full "
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
                            className={`flex items-start space-x-3 text-xs md:text-sm ${
                              isReadOnly ? "cursor-not-allowed opacity-75" : "cursor-pointer"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={formData.workshops[workshop]}
                              onChange={() => {
                                handleWorkshopChange(workshop);
                                if (!touched.workshops) {
                                  setTouched((prev) => ({
                                    ...prev,
                                    workshops: true,
                                  }));
                                }
                              }}
                              className={`w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-0.5 flex-shrink-0 accent-green-700 ${
                                isReadOnly ? "cursor-not-allowed" : ""
                              }`}
                              disabled={isReadOnly}
                            />
                            <span className="text-gray-700 leading-tight">
                              {workshop}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {errors.workshops && !isReadOnly && (
                      <div className="flex items-center text-red">
                        <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0 text-red-500" />
                        <span className="text-red-500">{errors.workshops}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <Sidebar />
            </div>
          </div>
        </div>
        
        <div className="w-full flex justify-center mt-6 mb-6 gap-2">
          {currentStep > 1 && (
            <button
              onClick={handlePrevious}
              className="bg-[linear-gradient(90deg,_#5C2F66_0%,_#25102C_100%)] text-white px-6 md:px-8 py-2 md:py-3 rounded font-bold transition-colors text-sm md:text-base hover:opacity-90"
            >
              PREVIOUS
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={isSubmitting && !isReadOnly}
            className={`px-6 md:px-8 py-2 md:py-3 rounded font-bold transition-colors text-sm md:text-base ${
              isSubmitting && !isReadOnly
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {isSubmitting && !isReadOnly ? "PROCESSING..." : "NEXT"}
          </button>
        </div>
        
        <div
          className="bg-gradient-to-r from-lime-400 to-green-500 bg-cover bg-center bg-no-repeat relative py-4"
          style={{
            backgroundImage: `url(${headerBg})`,
          }}
        >
          <div className="relative z-10 flex flex-col items-center justify-center text-white px-4">
            <img
              src={gitexLogo}
              alt="Gitex Logo"
              className="w-24 md:w-50 mb-4"
            />

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
      
      {showModal && !isReadOnly && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] shadow-lg relative">
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
                            