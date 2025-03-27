import Layout from "../layouts/Layout";
import VehicleRenewalTable from "../components/reminders/VehicleRenewalTable";
import FuelHistoryTable from "../components/fleet_management/fuel&energy/FuelHistoryTable";

const tabs = ["Fuel History", "Charging History"];

const components = {
  "Fuel History": <FuelHistoryTable />,
  "Charging History": <VehicleRenewalTable />,
};

const Fuel = () => {
  return (
    <Layout
      title="Fuel and Energy"
      tabs={tabs}
      components={components}
      showDashboard={false}
    />
  );
};

export default Fuel;
