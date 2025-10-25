import React from "react";

export const LoadingDots = () => {
  const animationStyles = `
    @keyframes wave {
      0%, 40%, 100% {
        transform: translateY(0);
      }
      20% {
        transform: translateY(-8px);
      }
    }
  `;

  return (
    <>
      <style>{animationStyles}</style>

      <div className="flex items-end space-x-2">
        <div
          className="w-3 h-3 bg-[#FF88A5] rounded-full"
          style={{
            animation: "wave 1.2s infinite ease-in-out",
            animationDelay: "0s",
          }}
        />

        <div
          className="w-3 h-3 bg-[#FF88A5] rounded-full"
          style={{
            animation: "wave 1.2s infinite ease-in-out",
            animationDelay: "0.15s",
          }}
        />

        <div
          className="w-3 h-3 bg-[#FF88A5] rounded-full"
          style={{
            animation: "wave 1.2s infinite ease-in-out",
            animationDelay: "0.3s",
          }}
        />
      </div>
    </>
  );
};
