import React, { createContext, useState, useContext } from "react";

const ProgressBarContext = createContext();
export const useProgressBarContext = () => useContext(ProgressBarContext);
const steps = [
  { number: 1, label: "Step 1" },
  { number: 2, label: "Step 2" },
  { number: 3, label: "Step 3" },
  { number: 4, label: "Step 4" },
];
export const FormProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    region: "",
    email: "",
    confirmEmail: "",
    nationality: "",
    mobileNumber: "",
    companyName: "",
    jobTitle: "",
    companyType: "",
    industry: "",
    selectedWorkshops:[],
    workshops: {
      "Global Leaders Forum !NEW (3 Days)": false,
      "GITEX Main Stage": false,
      "Artificial Intelligence & Robotics (15)": false,
      "Future Health !NEW (2 Days)": false,
      "Cybersecurity (4 Days)": false,
      "Future Health !NEW (2 Days) - Copy": false,
      "Digital Cities (1 Day)": false,
      "Edtech (1 Day)": false,
      "Energy Transition (1 Day)": false,
      "Intelligent Connectivity (1 Day)": false,
      "Digital Finance (1 Day)": false,
      "Future Mobility (1 Day)": false,
    },
  });
  const resetForm=()=>{
    setFormData({
      firstName: "",
      lastName: "",
      country: "",
      region: "",
      email: "",
      confirmEmail: "",
      nationality: "",
      mobileNumber: "",
      companyName: "",
      jobTitle: "",
      companyType: "",
      industry: "",
      selectedWorkshops:[],
      workshops: {
        "Global Leaders Forum !NEW (3 Days)": false,
        "GITEX Main Stage": false,
        "Artificial Intelligence & Robotics (15)": false,
        "Future Health !NEW (2 Days)": false,
        "Cybersecurity (4 Days)": false,
        "Future Health !NEW (2 Days) - Copy": false,
        "Digital Cities (1 Day)": false,
        "Edtech (1 Day)": false,
        "Energy Transition (1 Day)": false,
        "Intelligent Connectivity (1 Day)": false,
        "Digital Finance (1 Day)": false,
        "Future Mobility (1 Day)": false,
      },
    })
  }
  const [selectedWorkshops, setSelectedWorkshops] = useState([]);
  return (
    <ProgressBarContext.Provider value={{ currentStep, setCurrentStep,steps,formData, setFormData,selectedWorkshops, setSelectedWorkshops,resetForm }}>
      {children}
    </ProgressBarContext.Provider>
  );
};
