import { Icon } from "@iconify/react/dist/iconify.js";
import OpenApplications from "../components/fleet_management/OpenApplications";
import ShipmentTable from "../components/fleet_management/ShipmentTable";

function Shipment() {
  return (
    <div className="px-8">
      <div className="flex justify-between items-center my-2">
        <h1 className="text-lg">Shipment</h1>
      </div>
      {/* <OpenApplications /> */}
      <ShipmentTable />
    </div>
  );
}
export default Shipment;
