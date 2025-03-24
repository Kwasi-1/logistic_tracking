import { useState } from "react";

const shipmentData = [
  {
    id: "SHP-301",
    order: "ORD-789",
    pickup: "Accra",
    destination: "Kumasi",
    date: "20/03/2025",
    status: "In Transit",
  },
  {
    id: "SHP-302",
    order: "ORD-456",
    pickup: "Tema",
    destination: "Takoradi",
    date: "19/03/2025",
    status: "Delivered",
  },
];

const ShipmentTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = shipmentData.filter((shipment) =>
    Object.values(shipment).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Shipment Details</h2>
      <input
        type="text"
        placeholder="Search Shipments..."
        className="p-2 border w-full mb-4 rounded"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">Shipment ID</th>
            <th className="p-3 text-left">Order</th>
            <th className="p-3 text-left">Pickup</th>
            <th className="p-3 text-left">Destination</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((shipment) => (
            <tr key={shipment.id} className="border-b hover:bg-gray-100">
              <td className="p-3">{shipment.id}</td>
              <td className="p-3">{shipment.order}</td>
              <td className="p-3">{shipment.pickup}</td>
              <td className="p-3">{shipment.destination}</td>
              <td className="p-3">{shipment.date}</td>
              <td className="p-3">{shipment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShipmentTable;
