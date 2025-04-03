import React from "react";
import EditsHistory from "./EditsHistory";

const PropertyItem = ({ label, value }) => (
  <div className="text-sm flex flex-col gap-1">
    <span className="text-gray-500">{label}:</span>
    <span className="font-bold text-gray-600">{value}</span>
  </div>
);

const Properties = () => {
  const propertyData = [
    { label: "National ID", value: "01562321" },
    { label: "Name", value: "Chioma Ngozi" },
    { label: "Phone", value: "000 000 0000" },
    { label: "Address", value: "4, Balogun St, Lagos" },
  ];

  return (
    <div className="bg-[#e0e6e930] p-4 rounded-xl border border-[#e0e6e950]">
      <h3 className="text-[17px] font-semibold">Properties</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
        {propertyData.map((item) => (
          <PropertyItem key={item.label} {...item} />
        ))}
      </div>

      <EditsHistory />
    </div>
  );
};

export default Properties;
