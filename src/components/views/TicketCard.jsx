import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import headerBg from "../assets/images/header.png";
import sidebarBg from "../assets/images/sidebar-top.png";
import sidebarInside from "../assets/images/sidebar-inside.png";


import { useNavigate } from "react-router-dom";
const TicketCard = ({
  title,
  price,
  originalPrice,
  currency = "USD",
  backgroundColor,
  accentColor = "green",
  features = [],
  badgeType = null, // "exclusive", "bestseller", or null
  quantity = 0,
  onQuantityChange,
  backgroundImage,
  buttonText = "BUY NOW",
  priceNote = "INCL 10% VAT",
}) => {
  const bgColorClass = {
    purple: "bg-gradient-to-br from-purple-600 to-purple-800",
    orange: "bg-gradient-to-br from-orange-500 to-red-600",
    green: "bg-gradient-to-br from-green-600 to-green-800",
    blue: "bg-gradient-to-br from-blue-600 to-blue-800",
    red: "bg-gradient-to-br from-red-600 to-red-800",
    teal: "bg-gradient-to-br from-teal-600 to-teal-800",
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
    <div
      className={`relative rounded-xl overflow-hidden text-white ${bgColorClass[backgroundColor]} shadow-lg`}
    >
      {/* Decorative Pixels Background */}
      {/* <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-32 h-32">
            <div className="grid grid-cols-8 gap-1 h-full">
              {[...Array(64)].map((_, i) => (
                <div
                  key={i}
                  className={`w-full h-full ${
                    i % 3 === 0
                      ? "bg-green-300"
                      : i % 3 === 1
                      ? "bg-green-400"
                      : "bg-green-500"
                  }`}
                ></div>
              ))}
            </div>
          </div>
          <div className="absolute top-0 right-0 w-40 h-40">
            <div className="grid grid-cols-10 gap-1 h-full">
              {[...Array(100)].map((_, i) => (
                <div
                  key={i}
                  className={`w-full h-full ${
                    i % 4 === 0
                      ? "bg-lime-300"
                      : i % 4 === 1
                      ? "bg-lime-400"
                      : i % 4 === 2
                      ? "bg-green-400"
                      : "bg-green-500"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div> */}
      {renderBadge()}

      {/* Header */}
      <div
        className={`p-4 border-b border-white/20 ${bgColorClass[backgroundColor]}`}
      >
        <div className="absolute inset-0 opacity-20">
          {/* Right Side Pixels */}
          <div className="absolute top-2 right-4 w-3 h-3 bg-white opacity-60"></div>
          <div className="absolute top-6 right-8 w-2 h-2 bg-white opacity-40"></div>
          <div className="absolute top-1 right-12 w-4 h-4 bg-white opacity-30"></div>
          <div className="absolute top-5 right-16 w-2 h-2 bg-white opacity-50"></div>
          <div className="absolute top-8 right-2 w-3 h-3 bg-white opacity-35"></div>
          <div className="absolute top-3 right-20 w-2 h-2 bg-white opacity-45"></div>

          {/* Medium Pixels */}
          <div className="absolute top-7 right-24 w-2 h-2 bg-white opacity-25"></div>
          <div className="absolute top-0 right-28 w-3 h-3 bg-white opacity-40"></div>
          <div className="absolute top-4 right-32 w-2 h-2 bg-white opacity-35"></div>

          {/* Small Pixels */}
          <div className="absolute top-2 right-36 w-1 h-1 bg-white opacity-30"></div>
          <div className="absolute top-6 right-40 w-1 h-1 bg-white opacity-25"></div>
          <div className="absolute top-9 right-44 w-1 h-1 bg-white opacity-40"></div>

          {/* Left Side Pixels */}
          <div className="absolute top-5 left-4 w-3 h-3 bg-white opacity-80"></div>
          <div className="absolute top-10 left-2 w-2 h-2 bg-white opacity-70"></div>
          <div className="absolute top-5 left-6 w-3 h-3 bg-white opacity-80"></div>
          <div className="absolute top-10 left-8 w-2 h-2 bg-white opacity-70"></div>
          <div className="absolute top-10 left-8 w-3 h-3 bg-white opacity-80"></div>
          <div className="absolute top-15 left-10 w-2 h-2 bg-white opacity-70"></div>
          {/* ✅ Extra Pixels (Added Below) */}

          {/* Top Right */}
          <div className="absolute top-1 right-1 w-2 h-2 bg-white opacity-25"></div>
          <div className="absolute top-10 right-6 w-3 h-3 bg-white opacity-20"></div>

          {/* Bottom Right */}
          <div className="absolute bottom-4 right-8 w-2 h-2 bg-white opacity-35"></div>
          <div className="absolute bottom-2 right-2 w-3 h-3 bg-white opacity-30"></div>

          {/* Bottom Left */}
          <div className="absolute bottom-3 left-4 w-2 h-2 bg-white opacity-30"></div>
          <div className="absolute bottom-6 left-1 w-1 h-1 bg-white opacity-25"></div>

          {/* Top Left */}
          <div className="absolute top-0 left-3 w-2 h-2 bg-white opacity-40"></div>
          <div className="absolute top-6 left-5 w-1 h-1 bg-white opacity-35"></div>
        </div>

        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <div className="text-xs opacity-90">VIEW DETAILS →</div>
      </div>

      {/* Content */}

      <div className="relative text-white px-6 py-6 h-full">
        {backgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          ></div>
        )}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-75"></div>
        {/* <div className="mb-4">
          <div className="text-sm opacity-90 mb-2">
            Visitor Passes provide{" "}
            <span className="font-bold text-yellow-300">3 DAYS ACCESS</span> to
            GITEX NIGERIA exhibition and all free conference
          </div>
        </div> */}

        <div className="relative z-10 h-full">
          {/* Description */}
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

          {/* Features List */}
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
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span className="text-xs text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <hr className="border-t border-gray-300 opacity-20 mt-2"/>
          {/* Bottom Section */}
          <div className="">
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-baseline space-x-2">
                  {originalPrice && (
                    <span className="text-gray-400 line-through text-xs">
                      {currency} {originalPrice}
                    </span>
                  )}
                  {/* <span className="text-2xl font-bold text-white">
                    {currency} {price}
                  </span> */}
                </div>
                <p className="text-xs text-gray-400 mt-1">{priceNote}</p>
              </div>
              <button className="bg-white text-xs text-black px-2 py-1 rounded font-bold hover:bg-gray-100 transition-colors mt-1">
                {buttonText}
              </button>
            </div>
          </div>
        </div>

        {/* Price and Quantity */}
        {/* <div className="border-t border-white/20 pt-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm opacity-75">FREE</div>
              <div className="text-xs opacity-60">INCL 19% VAT</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">
                {currency} {originalPrice}
              </div>
              <div className="text-lg font-bold">{price}</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center border border-white/30 rounded">
              <button
                onClick={() => onQuantityChange(Math.max(0, quantity - 1))}
                className="w-8 h-8 flex items-center justify-center hover:bg-white/10"
              >
                -
              </button>
              <span className="w-8 text-center text-sm">{quantity}</span>
              <button
                onClick={() => onQuantityChange(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center hover:bg-white/10"
              >
                +
              </button>
            </div>
            <button className="bg-white text-gray-800 px-4 py-2 rounded font-bold text-sm hover:bg-gray-100 transition-colors">
              BUY NOW
            </button>
          </div>
        </div> */}
      </div>
    </div>
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
      originalPrice: "32.5",
      backgroundColor: "purple",
      badgeType: "bestseller",
      features: [
        ["Access to Connections & Investor Lounge"], // single line
        ["Network Events", "All Conference Tracks"], // two in one row
        ["All Masterclasses", "3 Days Access to the Show"], // two in one row
        ["Access to Dubai Internet City Lounge"], // single line
      ],
      backgroundImage:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "visitor2",
      title: "VISITOR 3 DAY ACCESS TICKET",
      price: "431.36",
      originalPrice: "431.36",
      backgroundColor: "orange",
      features: [
        ["Access to Connections & Investor Lounge"], // single line
        ["Network Events", "All Conference Tracks"], // two in one row
        ["All Masterclasses", "3 Days Access to the Show"], // two in one row
        ["Access to Dubai Internet City Lounge"], // single line
      ],
      backgroundImage:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "visitor3",
      title: "VISITOR 3 DAY ACCESS TICKET",
      price: "0",
      originalPrice: "0",
      backgroundColor: "green",
      badgeType: "exclusive",
      features: [
        ["Access to Connections & Investor Lounge"], // single line
        ["Network Events", "All Conference Tracks"], // two in one row
        ["All Masterclasses", "3 Days Access to the Show"], // two in one row
        ["Access to Dubai Internet City Lounge"], // single line
      ],
      backgroundImage:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "visitor4",
      title: "VISITOR 3 DAY ACCESS TICKET",
      price: "0",
      originalPrice: "0",
      backgroundColor: "red",
      badgeType: "bestseller",
      features: [
        ["Access to Connections & Investor Lounge"], // single line
        ["Network Events", "All Conference Tracks"], // two in one row
        ["All Masterclasses", "3 Days Access to the Show"], // two in one row
        ["Access to Dubai Internet City Lounge"], // single line
      ],
      backgroundImage:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "visitor5",
      title: "VISITOR 3 DAY ACCESS TICKET",
      price: "0",
      originalPrice: "0",
      backgroundColor: "teal",
      features: [
        ["Access to Connections & Investor Lounge"], // single line
        ["Network Events", "All Conference Tracks"], // two in one row
        ["All Masterclasses", "3 Days Access to the Show"], // two in one row
        ["Access to Dubai Internet City Lounge"], // single line
      ],
      backgroundImage:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "visitor6",
      title: "VISITOR 3 DAY ACCESS TICKET",
      price: "0",
      originalPrice: "0",
      backgroundColor: "blue",
      features: [
        ["Access to Connections & Investor Lounge"], // single line
        ["Network Events", "All Conference Tracks"], // two in one row
        ["All Masterclasses", "3 Days Access to the Show"], // two in one row
        ["Access to Dubai Internet City Lounge"], // single line
      ],
      backgroundImage:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
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
              originalPrice={ticket.originalPrice}
              backgroundColor={ticket.backgroundColor}
              features={ticket.features}
              badgeType={ticket.badgeType}
              quantity={tickets[ticket.id]}
              onQuantityChange={(newQuantity) =>
                handleQuantityChange(ticket.id, newQuantity)
              }
              backgroundImage={ticket.backgroundImage}
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

            <button  onClick={() => navigate("/register-form")} className="bg-white text-green-800 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors flex items-center gap-2">
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
  );
};

export default GitexTicketSelection;
