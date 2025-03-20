// import { Home, CreditCard, FileText, Shield, Users, LogOut } from "lucide-react";
import { useState } from "react";

const Sidebar = () => {

  const menuItems = [
    { name: "Overview", icon: "", path: "/overview" },
    { name: "Loans", icon: "", path: "/loans" },
    { name: "Application", icon: "", path: "/loans/application" },
    { name: "Disbursements", icon: "", path: "/loans/disbursements" },
    { name: "Booking", icon:"", path: "/loans/booking" },
    { name: "Monitoring", icon: "", path: "/monitoring" },
    { name: "Investment / Account", icon:"", path: "/investment" },
    { name: "Reports", icon:"", path: "/reports" },
    { name: "Sentinel", icon: "", path: "/sentinel" },
    { name: "Organization", icon: "", path: "/organization" },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-100 shadow-md p-4 flex flex-col">
      <div className="text-xl font-bold p-4">Foundry</div>
      <nav className="flex-1">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  setActive(item.path);
                  router.push(item.path);
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-md text-gray-700 hover:bg-gray-200 transition ${
                  active === item.path ? "bg-gray-300 font-semibold" : ""
                }`}
              >
                {item.icon}
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <button
        className="flex items-center gap-3 p-3 text-red-600 hover:bg-red-100 transition rounded-md"
        onClick={() => router.push("/logout")}
      >
        Log out
      </button>
    </aside>
  );
};

export default Sidebar;
