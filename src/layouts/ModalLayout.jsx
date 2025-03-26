import { Icon } from "@iconify/react";
import { useState } from "react";

function ModalLayout({ isOpen, onClose, title, description, tabs, children }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => setActiveTab(index);
  const handleBackdropClick = (e) => {
    if (e.target.id === "backdrop") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="backdrop"
      className="fixed inset-0 bg-black bg-opacity-50 z-50"
      onClick={handleBackdropClick}
    >
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg w-1/2 transition-transform duration-300 overflow-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-200 hover:text-gray-300 text-2xl font-bold"
        >
          &times;
        </button>

        {/* Modal Header */}
        <div className="mb-3 bg-[#619B7D] py-6 px-[30px] text-white">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p>{description}</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-around px-2 text-sm">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`flex-1 flex items-center space-x-2 text-left py-2 mx-3 border-t-4 font-semibold ${
                activeTab === index
                  ? "border-[#619B7D] text-[#619B7D]"
                  : "text-gray-400 border-[#F5F6F7]"
              }`}
              onClick={() => handleTabClick(index)}
            >
              {/* Selector Circle */}
              <span
                className={`w-[14px] h-[14px] flex items-center justify-center rounded-full border-2 ${
                  activeTab === index
                    ? "border-[#619B7D] bg-[#619B7D] text-white"
                    : "border-gray-400 bg-white"
                }`}
              >
                {activeTab === index && (
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                )}
              </span>

              <span>{tab}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="px-6 py-4">{children[activeTab]}</div>

        {/* Buttons */}
        <div className="absolute bottom-0 left-0 right-0 bg-white p-4 grid grid-cols-2 gap-4">
          <button
            onClick={() => setActiveTab((prev) => Math.max(prev - 1, 0))}
            disabled={activeTab === 0}
            className={`px-4 py-2 rounded-xl border ${
              activeTab === 0
                ? "border-gray-300 text-gray-500 cursor-not-allowed"
                : "border-red-300 text-red-600"
            }`}
          >
            Previous
          </button>

          {activeTab < tabs.length - 1 ? (
            <button
              onClick={() =>
                setActiveTab((prev) => Math.min(prev + 1, tabs.length - 1))
              }
              className="px-4 py-2 bg-[#619B7D] text-white rounded-xl"
            >
              Next
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#619B7D] text-white rounded-xl"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModalLayout;
