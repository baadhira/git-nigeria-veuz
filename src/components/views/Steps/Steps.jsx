import React from 'react'
import { ChevronDown, User, Check } from "lucide-react";
import {useProgressBarContext} from '../../context/ProgressBarContext'

function Steps() {
    const {
        currentStep, setCurrentStep,steps
      } = useProgressBarContext();
  return (
    <div className="p-4 md:p-8 mb-0">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => {
              const isCompleted = step.number < currentStep||currentStep===4;
              const isCurrent = step.number === currentStep;

              return (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-bold border-2 transition-all duration-300 ${
                      isCompleted
                        ? "bg-green-600 text-white border-green-600"
                        : isCurrent
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-white text-gray-500 border-gray-300"
                    }`}
                  >
                    {isCompleted ? (
                      <Check size={16} className="w-4 h-4" />
                    ) : (
                      step.number
                    )}
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 mx-2 md:mx-4 rounded-full transition-all duration-300
                ${
                  isCompleted
                    ? "w-16 md:w-32 bg-green-600"
                    : isCurrent
                    ? "w-16 md:w-32 bg-gradient-to-r from-green-600 to-gray-300"
                    : "w-16 md:w-32 bg-gray-300"
                }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
  )
}

export default Steps
