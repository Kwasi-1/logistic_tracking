import Table from "./Table";

const driverColumns = [
  { key: "id", label: "Driver ID" },
  { key: "name", label: "Name" },
  { key: "license", label: "License" },
  { key: "experience", label: "Experience" },
  { key: "status", label: "Status" },
];

const driverData = [
  {
    id: "DRV-101",
    name: "John Doe",
    license: "A12345",
    experience: "5 years",
    status: "Active",
  },
  {
    id: "DRV-102",
    name: "Jane Smith",
    license: "B67890",
    experience: "3 years",
    status: "Inactive",
  },
];

const DriverTable = () => (
  <Table
    columns={driverColumns}
    data={driverData}
    searchPlaceholder="Search Drivers..."
    buttonLabel="Add Driver"
    routePath={"/fleet/drivers/add"}
  />
);

export default DriverTable;
