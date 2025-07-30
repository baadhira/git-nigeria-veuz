import { AlertCircle } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import formBackground from "../../assets/images/form-background.png";
import headerBg from "../../assets/images/register-header.png";
import { useProgressBarContext } from "../../context/ProgressBarContext";
import Steps from "../Steps/Steps";

const ApplyingPromoCode = () => {
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToDataUse, setAgreedToDataUse] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const [showDataUseError, setShowDataUseError] = useState(false);
  
  const { currentStep, setCurrentStep, steps, totalBuyPrice, totalQuantity } = useProgressBarContext();
  console.log(totalBuyPrice,'totalBuyPrice')
  console.log(totalQuantity,'totalQuantity')
  const originalPrice = totalBuyPrice || 0; 
  const quantity = totalQuantity || 0; 
  
  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      const discountPercentage = 15; 
      const discountAmount = (originalPrice * discountPercentage) / 100;
      
      setAppliedPromo({
        code: promoCode,
        description: `Promo code '${promoCode}' applied successfully! Applied to ${quantity} lowest-priced tickets!`,
        discount: discountAmount,
        discountPercentage: discountPercentage,
        ticketDiscount: `${discountPercentage}% (EUR ${discountAmount.toFixed(2)} incl. VAT)`,
        savings: `EUR ${discountAmount.toFixed(2)} - You save ${discountAmount.toFixed(2)}!`,
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
    return Math.max(0, total);
  };

  const calculateDiscountedPrice = () => {
    if (appliedPromo) {
      return originalPrice - appliedPromo.discount;
    }
    return originalPrice;
  };

  const handleNext = () => {
    setShowTermsError(false);
    setShowDataUseError(false);

    let hasErrors = false;

    if (!agreedToTerms) {
      setShowTermsError(true);
      hasErrors = true;
    }

    if (!agreedToDataUse) {
      setShowDataUseError(true);
      hasErrors = true;
    }

    if (!hasErrors) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      } else if (currentStep === 4) {
        navigate("/success");
      }
    }
  };

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

  React.useEffect(() => {
    if (agreedToTerms && agreedToDataUse) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  }, [agreedToTerms, agreedToDataUse]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
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
        <Steps />

        <div className="flex-1 px-4 py-6 ">
          <div className="max-w-6xl mx-auto">
            <div className="bg-green-700 text-white px-6 py-4 rounded-t-lg">
              <h2 className="text-xl font-semibold">Registration Summary</h2>
            </div>

            <div className="bg-white border border-gray-200 rounded-b-lg p-6">
              <div className={`${appliedPromo ? 'bg-green-50 border-l-4 border-green-500' : ''} mb-6`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-800 ml-2">
                      PREMIUM TICKET x {quantity}
                    </h3>
                    {!appliedPromo && (
                      <p className="text-sm text-gray-600 ml-2">
                        Student Ticket Access On Day 3 Only
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    {!appliedPromo ? (
                      <p className="font-semibold">EUR {originalPrice.toFixed(2)}</p>
                    ) : (
                      <div>
                        <p className="text-[#898787] font-semibold line-through">
                          EUR {originalPrice.toFixed(2)}
                        </p>
                        <p className="text-green-600 font-semibold">
                          EUR {calculateDiscountedPrice().toFixed(2)}{" "}
                          <span className="text-sm text-white w-20 h-3 bg-green-700 rounded p-1 ">
                            -{appliedPromo.discountPercentage}%
                          </span>
                          <span className="text-[#898787] font-semibold "> Incl. 19% VAT</span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

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
                      <p className="text-green-600 text-sm font-medium">
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
                            Discount:{" "}
                            <span className="font-medium text-green-600">
                              {appliedPromo.ticketDiscount}
                            </span>
                          </p>
                          <p className="text-sm text-gray-600 font-medium">
                            Applied to:{" "}
                            <span className="font-medium text-green-600">
                              {quantity} lowest-priced tickets
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

              {appliedPromo && (
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-lg">
                    Student Ticket Access On Day 3 Only{" "}
                  </span>
                  <span className="font-semibold text-lg">
                    EUR {calculateDiscountedPrice().toFixed(2)} SUBJECT TO APPROVAL Incl. 19%{" "}
                  </span>
                </div>
              )}

              <div className="border-t pt-4 mb-6">
                <div className={!appliedPromo ? "text-right" : "flex justify-between items-center mb-2"}>
                  <span className="font-semibold text-lg">
                    Total:{" "}
                    {appliedPromo && (
                      <span className="text-gray-400 line-through text-m mr-2">
                        EUR {originalPrice.toFixed(2)}&nbsp;
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
                    You save EUR {appliedPromo.discount.toFixed(2)}!
                  </p>
                )}
              </div>

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

              <div className="flex justify-center space-x-4">
                <button
                  className="bg-[linear-gradient(90deg,_#5C2F66_0%,_#25102C_100%)] text-white px-6 py-2 rounded font-medium transition-colors"
                  onClick={() => {
                    setCurrentStep(2);
                    navigate("/register-form");
                    window.scrollTo(0, 0);
                  }}
                >
                  PREVIOUS
                </button>
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleNext}
                >
                  NEXT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

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