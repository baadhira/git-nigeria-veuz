import React, { useState } from 'react';

const ApplyingPromoCode = () => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToDataUse, setAgreedToDataUse] = useState(false);

  const originalPrice = 60.99;
  const premiumTicketPrice = 50.00;

  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      // Simulate promo code validation
      setAppliedPromo({
        code: promoCode,
        description: `Promo code '${promoCode}' applied successfully! Applied to 2 festival ground tickets!`,
        discount: 10.00,
        ticketDiscount: 'EUR 10.00 (inc. VAT)',
        savings: 'EUR 10.00 - You save 10.00!'
      });
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
  };

  const calculateTotal = () => {
    let total = originalPrice;
    if (appliedPromo) {
      total -= appliedPromo.discount;
    }
    return total;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Green Pixelated Section */}
      <div className="relative h-16 md:h-20 bg-gradient-to-r from-lime-400 via-green-500 to-green-600 overflow-hidden">
        <div className="absolute inset-0">
          {/* Pixelated effect */}
          <div className="absolute top-0 right-0 w-6 h-6 bg-lime-300 opacity-80"></div>
          <div className="absolute top-2 right-6 w-4 h-4 bg-green-400 opacity-90"></div>
          <div className="absolute top-0 right-12 w-3 h-3 bg-lime-500"></div>
          <div className="absolute top-4 right-16 w-6 h-6 bg-green-300 opacity-70"></div>
          <div className="absolute top-6 right-3 w-4 h-4 bg-lime-400 opacity-85"></div>
          <div className="absolute top-8 right-9 w-3 h-3 bg-green-500 opacity-95"></div>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="bg-white py-4">
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
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-6">
        <div className="max-w-4xl mx-auto">
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
                  <h3 className="font-semibold text-gray-800">PREMIUM TICKET x 2</h3>
                  {!appliedPromo && (
                    <p className="text-sm text-gray-600">Student Ticket Access On Day 3 Only</p>
                  )}
                </div>
                <div className="text-right">
                  {!appliedPromo ? (
                    <p className="font-semibold">EUR 60.99</p>
                  ) : (
                    <div>
                      <p className="text-green-600 font-semibold">FREE (10%)</p>
                      <p className="text-sm text-green-600">Free for you!</p>
                    </div>
                  )}
                </div>
              </div>
              
              {appliedPromo && (
                <p className="text-sm text-gray-600 mb-4">Student Ticket Access On Day 3 Only</p>
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
                    className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded font-medium transition-colors"
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
                      className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded font-medium transition-colors"
                    >
                      APPLY
                    </button>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded p-3">
                    <p className="text-green-700 text-sm">{appliedPromo.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        <p className="text-sm text-gray-600">Promo code applied: <span className="font-medium">{appliedPromo.code}</span></p>
                        <p className="text-sm text-gray-600">Promo code applied: <span className="font-medium">EUR 10.00 (inc. VAT)</span></p>
                        <p className="text-sm text-green-600 font-medium">Applied to: 2 festival ground tickets</p>
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
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-lg">Total: EUR {calculateTotal().toFixed(2)}</span>
                {appliedPromo && (
                  <div className="text-right">
                    <button className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded font-medium transition-colors mr-2">
                      BACK
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium transition-colors">
                      NEXT
                    </button>
                  </div>
                )}
              </div>
              {appliedPromo && (
                <p className="text-right text-green-600 font-medium">You save!</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
                  I have read and accept the{' '}
                  <span className="text-red-600 underline cursor-pointer">terms and conditions</span>,{' '}
                  <span className="text-red-600 underline cursor-pointer">Privacy Policy</span>, and consent that attendees under the age of 21 will not be admitted, and admission to the exhibition is restricted to trade and business professionals only, and students above 18 and below 18 can attend only if accompanied by school or faculty member.
                </label>
              </div>
              
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="dataUse"
                  checked={agreedToDataUse}
                  onChange={(e) => setAgreedToDataUse(e.target.checked)}
                  className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="dataUse" className="text-sm text-gray-700 leading-relaxed">
                  I hereby consent the use of my data by the organiser, exhibitors and sponsors of QWTC & KAOUN International to delivering services and for marketing purposes. I am aware that I can object to the sending of newsletters at any time.
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            {!appliedPromo && (
              <div className="flex justify-center space-x-4">
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded font-medium transition-colors">
                  PREVIOUS
                </button>
                <button 
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!agreedToTerms || !agreedToDataUse}
                >
                  NEXT
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Green Pixelated Section */}
      <div className="relative h-16 md:h-20 bg-gradient-to-r from-green-600 via-green-500 to-lime-400 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-lime-300 opacity-80"></div>
          <div className="absolute bottom-2 right-6 w-4 h-4 bg-green-400 opacity-90"></div>
          <div className="absolute bottom-0 right-12 w-3 h-3 bg-lime-500"></div>
          <div className="absolute bottom-4 right-16 w-6 h-6 bg-green-300 opacity-70"></div>
          <div className="absolute bottom-6 right-3 w-4 h-4 bg-lime-400 opacity-85"></div>
          <div className="absolute bottom-8 right-9 w-3 h-3 bg-green-500 opacity-95"></div>
        </div>
      </div>
    </div>
  );
};

export default ApplyingPromoCode;