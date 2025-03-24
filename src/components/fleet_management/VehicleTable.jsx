import { useState } from "react";

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

const VehicleTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = vehicleData.filter((vehicle) =>
    Object.values(vehicle).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Vehicle Details</h2>
      <input
        type="text"
        placeholder="Search Vehicles..."
        className="p-2 border w-full mb-4 rounded"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">Vehicle ID</th>
            <th className="p-3 text-left">Driver ID</th>
            <th className="p-3 text-left">Model</th>
            <th className="p-3 text-left">Plate</th>
            <th className="p-3 text-left">Capacity</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((vehicle) => (
            <tr key={vehicle.id} className="border-b hover:bg-gray-100">
              <td className="p-3">{vehicle.id}</td>
              <td className="p-3">{vehicle.driverId}</td>
              <td className="p-3">{vehicle.model}</td>
              <td className="p-3">{vehicle.plate}</td>
              <td className="p-3">{vehicle.capacity}</td>
              <td className="p-3">{vehicle.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleTable;
