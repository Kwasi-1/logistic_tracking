import { useState } from "react";
import ShipmentTable from "../components/fleet_management/ShipmentTable";
import ShipmentDetails from "../components/fleet_management/ShipmentDetails";

function Shipment() {
  const [selectedShipment, setSelectedShipment] = useState(null);

  // Function to handle shipment click
  const handleShipmentClick = (shipment) => {
    setSelectedShipment(shipment);
  };

  return (
    <div className="px-8">
      <div className="flex justify-between items-center my-2">
        <h1 className="text-lg">Shipment</h1>
      </div>
      <ShipmentTable onShipmentClick={handleShipmentClick} />
      {selectedShipment && (
        <ShipmentDetails
          shipment={selectedShipment}
          onClose={() => setSelectedShipment(null)}
        />
      )}
    </div>
  );
}

export default Shipment;
