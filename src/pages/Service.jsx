import Layout from "../layouts/Layout";
import VehicleRenewalTable from "../components/reminders/VehicleRenewalTable";
import ContactRenewalTable from "../components/reminders/ContactRenewalTable";
import ServiceHistoryTable from "../components/fleet_management/service/ServiceHistoryTable";

const tabs = ["Service History", "Vehicle Renewal", "Contact Renewal"];

const components = {
  "Service History": <ServiceHistoryTable />,
  "Vehicle Renewal": <VehicleRenewalTable />,
  "Contact Renewal": <ContactRenewalTable />,
};

const Service = () => {
  return <Layout title="Service" tabs={tabs} components={components} />;
};

export default Service;
