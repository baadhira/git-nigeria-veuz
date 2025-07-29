import React, { useCallback, useMemo, useState } from 'react'
// Mock images for demo
const gitexLogo =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='40' viewBox='0 0 100 40'%3E%3Crect width='100' height='40' fill='%23333'/%3E%3Ctext x='50' y='25' text-anchor='middle' fill='white' font-family='Arial' font-size='12'%3EGITEX%3C/text%3E%3C/svg%3E"
const cardOne =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23667eea'/%3E%3C/svg%3E"
const cardTwo =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f093fb'/%3E%3C/svg%3E"
const cardThree =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%2343e97b'/%3E%3C/svg%3E"
const cardFour =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23fa709a'/%3E%3C/svg%3E"
const headerBg =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='200' viewBox='0 0 1200 200'%3E%3Crect width='1200' height='200' fill='%2384fab0'/%3E%3C/svg%3E"
// Mock context
const useProgressBarContext = () => ({
  totalBuyPrice: 0,
  setTotalBuyPrice: () => {},
  totalQuantity: 0,
  setTotalQuantity: () => {},
  setTotalProduct: () => {},
})
const useTicketQuantity = (initialQuantity = 0) => {
  const [quantity, setQuantity] = useState(initialQuantity)
  const increment = useCallback(() => {
    setQuantity((prev) => prev + 1)
  }, [])
  const decrement = useCallback(() => {
    setQuantity((prev) => Math.max(0, prev - 1))
  }, [])
  const reset = useCallback(() => {
    setQuantity(0)
  }, [])
  const setDirectly = useCallback((newQuantity) => {
    setQuantity(Math.max(0, newQuantity))
  }, [])
  return {
    quantity,
    increment,
    decrement,
    reset,
    setDirectly,
  }
}
const QuantitySelector = ({
  quantity,
  onIncrement,
  onDecrement,
  buttonText,
}) => {
  if (quantity === 0) {
    return (
      <button
        className="bg-white text-xs text-black px-3 py-2 rounded font-bold hover:bg-gray-100 transition-colors mt-3"
        onClick={onIncrement}
      >
        {buttonText}
      </button>
    )
  }
  return (
    <div className="flex items-center border border-gray-600 rounded">
      <button
        onClick={onDecrement}
        className="px-3 py-1 text-white hover:bg-gray-700"
      >
        -
      </button>
      <span className="px-3 py-1 text-black bg-white font-bold">
        {quantity}
      </span>
      <button
        onClick={onIncrement}
        className="px-3 py-1 text-white hover:bg-gray-700"
      >
        +
      </button>
    </div>
  )
}
const PriceDisplay = ({
  price,
  originalPrice,
  isFree,
  currency = 'USD',
  priceNote = 'INCL 10% VAT',
}) => {
  if (isFree) {
    return (
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-baseline space-x-2">
            <span className="text-white-400 text-s font-bold">FREE</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">{priceNote}</p>
        </div>
      </div>
    )
  }
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span className="text-white text-m font-bold">
          {currency}
          <span className="text-grey-500 text-m relative ml-1">
            {originalPrice}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-1 bg-red-500 transform -rotate-12 origin-center"></div>
            </div>
          </span>
        </span>
        <span className="text-xs text-gray-300 font-bold bg-transparent border-2 border-white px-2 rounded">
          {price}
        </span>
      </div>
    </div>
  )
}
const TicketCard = ({
  id,
  title,
  price,
  originalPrice,
  isFree,
  currency = 'USD',
  backgroundColor,
  features = [],
  badgeType = null,
  quantity,
  onQuantityChange,
  backgroundImage,
  buttonText = 'BUY NOW',
  priceNote = 'INCL 10% VAT',
  badgeValue,
  gitexLogo,
}) => {
  const bgColorClass = {
    purple: 'bg-[linear-gradient(90deg,_#5B2A7C_0%,_#431B5A_100%)]',
    orange: 'bg-[linear-gradient(90deg,_#CD670A_0%,_#CA3722_100%)]',
    darkgreen: 'bg-[linear-gradient(90deg,_#173903_0%,_#081D01_100%)]',
    red: 'bg-[linear-gradient(90deg,_#B5040A_0%,_#631308_100%)]',
    lightgreen: 'bg-[linear-gradient(90deg,_#53BE2C_0%,_#27870C_100%)]',
    blue: 'bg-[linear-gradient(90deg,_#004D98_0%,_#01277C_100%)]',
  }
  const handleIncrement = useCallback(() => {
    onQuantityChange(id, quantity + 1)
  }, [id, quantity, onQuantityChange])
  const handleDecrement = useCallback(() => {
    onQuantityChange(id, Math.max(0, quantity - 1))
  }, [id, quantity, onQuantityChange])
  return (
    <div className="w-full max-w-[400px] relative rounded-xl overflow-visible text-white shadow-lg mx-auto">
      {badgeType && (
        <div className="absolute -top-1 -left-1 z-20 ">
          <div
            className="w-[6rem] h-[6rem] flex items-center justify-center shadow-lg "
            style={{
              background:
                badgeType === 'exclusive'
                  ? 'linear-gradient(138.24deg, #16F25C 5.66%, #04270F 49.06%)'
                  : 'linear-gradient(138.24deg, #16F25C 5.66%, #04270F 49.06%)',
              clipPath: 'polygon(0 0, 100% 0, 0 100%)',
              borderRadius: '8px 0 0 0',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
            }}
          >
            <div className="absolute top-5 left-0.5 text-white text-[12px] font-bold transform -rotate-45 whitespace-nowrap">
              {badgeValue}
            </div>
          </div>
        </div>
      )}
      <div
        className={`relative rounded-xl overflow-hidden text-white ${bgColorClass[backgroundColor]} shadow-lg h-full`}
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
          <h3
            className={`text-lg font-bold mb-2 ml-12 ${badgeType ? 'ml-16' : ''}`}
          >
            {title}
          </h3>
          <div
            className={`text-xs opacity-90 ml-12 text-[#E6FF00] font-bold ${badgeType ? 'ml-16' : ''}`}
          >
            VIEW DETAILS →
          </div>
        </div>
        <div className="relative text-white px-6 py-6 h-full">
          {backgroundImage && (
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${backgroundImage})`,
              }}
            />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-75"></div>
          <div className="absolute left-0 top-1/3 transform -translate-y-1/2 w-4 h-8 bg-white rounded-r-full shadow-none"></div>
          <div className="absolute right-0 top-1/3 transform -translate-y-1/2 w-4 h-8 bg-white rounded-l-full shadow-none"></div>
          <div className={`relative z-10 h-full ${gitexLogo ? 'py-5' : ''}`}>
            <div className="mb-6">
              <p className="text-xs text-gray-300 leading-relaxed">
                Visitor Passes provide{' '}
                <span className="text-green-400 font-semibold">
                  3 DAYS ACCESS
                </span>{' '}
                to GITEX
              </p>
              <p className="text-xs text-gray-300 leading-relaxed">
                NIGERIA exhibition and all free conference
              </p>
            </div>
            {gitexLogo ? (
              <div className={`${gitexLogo ? 'h-20' : ''}`}>
                <img src={gitexLogo} className="w-50 h-10" alt="Gitex Logo" />
              </div>
            ) : (
              <div className="space-y-2">
                {features.map((group, index) => (
                  <div key={index} className="flex flex-wrap gap-2">
                    {group.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center space-x-1 bg-white bg-opacity-30 rounded-full px-2 py-1"
                      >
                        <div className="w-4 h-4 rounded-full flex items-center justify-center bg-green-500">
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
                        <span className="text-xs text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
            <hr
              className={`border-t border-gray-300 opacity-20 ${gitexLogo ? 'mt-2' : 'mt-2'}`}
            />
            {!isFree && (
              <div
                className={`flex items-center justify-between ${quantity === 0 ? '' : 'mt-2'}`}
              >
                <PriceDisplay
                  price={price}
                  originalPrice={originalPrice}
                  isFree={isFree}
                  currency={currency}
                  priceNote={priceNote}
                />
                <QuantitySelector
                  quantity={quantity}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                  buttonText={buttonText}
                />
              </div>
            )}
            {isFree && (
              <div className="flex items-end justify-between">
                <PriceDisplay
                  price={price}
                  originalPrice={originalPrice}
                  isFree={isFree}
                  currency={currency}
                  priceNote={priceNote}
                />
                <QuantitySelector
                  quantity={quantity}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                  buttonText={buttonText}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
// New component for ticket summary
const TicketSummary = ({ purchasedTickets }) => {
  if (purchasedTickets.length === 0) {
    return (
      <div className="bg-white bg-opacity-10 rounded-lg p-4 mb-4">
        <h4 className="text-sm font-bold text-white mb-2">Your Cart</h4>
        <p className="text-xs text-gray-300">No tickets selected</p>
      </div>
    )
  }
  return (
    <div className="bg-white bg-opacity-10 rounded-lg p-4 mb-4">
      <h4 className="text-sm font-bold text-white mb-3">
        Your Cart ({purchasedTickets.length} item
        {purchasedTickets.length > 1 ? 's' : ''})
      </h4>
      <div className="space-y-3">
        {purchasedTickets.map((ticket) => (
          <div key={ticket.id} className="bg-white bg-opacity-5 rounded-md p-3">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1 pr-2">
                <h5 className="text-xs font-semibold text-white leading-tight">
                  {ticket.title}
                </h5>
                {ticket.badgeValue && (
                  <span className="inline-block text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-full mt-1">
                    {ticket.badgeValue}
                  </span>
                )}
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-300">
                  Qty: {ticket.quantity}
                </div>
                <div className="text-sm font-bold text-white">
                  {ticket.isFree ? 'FREE' : `EUR ${ticket.subtotal.toFixed(2)}`}
                </div>
              </div>
            </div>
            {/* Individual ticket price breakdown */}
            {!ticket.isFree && (
              <div className="text-[10px] text-gray-400 border-t border-white border-opacity-10 pt-1">
                EUR {ticket.price} × {ticket.quantity} = EUR{' '}
                {ticket.subtotal.toFixed(2)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
const useTicketManager = (ticketData) => {
  const [tickets, setTickets] = useState(() => {
    const initialState = {}
    ticketData.forEach((ticket) => {
      initialState[ticket.id] = 0
    })
    return initialState
  })
  const updateQuantity = useCallback((ticketId, newQuantity) => {
    setTickets((prev) => ({
      ...prev,
      [ticketId]: Math.max(0, newQuantity),
    }))
  }, [])
  const resetAll = useCallback(() => {
    setTickets((prev) => {
      const reset = {}
      Object.keys(prev).forEach((key) => {
        reset[key] = 0
      })
      return reset
    })
  }, [])
  const calculateTotal = useMemo(() => {
    return ticketData.reduce((total, ticket) => {
      const quantity = tickets[ticket.id] || 0
      const price = parseFloat(ticket.price) || 0
      return total + quantity * price
    }, 0)
  }, [tickets, ticketData])
  const {
    totalBuyPrice,
    setTotalBuyPrice,
    totalQuantity,
    setTotalQuantity,
    setTotalProduct,
  } = useProgressBarContext()
  const totalProduct = useMemo(() => {
    return Object.values(tickets).reduce((sum, qty) => sum + qty, 0)
  }, [tickets])
  const getTicketSummary = useMemo(() => {
    return ticketData
      .filter((ticket) => tickets[ticket.id] > 0)
      .map((ticket) => ({
        ...ticket,
        quantity: tickets[ticket.id],
        subtotal: (parseFloat(ticket.price) || 0) * tickets[ticket.id],
      }))
  }, [tickets, ticketData])
  return {
    tickets,
    updateQuantity,
    resetAll,
    calculateTotal,
    totalProduct,
    getTicketSummary,
    setTotalQuantity,
    setTotalBuyPrice,
  }
}
const GitexTicketSelection = () => {
  const navigate = () => {} // Mock navigate
  const ticketData = [
    {
      id: 'visitor1',
      title: 'VISITOR 3 DAY ACCESS TICKET',
      price: '32.5',
      originalPrice: '43',
      backgroundColor: 'purple',
      features: [
        ['Access to Connections & Investor Lounge'],
        ['Network Events', 'All Conference Tracks'],
        ['All Masterclasses', '3 Days Access to the Show'],
        ['Access to Dubai Internet City Lounge'],
      ],
      backgroundImage: cardOne,
      gitexLogo: gitexLogo,
      isFree: false,
    },
    {
      id: 'visitor2',
      title: 'VISITOR 3 DAY ACCESS TICKET',
      price: '0',
      backgroundColor: 'orange',
      features: [
        ['Access to Connections & Investor Lounge'],
        ['Network Events', 'All Conference Tracks'],
        ['All Masterclasses', '3 Days Access to the Show'],
        ['Access to Dubai Internet City Lounge'],
      ],
      backgroundImage: cardTwo,
      isFree: true,
    },
    {
      id: 'visitor3',
      title: 'VISITOR 3 DAY ACCESS TICKET',
      price: '0',
      backgroundColor: 'darkgreen',
      badgeType: 'exclusive',
      badgeValue: 'EXCLUSIVE',
      features: [
        ['Access to Connections & Investor Lounge'],
        ['Network Events', 'All Conference Tracks'],
        ['All Masterclasses', '3 Days Access to the Show'],
        ['Access to Dubai Internet City Lounge'],
      ],
      backgroundImage: cardThree,
      isFree: true,
    },
    {
      id: 'visitor4',
      title: 'VISITOR 3 DAY ACCESS TICKET',
      price: '0',
      backgroundColor: 'red',
      badgeType: 'bestseller',
      badgeValue: 'BEST SELLER',
      features: [
        ['Access to Connections & Investor Lounge'],
        ['Network Events', 'All Conference Tracks'],
        ['All Masterclasses', '3 Days Access to the Show'],
        ['Access to Dubai Internet City Lounge'],
      ],
      backgroundImage: cardFour,
      isFree: true,
    },
    {
      id: 'visitor5',
      title: 'VISITOR 3 DAY ACCESS TICKET',
      price: '0',
      backgroundColor: 'lightgreen',
      features: [
        ['Access to Connections & Investor Lounge'],
        ['Network Events', 'All Conference Tracks'],
        ['All Masterclasses', '3 Days Access to the Show'],
        ['Access to Dubai Internet City Lounge'],
      ],
      backgroundImage: cardFour,
      isFree: true,
    },
    {
      id: 'visitor6',
      title: 'VISITOR 3 DAY ACCESS TICKET',
      price: '0',
      backgroundColor: 'blue',
      features: [
        ['Access to Connections & Investor Lounge'],
        ['Network Events', 'All Conference Tracks'],
        ['All Masterclasses', '3 Days Access to the Show'],
        ['Access to Dubai Internet City Lounge'],
      ],
      backgroundImage: cardThree,
      isFree: true,
    },
  ]
  const {
    tickets,
    updateQuantity,
    resetAll,
    calculateTotal,
    totalProduct,
    getTicketSummary,
    setTotalQuantity,
    setTotalBuyPrice,
  } = useTicketManager(ticketData)
  const handleBuyNow = useCallback(() => {
    const selectedTickets = getTicketSummary
    console.log(selectedTickets, 'selectedTicketsselectedTickets')
    console.log(totalProduct, 'totalProduct')
    setTotalQuantity(totalProduct)
    setTotalBuyPrice(calculateTotal)
    window.scrollTo(0, 0)
    // navigate("/register-form");
  }, [
    getTicketSummary,
    calculateTotal,
    totalProduct,
    setTotalQuantity,
    setTotalBuyPrice,
  ])
  const [showSummary, setShowSummary] = useState(false)
  const toggleSummary = () => {
    setShowSummary(!showSummary)
  }
  return (
    <div className="min-h-screen flex flex-col">
      <div
        className="bg-gradient-to-r from-lime-400 to-green-500 p-14 flex justify-between items-center flex-shrink-0 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url(${headerBg})`,
        }}
      />
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6">
          {ticketData.map((ticket) => (
            <div key={ticket.id} className="flex justify-center">
              <TicketCard
                {...ticket}
                quantity={tickets[ticket.id]}
                onQuantityChange={updateQuantity}
              />
            </div>
          ))}
        </div>
      </div>
      <div
        className="bg-gradient-to-r from-lime-400 to-green-500 p-14 flex justify-between items-center flex-shrink-0 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url(${headerBg})`,
        }}
      />
      <div className="bg-[linear-gradient(90deg,_#299D3F_0%,_#123F22_100%)] relative overflow-hidden">
        <div className="relative z-10 px-4 sm:px-6 py-4 sm:py-6 text-white">
          {/* Mobile Ticket Summary */}
          <div className="block sm:hidden mb-4">
            <TicketSummary purchasedTickets={getTicketSummary} />
          </div>
          {/* Mobile Layout */}
          <div className="block sm:hidden">
            <div className="text-center mb-4">
              <div className="text-sm opacity-90">
                Total:
                <span className="text-xl font-bold ml-2">
                  EUR {calculateTotal.toFixed(2)}
                </span>
              </div>
              <div className="text-lg font-normal">incl. 19% VAT</div>
              <div className="text-xs opacity-70 cursor-pointer hover:opacity-100 transition-opacity mt-1">
                View Ticket Summary
                {totalProduct > 0 && (
                  <span className="ml-2">({totalProduct} items)</span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {totalProduct > 0 && (
                <button
                  onClick={resetAll}
                  className="w-full bg-red-500 text-white px-4 py-3 rounded-lg font-bold hover:bg-red-600 transition-colors text-sm"
                >
                  Clear All Items
                </button>
              )}
              <button
                onClick={handleBuyNow}
                disabled={totalProduct === 0}
                className={`w-full py-3 px-4 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 text-sm ${totalProduct === 0 ? 'bg-gray-400 text-gray-200 cursor-not-allowed' : 'bg-white text-green-800 hover:bg-gray-100'}`}
              >
                Buy Now
                {totalProduct > 0 && (
                  <span className="bg-green-700 text-white text-xs px-2 py-1 rounded-full ml-2">
                    {totalProduct}
                  </span>
                )}
              </button>
            </div>
          </div>
          {/* Desktop Layout - Improved version */}
          <div className="hidden sm:block">
            <div className="w-full max-w-6xl mx-auto bg-white bg-opacity-5 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 flex flex-col lg:flex-row gap-6">
                {/* Left side: Cart items */}
                <div className="lg:w-2/3 space-y-4">
                  <div className="flex items-center justify-between border-b border-white border-opacity-20 pb-4">
                    <h3 className="text-xl font-bold text-white">
                      Your Cart {totalProduct > 0 && `(${totalProduct} items)`}
                    </h3>
                    {totalProduct > 0 && (
                      <button
                        onClick={resetAll}
                        className="text-sm text-red-300 hover:text-red-100 transition-colors"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                  {getTicketSummary.length === 0 ? (
                    <div className="py-8 text-center">
                      <p className="text-gray-300">Your cart is empty</p>
                      <p className="text-gray-400 text-sm mt-2">
                        Add tickets to proceed with your purchase
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {getTicketSummary.map((ticket) => (
                        <div
                          key={ticket.id}
                          className="flex items-center justify-between bg-white bg-opacity-5 rounded-lg p-4"
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold text-white">
                              {ticket.title}
                            </h4>
                            {ticket.badgeValue && (
                              <span className="inline-block text-xs bg-green-500 text-white px-2 py-0.5 rounded-full mt-1">
                                {ticket.badgeValue}
                              </span>
                            )}
                            {!ticket.isFree && (
                              <div className="text-xs text-gray-300 mt-1">
                                EUR {ticket.price} × {ticket.quantity}
                              </div>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-300 mb-1">
                              Qty: {ticket.quantity}
                            </div>
                            <div className="text-lg font-bold text-white">
                              {ticket.isFree
                                ? 'FREE'
                                : `EUR ${ticket.subtotal.toFixed(2)}`}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* Right side: Order summary */}
                <div className="lg:w-1/3 bg-white bg-opacity-5 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-white mb-4 border-b border-white border-opacity-20 pb-3">
                    Order Summary
                  </h4>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal</span>
                      <span>EUR {calculateTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>VAT (19%)</span>
                      <span>Included</span>
                    </div>
                    <div className="border-t border-white border-opacity-10 pt-3 flex justify-between font-bold text-white">
                      <span>Total</span>
                      <span className="text-xl">
                        EUR {calculateTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleBuyNow}
                    disabled={totalProduct === 0}
                    className={`w-full py-3 rounded-lg font-bold text-center transition-colors ${totalProduct === 0 ? 'bg-gray-400 text-gray-200 cursor-not-allowed' : 'bg-white text-green-800 hover:bg-gray-100'}`}
                  >
                    Buy Now
                    {totalProduct > 0 && (
                      <span className="bg-green-700 text-white text-xs px-2 py-1 rounded-full ml-2">
                        {totalProduct}
                      </span>
                    )}
                  </button>
                  <div className="text-xs text-gray-400 text-center mt-4">
                    By proceeding, you agree to our Terms & Conditions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default GitexTicketSelection
