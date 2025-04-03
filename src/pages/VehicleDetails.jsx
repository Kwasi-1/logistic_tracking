import React from "react";
import MapActivity from "../components/fleet_management/driver/MapActivity";
import AIRecommendation from "../components/fleet_management/driver/AIRecommendation";
import Alerts from "../components/vehicle/Alerts";
import Properties from "../components/fleet_management/driver/Properties";
import VehicleDocuments from "../components/vehicle/VehicleDocuments";

const VehicleDetails = () => {
  const vehicle = {
    id: "1100",
    year: 2018,
    make: "Toyota",
    model: "Prius",
    vin: "JTDKBRFU9J3059307",
    licensePlate: "6TRJ244",
    color: "Silver",
    status: "Active",
    meter: "20,811 mi",
    ownership: "Owned",
    registration: "USA / Midwest Region / Chicago",
    operator: { name: "Jacob Silva", profilePic: "" },
    bodyType: "Hatchback",
    msrp: "$24,950.00",
  };

  const vehicleProperties = [
    { label: "VIN", value: vehicle.vin },
    { label: "License Plate", value: vehicle.licensePlate },
    { label: "Color", value: vehicle.color },
    { label: "Body Type", value: vehicle.bodyType },
    { label: "MSRP", value: vehicle.msrp },
    { label: "Ownership", value: vehicle.ownership },
  ];

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="col-span-2">
          <div className="bg-gray-200/30 p-4 rounded-xl flex items-center space-x-4 h-full">
            <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
            <div>
              <h1 className="text-xl font-bold">
                {vehicle.id} [{vehicle.year} {vehicle.make} {vehicle.model}]
              </h1>
              <p className="text-gray-600">
                {vehicle.meter} • {vehicle.status}
              </p>
              <p className="text-gray-500">
                Managed by{" "}
                <span className="text-blue-600">{vehicle.operator.name}</span>
              </p>
            </div>
          </div>
        </div>
        <AIRecommendation />
      </div>

      {/* Alerts section */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <Alerts />

        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-4">
            {/* Vehicle Details using Properties Component */}
            <Properties data={vehicleProperties} title="details" />

            <MapActivity />
          </div>
          <div className="col-span-2 gap-4 mt-4">
            <VehicleDocuments />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
