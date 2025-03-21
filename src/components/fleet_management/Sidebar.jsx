import { Icon } from "@iconify/react/dist/iconify.js";
import { lowerCase } from "lodash";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/foundry_logo.png";

const SideBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // State to track active sublink
  const [activeSublink, setActiveSublink] = useState(null);

  // Function to determine if a parent menu is highlighted
  function highlight(tuple) {
    if (pathname === `/${tuple[0]}`) return true;
    if (pathname.includes(tuple[0]) && !tuple[1]) return true;
    return false;
  }

  const currentModule = "";

  // Set first sublink as active when the page loads or route changes
  useEffect(() => {
    const firstActiveSublink = MenuItems(currentModule, [])
      .flatMap((item) => item.sublinks)
      .find((sub) => pathname.includes(sub.link));

    if (firstActiveSublink) {
      setActiveSublink(firstActiveSublink.link);
    }
  }, [pathname]);

  return (
    <div className="w-[15%] h-screen py-4 px-2 border-r">
      {/* Logo and title */}
      <div
        onClick={() => navigate("/dashboard")}
        className="grid grid-cols-[2rem,1fr] gap-x-2 pt-2 place-items-center hover:cursor-pointer"
      >
        <img src={logo} className="w-[50%]" alt="Logo" />
        <div className="flex flex-col mr-auto text-gray-600">
          <h1 className="font-medium capitalize">Foundry</h1>
        </div>
      </div>

      {/* Sidebar menu */}
      <div className="flex flex-col w-full h-[calc(100%-1rem)] mx-auto py-8 text-sm">
        {MenuItems(currentModule, []).map((item, index) => {
          const isHighlighted = highlight(item.parent);
          const has_access = true;

          return has_access ? (
            <div
              key={index}
              className={`flex flex-col w-full nav ${
                isHighlighted ? "bg-gray-200/40" : "h-12"
              } rounded-xl p-1 overflow-y-hidden duration-300`}
            >
              {/* Parent Menu Item */}
              <button
                onClick={() => navigate(item.link)}
                className={`${
                  isHighlighted
                    ? `text-black`
                    : "hover:bg-gray-200/10 text-gray-500"
                } rounded-xl p-2 flex flex-row gap-x-3 items-center`}
              >
                <Icon
                  icon={item.icon}
                  className={`text-[19px] flex-shrink-0 ${item?.iconStyle}`}
                />
                <p className="mt-[2px] whitespace-nowrap">{item.title}</p>
              </button>

              {/* Sublinks */}
              <div className="flex flex-col pl-4">
                {item.sublinks.map((sublink, subIndex) => {
                  const isHighlighted = activeSublink === sublink.link;
                  const has_access = true;

                  return has_access ? (
                    <button
                      key={subIndex}
                      onClick={() => setActiveSublink(sublink.link)}
                      className={`${
                        isHighlighted
                          ? "text-black bg-white shadow"
                          : "hover:bg-gray-200/10 text-gray-500"
                      } rounded-xl scrollbar-hide p-2 flex flex-row gap-x-2 items-center my-1 overflow-auto text-ellipsis`}
                    >
                      <Icon
                        icon={sublink.icon}
                        className={`text-[19px] flex-shrink-0 ${sublink?.iconStyle}`}
                      />
                      <p className="mt-[2px] whitespace-nowrap">
                        {sublink.title}
                      </p>
                    </button>
                  ) : null;
                })}
              </div>
            </div>
          ) : null;
        })}

        {/* Logout Button */}
        <button
          onClick={() => {}}
          className="text-standard w-full flex items-center p-2 rounded-lg mt-auto gap-x-2 text-gray-600 hover:text-white transition-all duration-500 hover:bg-red-600"
        >
          <Icon icon="bi:dash-circle" rotate={2} fontSize={20} />
          Log out
        </button>
      </div>
    </div>
  );
};

const MenuItems = (currentModule, permissions = [""]) => {
  const items =
    {
      "": [
        {
          title: "Dashboard",
          icon: "hugeicons:home-02",
          link: "/",
          parent: ["/", true],
          permitted_roles: [],
          sublinks: [],
        },
        {
          title: "Fleet",
          icon: "hugeicons:truck",
          link: "/fleet",
          parent: ["fleet", false],
          permitted_roles: [],
          sublinks: [
            {
              title: "Overview",
              icon: "hugeicons:truck",
              link: "/fleet/overview",
              parent: ["fleet", true],
            },
            {
              title: "Drivers",
              icon: "hugeicons:truck",
              link: "/fleet/loan_stats",
              parent: ["fleet", true],
            },
            {
              title: "Shipment",
              icon: "hugeicons:truck",
              link: "/fleet/delivery_info",
              parent: ["fleet", true],
            },
          ],
        },
        {
          title: "Order Management",
          icon: "hugeicons:document-validation",
          link: "/order_Management",
          parent: ["order_Management", false],
          permitted_roles: [],
          sublinks: [],
        },
        {
          title: "Logistics",
          icon: "hugeicons:cashier-02",
          link: "/logistics",
          parent: ["logistics", false],
          permitted_roles: [],
          sublinks: [],
        },
        {
          title: "Invoices",
          icon: "hugeicons:wallet-add-01",
          link: "/invoices",
          parent: ["invoices", false],
          permitted_roles: [],
          sublinks: [],
        },
      ],
    }[currentModule] || [];

  const availableGlobalModules = [];
  const extractModules = new Set(
    permissions.map((i) => lowerCase(i.split(":")[1]))
  );

  availableGlobalModules.forEach((i) => {
    if (Array.from(extractModules).includes(i.id)) {
      items.push(i);
    }
  });

  return items;
};

export default SideBar;
