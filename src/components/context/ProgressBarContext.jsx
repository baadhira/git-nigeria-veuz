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
  return (
    <ProgressBarContext.Provider value={{ currentStep, setCurrentStep,steps }}>
      {children}
    </ProgressBarContext.Provider>
  );
};
