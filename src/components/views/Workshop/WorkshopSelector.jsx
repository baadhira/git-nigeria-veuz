import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import headerBg from "../../assets/images/header.png";
const WorkshopSelector = ({ onClose ,selectedWorkshops, setSelectedWorkshops}) => {
  // const [selectedWorkshops, setSelectedWorkshops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const leftWorkshops = [
    {
      id: "global-leaders",
      name: "Global Leaders Forum INEW",
      duration: "3 Days",
    },
    { id: "gitex", name: "GITEX Main Stage", duration: null },
    {
      id: "ai-robotics",
      name: "Artificial Intelligence & Robotics",
      duration: "15",
    },
    { id: "ai-everything", name: "AI Everything", duration: "4 Days" },
    { id: "cybersecurity", name: "Cybersecurity", duration: "4 Days" },
    { id: "future-health", name: "Future Health INEW", duration: "2 Days" },
  ];

  const rightWorkshops = [
    { id: "digital-cities", name: "Digital Cities", duration: "1 Day" },
    { id: "edtech", name: "Edtech", duration: "1 Day" },
    { id: "energy-transition", name: "Energy Transition", duration: "1 Day" },
    {
      id: "intelligent-connectivity",
      name: "Intelligent Connectivity",
      duration: "1 Day",
    },
    { id: "digital-finance", name: "Digital Finance", duration: "1 Day" },
    { id: "future-mobility", name: "Future Mobility", duration: "1 Day" },
  ];

  const allWorkshops = [...leftWorkshops, ...rightWorkshops];

 const handleWorkshopToggle = (workshop) => {
  setSelectedWorkshops((prev) => {
    const exists = prev.find((w) => w.id === workshop.id);
    if (exists) {
      return prev.filter((w) => w.id !== workshop.id);
    } else {
      return [...prev, { id: workshop.id, name: workshop.name }];
    }
  });
};


  const handleCancel = () => {
    setSelectedWorkshops([]);
    setSearchTerm("");
    onClose();
  };

  const handleApply = () => {
    console.log("Selected workshops:", selectedWorkshops);
    // Handle apply logic here
    onClose();
  };

  const filteredLeftWorkshops = leftWorkshops.filter((workshop) =>
    workshop.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRightWorkshops = rightWorkshops.filter((workshop) =>
    workshop.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const hasFilteredResults =
    filteredLeftWorkshops.length > 0 || filteredRightWorkshops.length > 0;
 useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="flex flex-col bg-white">
      {console.log(selectedWorkshops,'selectedWorkshops')}
      <div className="flex-1 flex flex-col">
        <div
          className="bg-gradient-to-r from-lime-400 to-green-500 p-6 flex justify-between items-center flex-shrink-0 bg-cover bg-center bg-no-repeat relative"
          style={{ backgroundImage: `url(${headerBg})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <h1 className="text-white text-xl font-bold relative z-10">
            SELECT SOLUTIONS/PRODUCTS
          </h1>
          <button
            onClick={() => onClose()}
            className="text-white rounded-full p-1 ring-1 ring-white hover:bg-white hover:bg-opacity-20 transition-colors relative z-10"
          >
            <X size={24} />
          </button>
        </div>

        <div className="bg-white p-8 flex-1 overflow-auto">
          <div className="mb-2 font-alexandria">
            <input
              type="text"
              placeholder="Try Product/Service"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
            />
          </div>

          <div className="mb-2">
            <p className="text-sm text-gray-600 leading-relaxed">
              I Am Interested In Sourcing The Following Solutions/Products?
              (Select Top 5) * Please Ensure You Have Chosen At Least One
              Category In Each Section
            </p>
          </div>

          <div className="mb-8">
            {searchTerm ? (
              <div className="space-y-4 font-alexandria">
                {allWorkshops
                  .filter((workshop) =>
                    workshop.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((workshop) => (
                    <div
                      key={workshop.id}
                      className="flex items-center space-x-3 font-light"
                    >
                      <input
                        type="checkbox"
                        id={workshop.id}
                        checked={selectedWorkshops.some((w) => w.id === workshop.id)}

                        onChange={() =>handleWorkshopToggle(workshop)
}
                        className="accent-green-700 w-5 h-5 text-green-500 border-2 border-gray-300 rounded focus:ring-green-500 focus:ring-2 checked:bg-green-500 checked:border-green-500 relative"
                      />

                      <label
                        htmlFor={workshop.id}
                        className="flex-1 text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
                      >
                        <span className="font-medium">{workshop.name}</span>
                        {workshop.duration && (
                          <span className="text-gray-500 ml-1">
                            ({workshop.duration})
                          </span>
                        )}
                      </label>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {filteredLeftWorkshops.map((workshop) => (
                    <div
                      key={workshop.id}
                      className="flex items-center space-x-3"
                    >
                      <input
                        type="checkbox"
                        id={workshop.id}
                        checked={selectedWorkshops.some((w) => w.id === workshop.id)}

                        onChange={() =>handleWorkshopToggle(workshop)
}
                        className=
                        "accent-green-700 w-5 h-5 text-green-500 border-2 border-gray-300 rounded focus:ring-green-500 focus:ring-2 checked:bg-green-500 checked:border-green-500 w-5 h-5 text-green-500 border-2 border-gray-300 rounded focus:ring-green-500 focus:ring-2 checked:bg-green-500 checked:border-green-500 relative"
                      />
                      <label
                        htmlFor={workshop.id}
                        className="flex-1 text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
                      >
                        <span className="font-medium">{workshop.name}</span>
                        {workshop.duration && (
                          <span className="text-gray-500 ml-1 font-medium">
                            ({workshop.duration})
                          </span>
                        )}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  {filteredRightWorkshops.map((workshop) => (
                    <div
                      key={workshop.id}
                      className="flex items-center space-x-3"
                    >
                      <input
                        type="checkbox"
                        id={workshop.id}
                        checked={selectedWorkshops.some((w) => w.id === workshop.id)}

                        onChange={() =>handleWorkshopToggle(workshop)
}
                        className="accent-green-700 w-5 h-5 border-2 border-gray-300 rounded checked:bg-green-500 checked:border-green-500 focus:ring-green-500 focus:ring-2"
                      />
                      <label
                        htmlFor={workshop.id}
                        className="flex-1 text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
                      >
                        <span className="font-medium">{workshop.name}</span>
                        {workshop.duration && (
                          <span className="text-gray-500 ml-1">
                            ({workshop.duration})
                          </span>
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-end">
            <button
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium order-2 sm:order-1"
            >
              CANCEL
            </button>
            <button
              onClick={handleApply}
              className="px-6 py-2 text-white rounded-lg transition-colors font-medium order-1 sm:order-2 bg-[linear-gradient(90deg,_#27963D_0%,_#134323_100%)]"
            >
              APPLY
            </button>
          </div>

          {selectedWorkshops.length > 0 && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm">
                Selected {selectedWorkshops.length} workshop
                {selectedWorkshops.length !== 1 ? "s" : ""}
                {selectedWorkshops.length > 5 && (
                  <span className="text-orange-600 ml-2">
                    (Note: Please select top 5 only)
                  </span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkshopSelector;
