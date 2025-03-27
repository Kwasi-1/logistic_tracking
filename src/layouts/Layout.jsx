import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";

const Layout = ({
  title,
  tabs,
  components,
  showDashboard = false,
  dashboardData = {},
  defaultDashboardData = null,
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]); // Default to first tab
  const [currentDashboardData, setCurrentDashboardData] =
    useState(defaultDashboardData);

  // Update dashboard only if the tab has new data
  useEffect(() => {
    if (dashboardData[activeTab]) {
      setCurrentDashboardData(dashboardData[activeTab]);
    }
  }, [activeTab, dashboardData]);

  return (
    <div className="px-8 h-screen">
      {/* Header */}
      <div className="flex justify-between items-center py-5">
        <h1 className="font-semibold text-2xl">{title}</h1>
      </div>

      {/* Show Dashboard Only When Required */}
      {showDashboard && currentDashboardData && (
        <div className="mb-4">
          <Dashboard stats={currentDashboardData} />
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="bg-gray-200/30 h-full rounded-t-xl border border-[#e0e6e930]">
        <nav className="flex px-5">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 text-gray-500 border-t-2 transition-colors duration-200 text-xs ${
                activeTab === tab
                  ? "text-green-600 font-medium border-green-600"
                  : "border-transparent hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="px-4">
          {components[activeTab] || <p>No content available</p>}
        </div>
      </div>
    </div>
  );
};

export default Layout;
