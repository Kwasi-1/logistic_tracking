import { title } from "process";
import React from "react";

const DataItem = ({ label, value, highlight = false }) => (
  <div className="flex justify-between text-[13px]">
    <span className="text-gray-400">{label}:</span>
    <span className={highlight ? "text-red-500 font-bold" : "font-semibold"}>
      {value}
    </span>
  </div>
);

const matchData = [
  {
    title: "Road Worthy",
    image: "https://pbs.twimg.com/media/DSnT4RDW4AAYYX2.jpg:large",
  },
  {
    title: "Insurance Papers",
    image:
      "https://www.adomonline.com/wp-content/uploads/2020/01/6359862497128_9820446995914-Copy-696x464.jpg",
  },
  {
    title: "Ownership Papers",
    image:
      "https://www.sellmycar.ca/wp-content/uploads/2023/03/car-transfer-application.jpg",
  },
];

const VehicleDocuments = () => {
  return (
    <div className="bg-gray-200/30 p-4 rounded-xl border border-[#e0e6e990] text-gray-700">
      <div className="flex justify-between items-center border-b border-[#e0e6e9] pb-2">
        <h3 className="text-[17px] font-semibold">Documents</h3>
        <div className="text-xs text-gray-400">4 RESULTS</div>
      </div>

      {/* Scrollable Container for Cards */}
      <div className="mt-4 flex space-x-4 overflow-x-auto scrollbar-hide p-2">
        {matchData.map((match, index) => (
          <div
            key={index}
            className="p-4 rounded-lg min-w-[320px] border border-gray-200"
          >
            <div className="flex items-center space-x-3 border-b border-gray-200 pb-2">
              <div>
                <h3 className="text-sm font-semibold">{match.title}</h3>
                {/* <p className="text-xs text-gray-400">
                  AML - 3rd Party Entity Resolution
                </p> */}
              </div>
            </div>

            <div className="rounded-lg w-full h-32">
              <img
                src={match.image}
                alt="Document"
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleDocuments;
