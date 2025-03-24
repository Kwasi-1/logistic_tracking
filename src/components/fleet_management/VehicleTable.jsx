import Table from "./Table";

const vehicleColumns = [
  { key: "id", label: "Vehicle ID" },
  { key: "driverId", label: "Driver ID" },
  { key: "model", label: "Model" },
  { key: "plate", label: "Plate" },
  { key: "capacity", label: "Capacity" },
  { key: "status", label: "Status" },
];

const vehicleData = [
  {
    id: "VEH-201",
    driverId: "DRV-102",
    model: "Volvo FH16",
    plate: "GT-1234-22",
    capacity: "25 Tons",
    status: "Operational",
  },
  {
    id: "VEH-202",
    driverId: "DRV-101",
    model: "Ford Transit",
    plate: "BA-5678-19",
    capacity: "3 Tons",
    status: "Maintenance",
  },
];

const VehicleTable = () => (
  <Table
    columns={vehicleColumns}
    data={vehicleData}
    searchPlaceholder="Search Vehicles..."
    buttonLabel="Add Vehicle"
    routePath={"/fleet/vehicles/add"}
  />
);

export default VehicleTable;
