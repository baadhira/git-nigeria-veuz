import React from "react";

import { User } from "lucide-react";

export default function GitexSidebar() {
  return (
    <div className="w-full lg:w-80 bg-green-600 text-white relative overflow-hidden">
      {/* Header Image Background */}

      <div className="relative h-32 bg-gradient-to-r from-green-500 to-green-700 overflow-hidden">
        {/* Placeholder for header background image */}

        <div className="absolute inset-0 bg-gradient-to-br from-lime-400 via-green-400 to-green-600 opacity-80">
          {/* Pixelated pattern overlay */}

          <div className="absolute inset-0 opacity-30">
            <div className="grid grid-cols-16 gap-0 h-full">
              {[...Array(128)].map((_, i) => (
                <div
                  key={i}
                  className={`w-full h-full ${
                    Math.random() > 0.7
                      ? "bg-green-300"
                      : Math.random() > 0.5
                      ? "bg-lime-300"
                      : "bg-transparent"
                  }`}
                  style={{
                    opacity: Math.random() * 0.4 + 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Left side image placeholder */}

        <div className="absolute left-4 top-4 w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm">
          <div className="w-12 h-12 bg-white bg-opacity-30 rounded flex items-center justify-center">
            <span className="text-green-600 font-bold text-sm">IMG</span>
          </div>
        </div>
      </div>
      {/* Main Content */}

      <div className="p-6">
        {/* GITEX Header Section */}

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold">GITEX</div>

              <div className="bg-white text-green-600 px-2 py-1 rounded text-xs font-bold">
                Ai
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs">
              <User className="w-4 h-4" />
              <span>NETODA CROWN</span>
            </div>
          </div>

          <div className="text-xs opacity-75 mb-4">
            14-18 OCT 2024 - ABU DHABI - UAE
          </div>

          <div className="bg-green-700 rounded px-3 py-2 text-center text-sm font-bold mb-4">
            Registration Information 1
          </div>
        </div>
        {/* Registration Details */}

        <div className="space-y-3 text-sm opacity-75 mb-8">
          <div className="border-b border-green-500 border-opacity-30 pb-1">
            <span className="text-xs uppercase tracking-wide">FULL NAME</span>

            <div className="text-white opacity-60 text-xs mt-1">
              To be filled
            </div>
          </div>

          <div className="border-b border-green-500 border-opacity-30 pb-1">
            <span className="text-xs uppercase tracking-wide">JOB TITLE</span>

            <div className="text-white opacity-60 text-xs mt-1">
              To be filled
            </div>
          </div>

          <div className="border-b border-green-500 border-opacity-30 pb-1">
            <span className="text-xs uppercase tracking-wide">
              COMPANY NAME
            </span>

            <div className="text-white opacity-60 text-xs mt-1">
              To be filled
            </div>
          </div>

          <div className="border-b border-green-500 border-opacity-30 pb-1">
            <span className="text-xs uppercase tracking-wide">
              COUNTRY OF RESIDENCE
            </span>

            <div className="text-white opacity-60 text-xs mt-1">
              To be filled
            </div>
          </div>
        </div>
        {/* Badge Category */}

        <div className="text-center mb-6">
          <div className="text-sm opacity-75 mb-2 uppercase tracking-wide">
            BADGE CATEGORY
          </div>

          <div className="text-2xl font-bold tracking-wider">VISITOR</div>
        </div>
        {/* Additional Info */}

        <div className="bg-green-700 bg-opacity-50 rounded p-3 text-center text-xs">
          <div className="opacity-75 mb-1">TICKET TYPE</div>
          <div className="font-bold">PREMIUM - FREE</div>
          <div className="opacity-75 text-xs">Incl. 19% VAT</div>
        </div>
      </div>
      {/* Decorative Elements */}

      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20">
        <div className="grid grid-cols-8 gap-1 h-full">
          {[...Array(64)].map((_, i) => (
            <div
              key={i}
              className={`w-full h-full transition-opacity duration-1000 ${
                Math.random() > 0.6 ? "bg-green-400" : "bg-green-500"
              }`}
              style={{
                opacity: Math.random() * 0.6 + 0.4,

                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>
      {/* Top corner accent */}

      <div className="absolute top-0 right-0 w-16 h-16 opacity-20">
        <div className="grid grid-cols-4 gap-1 h-full">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="w-full h-full bg-lime-300 opacity-60"
              style={{
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
