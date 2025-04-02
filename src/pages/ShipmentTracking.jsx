import ShipmentTrackingTable from "../components/logistics/shipment/ShipmentTrackingTable";
import Layout from "../layouts/Layout";

const ShipmentTracking = () => {
  return (
    <Layout
      title="Tracking On time"
      components={{ Overview: <ShipmentTrackingTable /> }}
    />
  );
};

export default ShipmentTracking;
