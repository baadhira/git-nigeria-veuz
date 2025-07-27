import React, { useState } from 'react';

const TicketCard = ({ 
  bgColor, 
  headerColor, 
  isExclusive = false, 
  price = "FREE", 
  originalPrice = null 
}) => {
  const [quantity, setQuantity] = useState(25);

  const features = [
    { text: "Access to ConneXions & Investor Lounge", included: true },
    { text: "Network Events", included: true },
    { text: "All Conference Tracks", included: true },
    { text: "All Masterclasses", included: true },
    { text: "3 Days Access to the Show", included: true },
    { text: "Access to Dubai Internet City Lounge", included: !isExclusive }
  ];

  return (
    <div className="relative w-80 bg-white rounded-2xl overflow-visible shadow-xl">
      {/* Exclusive Badge - Triangle with rounded corners and shadow */}
      {isExclusive && (
        <div className="absolute -top-1 -left-1 z-20">
          {/* Triangle using clip-path with shadow */}
          <div 
            className="w-20 h-20 flex items-center justify-center shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              clipPath: 'polygon(0 0, 100% 0, 0 100%)',
              borderRadius: '8px 0 0 0',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
            }}
          >
            <div className="absolute top-2 left-1 text-white text-sm font-bold transform -rotate-45 whitespace-nowrap">
              EXCLUSIVE
            </div>
          </div>
        </div>
      )}
      
      {/* Header Section */}
      <div className={`${headerColor} text-white p-6 pb-12 relative rounded-t-2xl`}>
        <div className="mt-2">
          <h2 className="text-lg font-bold mb-2">VISITOR 3 DAY ACCESS TICKET</h2>
          <button className="text-yellow-300 text-sm font-medium hover:underline">
            VIEW DETAILS →
          </button>
        </div>
        
        <div className="mt-4">
          <p className="text-sm mb-4">
            Visitor Passes provide <span className="text-green-400 font-bold">3 DAYS ACCESS</span> to GITEX<br/>
            NIGERIA exhibition and all free conference
          </p>
        </div>
        
        {/* Logos */}
        <div className="flex items-center space-x-4 mt-4">
          <div className="text-white">
            <div className="text-2xl font-bold">GITEX</div>
            <div className="text-xs opacity-80">Nigeria</div>
          </div>
          <div className="text-white">
            <div className="text-xl font-bold">Ai</div>
            <div className="text-[10px] opacity-80">EVERYTHING</div>
            <div className="text-[10px] opacity-80">SUMMIT</div>
          </div>
        </div>
      </div>
      
      {/* Semicircular cuts */}
      <div className="absolute left-0 top-52 w-8 h-8 bg-gray-100 rounded-r-full transform -translate-x-4"></div>
      <div className="absolute right-0 top-52 w-8 h-8 bg-gray-100 rounded-l-full transform translate-x-4"></div>
      
      {/* Content Section */}
      <div className="bg-gray-900 text-white p-6 pt-8 rounded-b-2xl">
        {/* Features List */}
        <div className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                feature.included ? 'bg-green-500' : 'bg-gray-600'
              }`}>
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className={`text-sm ${feature.included ? 'text-white' : 'text-gray-500'}`}>
                {feature.text}
              </span>
            </div>
          ))}
        </div>
        
        {/* Price and Purchase Section */}
        <div className="flex items-end justify-between mt-8">
          <div>
            <div className="text-xl font-bold text-white">{price}</div>
            <div className="text-xs text-gray-400">INCL. 19% VAT</div>
          </div>
          
          <button className="bg-white text-black px-6 py-2 rounded font-bold hover:bg-gray-100 transition-colors text-sm">
            BUY NOW
          </button>
        </div>
        
        {/* Quantity selector for other cards */}
        {!isExclusive && originalPrice && (
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <span className="text-red-400 line-through text-sm">USD {originalPrice}</span>
              <span className="text-xs text-gray-300">32.5</span>
            </div>
            <div className="flex items-center border border-gray-600 rounded">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 text-white hover:bg-gray-700"
              >
                -
              </button>
              <span className="px-4 py-1 text-white bg-gray-800">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 text-white hover:bg-gray-700"
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Badgewithfontsizelarge = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex flex-wrap gap-8 justify-center">
        {/* Purple Card */}
        <TicketCard 
          headerColor="bg-purple-600"
          bgColor="bg-gray-900"
          originalPrice="67"
        />
        
        {/* Orange Card */}
        <TicketCard 
          headerColor="bg-orange-600"
          bgColor="bg-gray-900"
        />
        
        {/* Green Exclusive Card */}
        <TicketCard 
          headerColor="bg-green-700"
          bgColor="bg-gray-900"
          isExclusive={true}
        />
      </div>
    </div>
  );
};

export default Badgewithfontsizelarge;