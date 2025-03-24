import { useState } from "react";

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

const DriverTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = driverData.filter((driver) =>
    Object.values(driver).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Driver Details</h2>
      <input
        type="text"
        placeholder="Search Drivers..."
        className="p-2 border w-full mb-4 rounded"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">Driver ID</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">License</th>
            <th className="p-3 text-left">Experience</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((driver) => (
            <tr key={driver.id} className="border-b hover:bg-gray-100">
              <td className="p-3">{driver.id}</td>
              <td className="p-3">{driver.name}</td>
              <td className="p-3">{driver.license}</td>
              <td className="p-3">{driver.experience}</td>
              <td className="p-3">{driver.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriverTable;
