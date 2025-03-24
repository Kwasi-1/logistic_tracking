import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import StatusText from "./StatusText";

const data = [
  {
    title: "Adom Merch Delivery",
    driver: "John Doe",
    status: "Picked Up",
    progress: 33,
    product: "Electronics",
    value: "$5,000",
  },
  {
    title: "Adom Merch Delivery",
    driver: "Jane Smith",
    status: "Halfway There",
    progress: 66,
    product: "Furniture",
    value: "$12,000",
  },
  {
    title: "Adom Merch Delivery",
    driver: "Robert Johnson",
    status: "Delivered",
    progress: 100,
    product: "Groceries",
    value: "$3,500",
  },
];

const DeliveryCard = ({ title, driver, status, progress, product, value }) => {
  return (
    <div className="bg-gray-100 backdrop-blur-sm text-gray-600 p-4 rounded-2xl gap-4 border border-[#e0e6e930] w-full">
      <div className="flex items-start mb-5 justify-between">
        <div>
          <h2 className="font-semibold text-base">{title}</h2>
          <p className="text-gray-600 text-sm">Driver: {driver}</p>
        </div>
        <div className="w-12 h-12">
          <CircularProgressbar
            value={progress}
            text={`${progress}`}
            styles={{
              path: { stroke: progress === 100 ? "#22c55e" : "#facc15" },
              text: {
                fill: progress === 100 ? "#22c55e" : "#facc15",
                fontSize: "28px",
                fontWeight: "bold",
              },
            }}
          />
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <p className="flex gap-1 mt-2">
          <span className="font-medium">Status:</span>
          <StatusText text={status} />
        </p>
        <p>
          Product: <span className="font-semibold">{product}</span>
        </p>
        <p>
          Value: <span className="font-semibold">{value}</span>
        </p>
      </div>
    </div>
  );
};

const Deliveries = () => {
  return (
    <div className="p-4 bg-[#e0e6e930] rounded-xl border border-[#e0e6e930] w-full">
      <h1 className="text-[#4b5563] font-semibold mb-4">Driver Deliveries</h1>
      <div className="flex flex-col gap-4">
        {data.map((item, index) => (
          <DeliveryCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Deliveries;
