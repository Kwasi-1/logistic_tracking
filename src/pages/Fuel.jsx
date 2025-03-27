import Layout from "../layouts/Layout";
import VehicleRenewalTable from "../components/reminders/VehicleRenewalTable";
import FuelHistoryTable from "../components/fleet_management/fuel&energy/FuelHistoryTable";
import Dashboard from "../layouts/Dashboard";

const tabs = ["Fuel History", "Charging History"];

const components = {
  "Fuel History": <FuelHistoryTable />,
  "Charging History": <VehicleRenewalTable />,
};

const dashboardStats = [
  { label: "Total Charging Cost", value: "$634.83" },
  { label: "Total Energy", value: "247.17 kWh" },
  { label: "Average Energy Economy", value: "25.78 mpg (US)" },
  { label: "Avg. Cost", value: "$2.57 / gallon" },
];

const Fuel = () => {
  return (
    <Layout
      title="Fuel and Energy"
      tabs={tabs}
      components={components}
      showDashboard={true}
      dashboardComponent={<Dashboard stats={dashboardStats} />}
    />
  );
};

export default Fuel;
