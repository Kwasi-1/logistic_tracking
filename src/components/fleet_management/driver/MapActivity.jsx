import React from "react";
import ShipmentMap from "../ShipmentMap";
import DriverLastSeenMap from "./DriverLastSeenMap";

const MapActivity = () => {
  const lastSeenLocation = [3.3792, 6.5244];

  return (
    <div className="bg-[#e0e6e930] p-4 rounded-xl border border-[#e0e6e930] h-full">
      <h3 className="text-lg font-semibold">Address and Activity</h3>
      <div className="mt-2 bg-gray-200/50 h-fit rounded overflow-hidden">
        <DriverLastSeenMap lastSeenLocation={lastSeenLocation} />
      </div>
    </div>
  );
};

export default MapActivity;
