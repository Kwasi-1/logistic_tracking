import Layout from "../layouts/Layout";
import VehicleTable from "../components/fleet_management/VehicleTable";
import VehicleRenewalTable from "../components/reminders/VehicleRenewalTable";
import ContactRenewalTable from "../components/reminders/ContactRenewalTable";
import ServiceRemindersTable from "../components/reminders/ServiceReminderTable";

const tabs = ["Service Reminder", "Vehicle Renewal", "Contact Renewal"];

const components = {
  "Service Reminder": <ServiceRemindersTable />,
  "Vehicle Renewal": <VehicleRenewalTable />,
  "Contact Renewal": <ContactRenewalTable />,
};

const VehicleDetails = () => {
  return <Layout title="Reminders" tabs={tabs} components={components} />;
};

export default VehicleDetails;
