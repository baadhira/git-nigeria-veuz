import React, { useState } from "react";
import headerBg from "../assets/images/register-header.png";
import { useProgressBarContext } from "../context/ProgressBarContext";
import { ChevronDown, User, Check,AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import formBackground from "../assets/images/form-background.png";
import Steps from "./Steps/Steps";

const ApplyingPromoCode = () => {
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToDataUse, setAgreedToDataUse] = useState(false);
  // const { currentStep, setCurrentStep, steps,formData, setFormData ,selectedWorkshops, setSelectedWorkshops} = useProgressBarContext();
  const [showTermsError, setShowTermsError] = useState(false);
  const [showDataUseError, setShowDataUseError] = useState(false);
  const originalPrice = 60.99;
  const premiumTicketPrice = 50.0;
  const { currentStep, setCurrentStep, steps } = useProgressBarContext();
  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      setAppliedPromo({
        code: promoCode,
        description: `Promo code '${promoCode}' applied successfully! Applied to 2 festival ground tickets!`,
        discount: 10.0,
        ticketDiscount: "EUR 10.00 (inc. VAT)",
        savings: "EUR 10.00 - You save 10.00!",
      });
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode("");
  };

  const calculateTotal = () => {
    let total = originalPrice;
    if (appliedPromo) {
      total -= appliedPromo.discount;
    }
    return total;
  };
  const handleNext=()=>{
    // if (currentStep < 4) {
    //   setCurrentStep(currentStep + 1);
    // } else if (currentStep === 4) {
    //   navigate("/success");
    // }
    
    // Reset error states
    setShowTermsError(false);
    setShowDataUseError(false);

    // Check validation
    let hasErrors = false;

    if (!agreedToTerms) {
      setShowTermsError(true);
      hasErrors = true;
    }

    if (!agreedToDataUse) {
      setShowDataUseError(true);
      hasErrors = true;
    }

    // If no errors, proceed to next step
    if (!hasErrors) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      } else if (currentStep === 4) {
        navigate("/success");
      }
    }
  
    
  }
  const handleTermsChange = (e) => {
    setAgreedToTerms(e.target.checked);
    if (e.target.checked) {
      setShowTermsError(false);
    }
  };

  const handleDataUseChange = (e) => {
    setAgreedToDataUse(e.target.checked);
    if (e.target.checked) {
      setShowDataUseError(false);
    }
  };
  React.useEffect(()=>{
    if(agreedToTerms && agreedToDataUse){
      setCurrentStep(currentStep + 1);
      window.scrollTo(0,0);
    }
  },[agreedToTerms , agreedToDataUse])

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Green Pixelated Section */}
      <div
        className="bg-gradient-to-r from-lime-400 to-green-500 p-14 flex justify-between items-center flex-shrink-0 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url(${headerBg})`,
        }}
      ></div>
      <div
        style={{
          backgroundImage: `url(${formBackground})`,
        }}
      >
        {/* Step Indicator */}
        <Steps />
        {/* <div className="p-4 md:p-8 mb-0">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => {
              const isCompleted = step.number < currentStep;
              const isCurrent = step.number === currentStep;

              return (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-bold border-2 transition-all duration-300 ${
                      isCompleted
                        ? "bg-green-600 text-white border-green-600"
                        : isCurrent
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-white text-gray-500 border-gray-300"
                    }`}
                  >
                    {isCompleted ? (
                      <Check size={16} className="w-4 h-4" />
                    ) : (
                      step.number
                    )}
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 mx-2 md:mx-4 rounded-full transition-all duration-300
                ${
                  isCompleted
                    ? "w-16 md:w-32 bg-green-600"
                    : isCurrent
                    ? "w-16 md:w-32 bg-gradient-to-r from-green-600 to-gray-300"
                    : "w-16 md:w-32 bg-gray-300"
                }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div> */}
        {/* <div className="bg-white py-4">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

        {/* Main Content */}
        <div className="flex-1 px-4 py-6 ">
          <div className="max-w-6xl mx-auto">
            {/* Registration Summary Header */}
            <div className="bg-green-700 text-white px-6 py-4 rounded-t-lg">
              <h2 className="text-xl font-semibold">Registration Summary</h2>
            </div>

            {/* Content Card */}
            <div className="bg-white border border-gray-200 rounded-b-lg p-6">
              {/* Premium Ticket Section */}
              <div className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      PREMIUM TICKET x 2
                    </h3>
                    {!appliedPromo && (
                      <p className="text-sm text-gray-600">
                        Student Ticket Access On Day 3 Only
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    {!appliedPromo ? (
                      <p className="font-semibold">EUR 60.99</p>
                    ) : (
                      <div>
                        <p className="text-green-600 font-semibold">
                          FREE (10%)
                        </p>
                        <p className="text-sm text-green-600">Free for you!</p>
                      </div>
                    )}
                  </div>
                </div>

                {appliedPromo && (
                  <p className="text-sm text-gray-600 mb-4">
                    Student Ticket Access On Day 3 Only
                  </p>
                )}
              </div>

              {/* Promo Code Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Have a promo code?
                </label>

                {!appliedPromo ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter promo code"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="bg-[linear-gradient(90deg,_#9F1413_0%,_#000000_100%)] text-white px-4 py-2 rounded font-medium transition-colors"
                    >
                      APPLY
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={appliedPromo.code}
                        readOnly
                        className="flex-1 border border-gray-300 rounded px-3 py-2 bg-gray-50"
                      />
                      <button
                        onClick={handleApplyPromo}
                        className="bg-[linear-gradient(90deg,_#9F1413_0%,_#000000_100%)] text-white px-4 py-2 rounded font-medium transition-colors"
                      >
                        APPLY
                      </button>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded p-3">
                      <p className="text-green-700 text-sm font-medium">
                        {appliedPromo.description}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <div>
                          <p className="text-sm text-gray-600 font-medium">
                            Promo code applied:{" "}
                            <span className="font-medium text-green-600">
                              {appliedPromo.code}
                            </span>
                          </p>
                          <p className="text-sm text-gray-600 font-medium">
                            Promo code applied:{" "}
                            <span className="font-medium text-green-600">
                              EUR 10.00 (inc. VAT)
                            </span>
                          </p>
                          <p className="text-sm text-gray-600 font-medium">
                            Applied to: 
                            <span className="font-medium text-green-600">
                            2 festival ground tickets
                            </span>
                          </p>
                        </div>
                        <button
                          onClick={handleRemovePromo}
                          className="bg-white border border-red-300 text-red-600 px-3 py-1 rounded text-sm hover:bg-red-50 transition-colors"
                        >
                          REMOVE
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Total Section */}
              {appliedPromo && (
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-lg">
                    Student Ticket Access On Day 3 Only{" "}
                  </span>

                  <span className="font-semibold text-lg">
                    EUR 50 40 SUBJECT TO APPROVAL Incl. 19%{" "}
                  </span>
                </div>
              )}
              <div className="border-t pt-4 mb-6">
                <div
                  className={
                    !appliedPromo
                      ? "text-right"
                      : "flex justify-between items-center mb-2"
                  }
                >
                  <span className="font-semibold text-lg">
                    Total:{" "}
                    {appliedPromo && (
                      <span className="text-gray-400 line-through text-m">
                        {originalPrice}&nbsp;
                      </span>
                    )}
                    EUR {calculateTotal().toFixed(2)}
                  </span>
                  {appliedPromo && (
                    <div className="text-right">
                      <button className="border-2 border-black text-black px-4 py-2 rounded font-medium transition-colors mr-2">
                        BACK
                      </button>
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium transition-colors">
                        NEXT
                      </button>
                    </div>
                  )}
                </div>
                {appliedPromo && (
                  <p className="text-right text-green-600 font-medium">
                    You save!
                  </p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={handleTermsChange}
                    className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded accent-green-700"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-700 leading-relaxed"
                  >
                    I have read and accept the{" "}
                    <a
                      href="https://gitexafrica.com/terms-and-conditions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 underline cursor-pointer"
                    >
                      terms and conditions
                    </a>
                    ,{" "}
                    <a
                      href="https://gitexafrica.com/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 underline cursor-pointer"
                    >
                      Privacy Policy
                      </a>
                    , and consent that attendees under the age of 21 will not be
                    admitted, and admission to the exhibition is restricted to
                    trade and business professionals only, and students above 18
                    and below 18 can attend only if accompanied by school or
                    faculty member.
                  </label>
                </div>
                {showTermsError && (
                      <div className="flex items-center text-red">
                        <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0 text-red-500" />
                        <span className="text-red-500">Please accept the terms and conditions to continue.</span>
                      </div>
                    )}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="dataUse"
                    checked={agreedToDataUse}
                    onChange={handleDataUseChange}
                    className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded accent-green-700"
                  />
                  <label
                    htmlFor="dataUse"
                    className="text-sm text-gray-700 leading-relaxed"
                  >
                    I hereby consent the use of my data by the organiser,
                    exhibitors and sponsors of QWTC & KAOUN International to
                    delivering services and for marketing purposes. I am aware
                    that I can object to the sending of newsletters at any time.
                  </label>
                </div>
                {showDataUseError && (
                      <div className="flex items-center text-red">
                        <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0 text-red-500" />
                        <span className="text-red-500">Please consent to data use to continue.</span>
                      </div>
                    )}
              </div>

              {/* Action Buttons */}
              {/* {!appliedPromo && ( */}
              <div className="flex justify-center space-x-4">
                <button
                  className="bg-[linear-gradient(90deg,_#5C2F66_0%,_#25102C_100%)] text-white px-6 py-2 rounded font-medium transition-colors"
                  onClick={() => {
                    setCurrentStep(currentStep - 1);
                    // if (currentStep < 4 || currentStep === 4) {
                    //   setCurrentStep(currentStep - 1);
                    //   navigate('/register-form')
                    // }
                    navigate("/register-form");
                    window.scrollTo(0,0);
                  }}
                >
                  PREVIOUS
                </button>
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  // disabled={!agreedToTerms || !agreedToDataUse}
                  onClick={handleNext}
                >
                  NEXT
                </button>
              </div>
              {/* )} */}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Green Pixelated Section */}
      <div
        className="bg-gradient-to-r from-lime-400 to-green-500 bg-cover bg-center bg-no-repeat relative py-14"
        style={{
          backgroundImage: `url(${headerBg})`,
        }}
      ></div>
    </div>
  );
};

export default ApplyingPromoCode;
