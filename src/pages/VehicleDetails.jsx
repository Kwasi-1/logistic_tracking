import Layout from "../layouts/Layout";
import VehicleTable from "../components/fleet_management/VehicleTable";
import MeterHistory from "../components/vehicle/MeterHistory";
import ExpenseHistory from "../components/vehicle/ExpenseHistory";

const tabs = ["Vehicle List", "Meter History", "Expense History"];

const components = {
  "Vehicle List": <VehicleTable />,
  "Meter History": <MeterHistory />,
  "Expense History": <ExpenseHistory />,
};

const VehicleDetails = () => {
  return (
    <Layout
      title="Vehicles"
      tabs={tabs}
      components={components}
      showDashboard={false}
    />
  );
};

export default VehicleDetails;
