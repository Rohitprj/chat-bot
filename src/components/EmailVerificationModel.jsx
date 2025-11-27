"use client";
import React, { useState, useEffect } from "react";

export const VerificationModal = ({ isOpen, onClose }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowContent(true);
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      const timeout = setTimeout(() => {
        setShowContent(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, onClose]);

  if (!isOpen && !showContent) return null;

  const overlayClasses = isOpen ? "opacity-100" : "opacity-0";

  const contentClasses = isOpen
    ? "scale-100 opacity-100"
    : "scale-95 opacity-0";

  const CheckIcon = () => (
    <svg
      className="w-6 h-6 mr-3"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
  );

  const XIcon = () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      ></path>
    </svg>
  );

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center p-4 z-50 transition-opacity bg-black/70 duration-300 ${overlayClasses}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={`bg-white rounded-xl shadow-xl max-w-xs w-full p-4 sm:p-6 transform transition-all duration-300 ${contentClasses}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-start mb-4 border-b pb-3">
          <h3
            id="modal-title"
            className="text-2xl font-bold flex items-center">
            <CheckIcon />
          <span className="text-2xl font-bold  
            bg-gradient-to-r from-[#FF88A5] to-[#FCBB90]  bg-clip-text text-transparent" >            
            Action Required
          </span>
        </h3>

          {/* Close Button (X icon) */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 p-1 rounded-full transition duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            aria-label="Close modal"
          >
            <XIcon />
          </button>
        </div>

        {/* Modal Body */}
        <p className="text-gray-700 text-base mb-6 leading-relaxed">
          <span className="font-semibold text-black">
            Verification Link Sent!
          </span>{" "}
          Please go to your Gmail to click the verification link and complete
          your Verification.
        </p>

        {/* Modal Footer / Primary Action */}
        <div className="text-center">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-white bg-gradient-to-r from-[#FF88A5] to-[#FCBB90] h-10 rounded-full font-medium shadow-md hover:bg-indigo-600 transition duration-150 focus:outline-none cursor-pointer"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};
