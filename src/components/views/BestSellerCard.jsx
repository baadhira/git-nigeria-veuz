import React from "react";

const BestSellerCard = () => {
  return (
    <div className="flex justify-center items-center">
    <div className="top-3 relative w-[300px] bg-[#2c0b0e] rounded-xl text-white overflow-hidden shadow-lg p-5 font-sans">
      {/* BEST SELLER Ribbon */}
      <div className="absolute top-2 -left-9 transform -rotate-45 bg-green-500 text-white font-bold text-xs px-6 py-1 shadow-md z-10">
        <h3>BEST SELLER</h3>
        
      </div>

      {/* Header */}
      <h3 className="text-sm text-yellow-400 font-semibold uppercase mb-1">
        Visitor 3 Day Access Ticket
      </h3>
      <a
        href="#"
        className="text-green-400 text-xs font-medium mb-3 inline-block"
      >
        VIEW DETAILS →
      </a>

      {/* Description */}
      <p className="text-sm text-white mb-4 leading-relaxed">
        Visitor Passes provide{" "}
        <span className="text-green-400 font-semibold">3 DAYS ACCESS</span> to
        GITEX NIGERIA exhibition and all free conference
      </p>

      {/* Feature List */}
      <ul className="space-y-2 text-sm mb-4">
        <li className="flex items-center">✅ Access to ConneXions & Investor Lounge</li>
        <li className="flex items-center">✅ Network Events</li>
        <li className="flex items-center">✅ All Conference Tracks</li>
        <li className="flex items-center">✅ All Masterclasses</li>
        <li className="flex items-center">✅ 3 Days Access to the Show</li>
        <li className="flex items-center">✅ Access to Dubai Internet City Lounge</li>
      </ul>

      {/* Footer */}
      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-white">
          FREE<br />
          <span className="text-xs text-gray-300">INCL. 10% VAT</span>
        </span>
        <button className="bg-white text-black px-4 py-2 text-sm font-semibold rounded hover:bg-gray-200">
          BUY NOW
        </button>
      </div>
    </div>
    </div>
  );
};

export default BestSellerCard;