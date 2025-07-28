import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import gitexLogo from "../../assets/images/card-gitex-icon.png";
import cardOne from "../../assets/images/card1.png";
import cardTwo from "../../assets/images/card2.jpg";
import cardThree from "../../assets/images/card3.jpg";
import cardFour from "../../assets/images/card4.jpg";
import headerBg from "../../assets/images/header.png";

const TicketCard = ({
  title,
  price,
  discountedPrice,
  isFree,
  originalPrice,
  currency = "USD",
  backgroundColor,
  accentColor = "green",
  features = [],
  badgeType = null, 
  quantity = 0,
  onQuantityChange,
  backgroundImage,
  buttonText = "BUY NOW",
  priceNote = "INCL 10% VAT",
  badgeValue,
  gitexLogo,
}) => {
  const [quantityBuy, setQuantity] = useState(2);

  const bgColorClass = {
    purple: "bg-[linear-gradient(90deg,_#5B2A7C_0%,_#431B5A_100%)]",
    orange: "bg-[linear-gradient(90deg,_#CD670A_0%,_#CA3722_100%)]",
    darkgreen: "bg-[linear-gradient(90deg,_#173903_0%,_#081D01_100%)]",
    red: "bg-[linear-gradient(90deg,_#B5040A_0%,_#631308_100%)]",
    lightgreen: "bg-[linear-gradient(90deg,_#53BE2C_0%,_#27870C_100%)]",
    blue: "bg-[linear-gradient(90deg,_#004D98_0%,_#01277C_100%)]",
  };
  // const renderBadge = () => {
  //   if (badgeType === "exclusive" || badgeType === "bestseller") {
  //     const isExclusive = badgeType === "exclusive";
  //     const text = isExclusive ? "EXCLUSIVE" : "BEST SELLER";
  //     const gradient = isExclusive
  //       ? "linear-gradient(138.24deg, #16F25C 5.66%, #04270F 49.06%)"
  //       : "linear-gradient(138.24deg, #F2165C 5.66%, #270404 49.06%)";

  //     return (
  //       <div className="absolute top-0 left-0 w-[125px] h-[140px] overflow-hidden pointer-events-none z-[6000]">
  //         <div
  //           className="absolute w-[200px] text-center text-white text-xs font-bold transform -rotate-45 origin-top-left z-[60]"
  //           style={{
  //             background: gradient,
  //             top: "30px",
  //             left: "-60px",
  //             padding: "6px 0",
  //           }}
  //         >
  //           {text}
  //         </div>
  //       </div>
  //     );
  //   }
  //   return null;
  // };
  const renderBadge = () => {
    if (badgeType === "exclusive") {
      return (
        <div className="absolute top-0 left-0 z-10">
          <div
            className="px-4 py-2 text-white text-xs font-bold transform -rotate-45 -translate-x-3 translate-y-3"
            style={{
              background:
                "linear-gradient(138.24deg, #16F25C 5.66%, #04270F 49.06%)",
              minWidth: "120px",
              textAlign: "center",
            }}
          >
            EXCLUSIVE
          </div>
        </div>
      );
    }
    if (badgeType === "bestseller") {
      return (
        <div className="absolute top-0 left-0 z-10">
          <div
            className="px-4 py-2 text-white text-xs font-bold transform -rotate-45 -translate-x-3 translate-y-3"
            style={{
              background:
                "linear-gradient(138.24deg, #F2165C 5.66%, #270404 49.06%)",
              minWidth: "120px",
              textAlign: "center",
            }}
          >
            BEST SELLER
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div
        className={`lg:w-[400px] relative rounded-xl overflow-visible text-white ${bgColorClass[backgroundColor]} shadow-lg`}
        // relative  rounded-xl overflow-hidden text-white ${bgColorClass[backgroundColor]} shadow-lg
        // relative w-80 bg-white rounded-2xl overflow-visible shadow-xl
      >
        {badgeType && (
          <div className="absolute -top-1 -left-1 z-20 ">
            <div
              className="w-[6rem] h-[6rem] flex items-center justify-center shadow-lg "
              style={{
                background:
                  "linear-gradient(138.24deg, #16F25C 5.66%, #04270F 49.06%)",
                clipPath: "polygon(0 0, 100% 0, 0 100%)",
                borderRadius: "8px 0 0 0",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
              }}
            >
              <div className="absolute top-5 left-0.5 text-white text-[12px] font-bold transform -rotate-45 whitespace-nowrap">
                {badgeValue}
              </div>
            </div>
          </div>
        )}
        <div
          className={`relative  rounded-xl overflow-hidden text-white ${bgColorClass[backgroundColor]} shadow-lg`}
          // relative  rounded-xl overflow-hidden text-white ${bgColorClass[backgroundColor]} shadow-lg
          // relative w-80 bg-white rounded-2xl overflow-visible shadow-xl
        >
          
          <div
            className={`p-2 border-b border-white/20 ${bgColorClass[backgroundColor]}`}
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-2 right-4 w-3 h-3 bg-white opacity-60"></div>
              <div className="absolute top-6 right-8 w-2 h-2 bg-white opacity-40"></div>
              <div className="absolute top-1 right-12 w-4 h-4 bg-white opacity-30"></div>
              <div className="absolute top-5 right-16 w-2 h-2 bg-white opacity-50"></div>
              <div className="absolute top-8 right-2 w-3 h-3 bg-white opacity-35"></div>
              <div className="absolute top-3 right-20 w-2 h-2 bg-white opacity-45"></div>

              <div className="absolute top-7 right-24 w-2 h-2 bg-white opacity-25"></div>
              <div className="absolute top-0 right-28 w-3 h-3 bg-white opacity-40"></div>
              <div className="absolute top-4 right-32 w-2 h-2 bg-white opacity-35"></div>

              <div className="absolute top-2 right-36 w-1 h-1 bg-white opacity-30"></div>
              <div className="absolute top-6 right-40 w-1 h-1 bg-white opacity-25"></div>
              <div className="absolute top-9 right-44 w-1 h-1 bg-white opacity-40"></div>

              <div className="absolute top-5 left-4 w-3 h-3 bg-white opacity-80"></div>
              <div className="absolute top-10 left-2 w-2 h-2 bg-white opacity-70"></div>
              <div className="absolute top-5 left-6 w-3 h-3 bg-white opacity-80"></div>
              <div className="absolute top-10 left-8 w-2 h-2 bg-white opacity-70"></div>
              <div className="absolute top-10 left-8 w-3 h-3 bg-white opacity-80"></div>
              <div className="absolute top-15 left-10 w-2 h-2 bg-white opacity-70"></div>

              <div className="absolute top-1 right-1 w-2 h-2 bg-white opacity-25"></div>
              <div className="absolute top-10 right-6 w-3 h-3 bg-white opacity-20"></div>

              <div className="absolute bottom-4 right-8 w-2 h-2 bg-white opacity-35"></div>
              <div className="absolute bottom-2 right-2 w-3 h-3 bg-white opacity-30"></div>

              <div className="absolute bottom-3 left-4 w-2 h-2 bg-white opacity-30"></div>
              <div className="absolute bottom-6 left-1 w-1 h-1 bg-white opacity-25"></div>

              <div className="absolute top-0 left-3 w-2 h-2 bg-white opacity-40"></div>
              <div className="absolute top-6 left-5 w-1 h-1 bg-white opacity-35"></div>
            </div>

            <h3 className={`text-lg font-bold mb-2 ml-12 ${badgeType?'ml-16':''}`}>{title}</h3>
            <div className={`text-xs opacity-90 ml-12 text-[#E6FF00] font-bold ${badgeType?'ml-16':''}`}>VIEW DETAILS →</div>
          </div>


          <div className="relative text-white px-6 py-6 h-full">
            {backgroundImage && (
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${backgroundImage})` }}
              ></div>
            )}

            <div className="absolute inset-0 bg-black bg-opacity-75"></div>
            {/* <div className="mb-4">
          <div className="text-sm opacity-90 mb-2">
            Visitor Passes provide{" "}
            <span className="font-bold text-yellow-300">3 DAYS ACCESS</span> to
            GITEX NIGERIA exhibition and all free conference
          </div>
        </div> */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-4 h-8 bg-white rounded-r-full shadow-none"></div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-8 bg-white rounded-l-full shadow-none" ></div>
            <div className={`relative z-10 h-full ${gitexLogo ? "py-5" : ""}`}>
              <div className="mb-6">
                <p className="text-xs text-gray-300 leading-relaxed">
                  Visitor Passes provide{" "}
                  <span className="text-green-400 font-semibold">
                    3 DAYS ACCESS
                  </span>{" "}
                  to GITEX
                </p>
                <p className="text-xs text-gray-300 leading-relaxed">
                  NIGERIA exhibition and all free conference
                </p>
              </div>

              {gitexLogo ? (
                <div className={`${gitexLogo ? "h-20" : ""}`}>
                  <img src={gitexLogo} className="w-50 h-10" />

                  <div className="">
                    {" "}
                    <div className=""></div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {/* {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 bg-white bg-opacity-30 rounded-full px-3 py-2">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                <span className="text-sm text-gray-300">{feature}</span>
              </div>
            ))} */}
                  {features.map((group, index) => (
                    <div key={index} className="flex flex-wrap gap-2">
                      {group.map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-center space-x-1 bg-white bg-opacity-30 rounded-full px-2 py-1"
                        >
                          {/* <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div> */}
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center bg-green-500`}
                          >
                            <svg
                              className="w-2.5 h-2.5 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-xs text-gray-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
              <hr
                className={`border-t border-gray-300 opacity-20  ${
                  gitexLogo ? "mt-2" : "mt-2"
                }`}
              />
              {!isFree && (
                <div className={`flex items-center justify-between ${quantityBuy===0?"":'mt-2'}`}>
                  <div className="flex items-center space-x-2">
                    <span className="text-white text-m font-bold">
                      USD  
                      {/* <span className="text-red-400 line-through text-sm">{originalPrice}</span> */}
 <span className="text-grey-500 text-m relative ml-1">
                {originalPrice}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-1 bg-red-500 transform -rotate-12 origin-center"></div>
                </div>
              </span>
                    </span>
                    <span className="text-xs text-gray-300 font-bold bg-transparent border-2 border-white px-2 rounded">32.5</span>
                  </div>

                  {quantityBuy===0?<button className="bg-white text-xs text-black px-3 py-2 rounded font-bold hover:bg-gray-100 transition-colors mt-3" 
                  onClick={() => setQuantity(quantityBuy + 1)}>
                    {buttonText}
                  </button>:<div className="flex items-center border border-gray-600 rounded">
                    <button
                      onClick={() => setQuantity(Math.max(0, quantityBuy - 1))}
                      className="px-3 py-1 text-white hover:bg-gray-700"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-black bg-white font-bold">
                      {quantityBuy}
                    </span>
                    <button
                      onClick={() => setQuantity(quantityBuy + 1)}
                      className="px-3 py-1 text-white hover:bg-gray-700"
                    >
                      +
                    </button>
                  </div>
                  }
                </div>
              )}
              {isFree &&<div className="">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="flex items-baseline space-x-2">
                      {isFree && (
                        <span className="text-white-400 text-s font-bold">
                          FREE
                        </span>
                      )}
                      {/* <span className="text-2xl font-bold text-white">
                    {currency} {price}
                  </span> */}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{priceNote}</p>
                  </div>
                  <button className="bg-white text-xs text-black px-3 py-2 rounded font-bold hover:bg-gray-100 transition-colors mt-1">
                    {buttonText}
                  </button>
                  
                </div>
              </div>
              }
            </div>

            
          </div>
        </div>
      </div>
    </>
  );
};

const GitexTicketSelection = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState({
    visitor1: 0,
    visitor2: 0,
    visitor3: 0,
    visitor4: 0,
    visitor5: 0,
    visitor6: 0,
  });

  const handleQuantityChange = (ticketId, newQuantity) => {
    setTickets((prev) => ({
      ...prev,
      [ticketId]: newQuantity,
    }));
  };

  const ticketData = [
    {
      id: "visitor1",
      title: "VISITOR 3 DAY ACCESS TICKET",
      price: "32.5",
      originalPrice: "43",
      discountedPrice: "32.5",
      backgroundColor: "purple",
      // badgeType: "bestseller",
      features: [
        ["Access to Connections & Investor Lounge"], 
        ["Network Events", "All Conference Tracks"], 
        ["All Masterclasses", "3 Days Access to the Show"], 
        ["Access to Dubai Internet City Lounge"], 
      ],
      backgroundImage: cardOne,
      gitexLogo: gitexLogo,
      isFree: false,
    },
    {
      id: "visitor2",
      title: "VISITOR 3 DAY ACCESS TICKET",
      price: "431.36",
      discountedPrice: "431.36",
      backgroundColor: "orange",
      features: [
        ["Access to Connections & Investor Lounge"], 
        ["Network Events", "All Conference Tracks"], 
        ["All Masterclasses", "3 Days Access to the Show"], 
        ["Access to Dubai Internet City Lounge"], 
      ],
      backgroundImage: cardTwo,
      isFree: true,
    },
    {
      id: "visitor3",
      title: "VISITOR 3 DAY ACCESS TICKET",
      price: "0",
      discountedPrice: "0",
      backgroundColor: "darkgreen",
      badgeType: "exclusive",
      badgeValue: "EXCLUSIVE",
      features: [
        ["Access to Connections & Investor Lounge"], 
        ["Network Events", "All Conference Tracks"], 
        ["All Masterclasses", "3 Days Access to the Show"], 
        ["Access to Dubai Internet City Lounge"], 
      ],
      backgroundImage: cardThree,
      isFree: true,
    },
    {
      id: "visitor4",
      title: "VISITOR 3 DAY ACCESS TICKET",
      price: "0",
      discountedPrice: "0",
      backgroundColor: "red",
      badgeType: "bestseller",
      badgeValue: "BEST SELLER",
      features: [
        ["Access to Connections & Investor Lounge"], 
        ["Network Events", "All Conference Tracks"], 
        ["All Masterclasses", "3 Days Access to the Show"], 
        ["Access to Dubai Internet City Lounge"],
      ],
      backgroundImage: cardFour,
      isFree: true,
    },
    {
      id: "visitor5",
      title: "VISITOR 3 DAY ACCESS TICKET",
      price: "0",
      discountedPrice: "0",
      backgroundColor: "lightgreen",
      features: [
        ["Access to Connections & Investor Lounge"],
        ["Network Events", "All Conference Tracks"], 
        ["All Masterclasses", "3 Days Access to the Show"],
        ["Access to Dubai Internet City Lounge"], 
      ],
      backgroundImage: cardFour,
      isFree: true,
    },
    {
      id: "visitor6",
      title: "VISITOR 3 DAY ACCESS TICKET",
      price: "0",
      discountedPrice: "0",
      backgroundColor: "blue",
      features: [
        ["Access to Connections & Investor Lounge"],
        ["Network Events", "All Conference Tracks"], 
        ["All Masterclasses", "3 Days Access to the Show"], 
        ["Access to Dubai Internet City Lounge"], 
      ],
      backgroundImage: cardThree,
      isFree: true,
    },
  ];

  const calculateTotal = () => {
    return ticketData
      .reduce((total, ticket) => {
        const quantity = tickets[ticket.id];
        const price = parseFloat(ticket.price);
        return total + quantity * price;
      }, 0)
      .toFixed(2);
  };

  const getTotalQuantity = () => {
    return Object.values(tickets).reduce((sum, qty) => sum + qty, 0);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div
          className="bg-gradient-to-r from-lime-400 to-green-500 p-14 flex justify-between items-center flex-shrink-0 bg-cover bg-center bg-no-repeat relative"
          style={{
            backgroundImage: `url(${headerBg})`,
          }}
        ></div>
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {ticketData.map((ticket) => (
              <TicketCard
                key={ticket.id}
                title={ticket.title}
                price={ticket.price}
                discountedPrice={ticket.discountedPrice}
                isFree={ticket.isFree}
                originalPrice={ticket.originalPrice}
                backgroundColor={ticket.backgroundColor}
                features={ticket.features}
                badgeType={ticket.badgeType}
                quantity={tickets[ticket.id]}
                onQuantityChange={(newQuantity) =>
                  handleQuantityChange(ticket.id, newQuantity)
                }
                backgroundImage={ticket.backgroundImage}
                badgeValue={ticket.badgeValue}
                gitexLogo={ticket.gitexLogo}
              />
            ))}
          </div>
        </div>

        <div
          className="bg-gradient-to-r from-lime-400 to-green-500 p-14 flex justify-between items-center flex-shrink-0 bg-cover bg-center bg-no-repeat relative"
          style={{
            backgroundImage: `url(${headerBg})`,
          }}
        ></div>
        <div className="bg-[linear-gradient(90deg,_#299D3F_0%,_#123F22_100%)] relative overflow-hidden">
          <div className="relative z-10 flex justify-end px-6 py-6 text-white">
            <div className="flex items-center gap-4">
              <div className="">
                <div className="text-sm opacity-90">
                  Total:
                  <span className="text-2xl font-bold">
                    EUR {calculateTotal()}{" "}
                  </span>
                  <span className="text-xl font-normal">incl. 19% VAT</span>
                </div>
                <div className="text-xs opacity-70">View Ticket Summary</div>
              </div>

              <button
                onClick={() => {
                  window.scrollTo(0,0);
                  navigate("/register-form");
                }}
                className="bg-white text-green-800 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                Buy Now
                {getTotalQuantity() > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {getTotalQuantity()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GitexTicketSelection;
