import { useState } from "react";
import DriverModal from "./DriverModal";
import Table from "../Table";
import { useNavigate } from "react-router";

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
    licenseType: "A",
    experience: "5 years",
    status: "Active",
    phone: "123-456-7890",
    address: "123 Main St, City",
    accidentHistory: "2 Incidents",
  },
  {
    id: "DRV-102",
    name: "Jane Smith",
    license: "B67890",
    licenseType: "D",
    experience: "3 years",
    status: "Inactive",
    phone: "987-654-3210",
    address: "456 Elm St, City",
    accidentHistory: "No Incidents",
  },
];

const DriverTable = () => {
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleRowClick = (driver) => {
    navigate(`/fleet/drivers/driver_info`, { state: { driver } });
  };

  const handleAddDriver = () => {
    setIsDriverModalOpen(true);
  };

  const handleCloseDriverModal = () => {
    setIsDriverModalOpen(false);
  };

  return (
    <div>
      <Table
        columns={driverColumns}
        data={driverData}
        searchPlaceholder="Search Drivers..."
        buttonLabel="Add Driver"
        onButtonClick={handleAddDriver}
        onRowClick={handleRowClick} // Pass selected driver data
      />

      <DriverModal
        isOpen={isDriverModalOpen}
        onClose={handleCloseDriverModal}
      />
    </div>
  );
};

export default DriverTable;
