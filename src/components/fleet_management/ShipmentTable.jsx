import Table from "./Table";

const shipmentColumns = [
  { key: "id", label: "Shipment ID" },
  { key: "order", label: "Order" },
  { key: "pickup", label: "Pickup" },
  { key: "destination", label: "Destination" },
  { key: "date", label: "Date" },
  { key: "status", label: "Status" },
];

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

const ShipmentTable = ({ onShipmentClick }) => (
  <Table
    columns={shipmentColumns}
    data={shipmentData}
    searchPlaceholder="Search Shipments..."
    buttonLabel="Add Shipment"
    routePath={"/fleet/shipment/add"}
    onRowClick={onShipmentClick} // Pass the click handler
  />
);

export default ShipmentTable;
