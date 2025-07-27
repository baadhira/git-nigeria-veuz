import React from 'react';

const TicketCard = ({ 
  headerColor, 
  headerBg, 
  title, 
  badge = null, 
  description, 
  features, 
  price, 
  originalPrice = null,
  currency = "USD",
  priceNote,
  buttonText = "BUY NOW",
  backgroundImage = null
}) => {
  return (
    <div className="relative w-80 h-96 rounded-xl overflow-hidden shadow-lg">
      {/* Badge */}
      {badge && (
        <div className={`absolute top-4 left-4 ${badge.bg} text-white px-2 py-1 rounded text-xs font-bold z-20 transform -rotate-12`}>
          {badge.text}
        </div>
      )}
      
      {/* Header */}
      <div className={`${headerBg} ${headerColor} px-6 py-4 relative z-10 overflow-hidden`}>
        {/* Decorative Pixel Background */}
        <div className="absolute inset-0 opacity-20">
          {/* Large pixels */}
          <div className="absolute top-2 right-4 w-3 h-3 bg-white opacity-60"></div>
          <div className="absolute top-6 right-8 w-2 h-2 bg-white opacity-40"></div>
          <div className="absolute top-1 right-12 w-4 h-4 bg-white opacity-30"></div>
          <div className="absolute top-5 right-16 w-2 h-2 bg-white opacity-50"></div>
          <div className="absolute top-8 right-2 w-3 h-3 bg-white opacity-35"></div>
          <div className="absolute top-3 right-20 w-2 h-2 bg-white opacity-45"></div>
          
          {/* Medium pixels */}
          <div className="absolute top-7 right-24 w-2 h-2 bg-white opacity-25"></div>
          <div className="absolute top-0 right-28 w-3 h-3 bg-white opacity-40"></div>
          <div className="absolute top-4 right-32 w-2 h-2 bg-white opacity-35"></div>
          
          {/* Small pixels */}
          <div className="absolute top-2 right-36 w-1 h-1 bg-white opacity-30"></div>
          <div className="absolute top-6 right-40 w-1 h-1 bg-white opacity-25"></div>
          <div className="absolute top-9 right-44 w-1 h-1 bg-white opacity-40"></div>
          
          {/* Left side pixels */}
          <div className="absolute top-1 left-2 w-2 h-2 bg-white opacity-20"></div>
          <div className="absolute top-5 left-6 w-3 h-3 bg-white opacity-30"></div>
          <div className="absolute top-8 left-1 w-2 h-2 bg-white opacity-25"></div>
        </div>
        
        <h3 className="text-white font-bold text-lg mb-1 relative z-10">{title}</h3>
        <button className="text-white text-sm underline hover:no-underline relative z-10">
          VIEW DETAILS →
        </button>
      </div>
      
      {/* Card Body with Background Image */}
      <div className="relative text-white px-6 py-6 h-full">
        {/* Background Image */}
        {backgroundImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          ></div>
        )}
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-75"></div>
        
        {/* Content Layer */}
        <div className="relative z-10 h-full">
          {/* Description */}
          <div className="mb-6">
            <p className="text-sm text-gray-300 leading-relaxed">
              Visitor Passes provide <span className="text-green-400 font-semibold">3 DAYS ACCESS</span> to GITEX
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">
              NIGERIA exhibition and all free conference
            </p>
          </div>
          
          {/* Features List */}
          <div className="space-y-2 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 bg-black bg-opacity-30 rounded-full px-3 py-2">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                <span className="text-sm text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
          
          {/* Bottom Section */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-baseline space-x-2">
                  {originalPrice && (
                    <span className="text-gray-400 line-through text-sm">{currency} {originalPrice}</span>
                  )}
                  <span className="text-2xl font-bold text-white">{currency} {price}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{priceNote}</p>
              </div>
              <button className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-100 transition-colors">
                {buttonText}
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative Timeline */}
        <div className="absolute right-6 top-6 bottom-20 z-10">
          <div className="w-px bg-gray-600 h-full relative">
            <div className="absolute top-0 -left-2 w-5 h-5 bg-white rounded-full"></div>
            <div className="absolute top-16 -left-2 w-5 h-5 bg-white rounded-full"></div>
            <div className="absolute bottom-0 -left-2 w-5 h-5 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardMain = () => {
  const ticketData = [
    {
      headerColor: "text-white",
      headerBg: "bg-purple-700",
      title: "VISITOR 3 DAY ACCESS TICKET",
      description: "Visitor Passes provide 3 DAYS ACCESS to GITEX NIGERIA exhibition and all free conference",
      features: [
        "Access to Connexions & Investor Lounge",
        "Network Events",
        "All Conference Tracks",
        "All Masterclasses",
        "3 Days Access to the Show",
        "Access to Dubai Internet City Lounge"
      ],
      price: "32.5",
      originalPrice: "65",
      currency: "USD",
      priceNote: "INCL 10% VAT",
      backgroundImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      headerColor: "text-white",
      headerBg: "bg-orange-600",
      title: "VISITOR 3 DAY ACCESS TICKET",
      description: "Visitor Passes provide 3 DAYS ACCESS to GITEX NIGERIA exhibition and all free conference",
      features: [
        "Access to Connexions & Investor Lounge",
        "Network Events",
        "All Conference Tracks", 
        "All Masterclasses",
        "3 Days Access to the Show",
        "Access to Dubai Internet City Lounge"
      ],
      price: "FREE",
      priceNote: "INCL 10% VAT",
      backgroundImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      headerColor: "text-white",
      headerBg: "bg-green-700",
      title: "VISITOR 3 DAY ACCESS TICKET",
      badge: { text: "EXCLUSIVE", bg: "bg-green-600" },
      description: "Visitor Passes provide 3 DAYS ACCESS to GITEX NIGERIA exhibition and all free conference",
      features: [
        "Access to Connexions & Investor Lounge",
        "Network Events",
        "All Conference Tracks",
        "All Masterclasses", 
        "Access to Dubai Internet City Lounge"
      ],
      price: "FREE",
      priceNote: "INCL 10% VAT",
      backgroundImage: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      headerColor: "text-white",
      headerBg: "bg-red-700",
      title: "VISITOR 3 DAY ACCESS TICKET",
      badge: { text: "BEST SELLER", bg: "bg-green-600" },
      description: "Visitor Passes provide 3 DAYS ACCESS to GITEX NIGERIA exhibition and all free conference",
      features: [
        "Access to Connexions & Investor Lounge",
        "Network Events",
        "All Conference Tracks",
        "All Masterclasses",
        "3 Days Access to the Show", 
        "Access to Dubai Internet City Lounge"
      ],
      price: "FREE",
      priceNote: "INCL 10% VAT",
      backgroundImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      headerColor: "text-white", 
      headerBg: "bg-green-600",
      title: "VISITOR 3 DAY ACCESS TICKET",
      description: "Visitor Passes provide 3 DAYS ACCESS to GITEX NIGERIA exhibition and all free conference",
      features: [
        "Access to Connexions & Investor Lounge",
        "Network Events",
        "All Conference Tracks", 
        "All Masterclasses",
        "3 Days Access to the Show",
        "Access to Dubai Internet City Lounge"
      ],
      price: "FREE",
      priceNote: "INCL 10% VAT",
      backgroundImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      headerColor: "text-white",
      headerBg: "bg-blue-700",
      title: "VISITOR 3 DAY ACCESS TICKET",
      description: "Visitor Passes provide 3 DAYS ACCESS to GITEX NIGERIA exhibition and all free conference",
      features: [
        "Access to Connexions & Investor Lounge",
        "Network Events", 
        "All Conference Tracks",
        "All Masterclasses",
        "Access to Dubai internet City Lounge"
      ],
      price: "FREE",
      priceNote: "INCL 10% VAT",
      backgroundImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          {ticketData.map((ticket, index) => (
            <TicketCard
              key={index}
              headerColor={ticket.headerColor}
              headerBg={ticket.headerBg}
              title={ticket.title}
              badge={ticket.badge}
              description={ticket.description}
              features={ticket.features}
              price={ticket.price}
              originalPrice={ticket.originalPrice}
              currency={ticket.currency}
              priceNote={ticket.priceNote}
              backgroundImage={ticket.backgroundImage}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardMain;