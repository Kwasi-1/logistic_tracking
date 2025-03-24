import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import OpenApplications from "../components/fleet_management/OpenApplications";
import ShipmentTable from "../components/fleet_management/ShipmentTable";
import CreateShipment from "./CreateShipment";

function Shipment() {
  const [showCreateShipment, setShowCreateShipment] = useState(false);

  const handleToggleCreateShipment = () => {
    setShowCreateShipment(!showCreateShipment);
  };

  return (
    <div className="px-8">
      <div className="flex justify-between items-center my-2">
        <h1 className="text-lg">Shipment</h1>

        <button
          className="p-3 bg-[#619B7D] text-white rounded-lg flex items-center"
          onClick={handleToggleCreateShipment}
        >
          <Icon icon="akar-icons:plus" className="mr-2" />
          Add Shipment
        </button>
      </div>

      {showCreateShipment ? (
        <CreateShipment onClose={handleToggleCreateShipment} />
      ) : (
        <>
          {/* <OpenApplications /> */}
          <ShipmentTable />
        </>
      )}
    </div>
  );
}

export default Shipment;
