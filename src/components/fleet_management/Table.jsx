import { Icon } from "@iconify/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShipmentDetails from "../fleet_management/ShipmentDetails"; // Import ShipmentDetails

const Table = ({
  columns,
  data,
  searchPlaceholder,
  buttonLabel,
  routePath,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShipment, setSelectedShipment] = useState(null); // State for selected row
  const navigate = useNavigate();

  // Filtered data based on search term
  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Navigate to add shipment
  const handleButtonClick = () => {
    navigate(routePath);
  };

  // Handle row click to show shipment details
  const handleRowClick = (row) => {
    setSelectedShipment(row); // Set clicked row as selected
  };

  return (
    <div className="relative">
      <div className="p-4 bg-white rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="p-2 border rounded-lg focus:outline outline-2"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="p-3 bg-[#619B7D] text-white rounded-lg flex items-center ml-4 hover:bg-[#619B7Dcf]"
            onClick={handleButtonClick}
          >
            <Icon icon="akar-icons:plus" className="mr-2" />
            {buttonLabel}
          </button>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              {columns.map((col) => (
                <th key={col.key} className="p-3 text-left">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr
                key={row.id}
                className="border-b hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRowClick(row)} // Trigger on row click
              >
                {columns.map((col) => (
                  <td key={col.key} className="p-3">
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Shipment Details - Show when row is clicked */}
      {selectedShipment && (
        <div className="fixed top-0 right-0 w-[450px] h-full bg-white shadow-lg z-50 overflow-auto">
          <button
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full"
            onClick={() => setSelectedShipment(null)}
          >
            ✕
          </button>
          <ShipmentDetails shipment={selectedShipment} />
        </div>
      )}
    </div>
  );
};

export default Table;
