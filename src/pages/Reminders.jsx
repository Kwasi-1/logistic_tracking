import Layout from "../layouts/Layout";
import VehicleRenewalTable from "../components/reminders/VehicleRenewalTable";
import ContactRenewalTable from "../components/reminders/ContactRenewalTable";
import ServiceRemindersTable from "../components/reminders/ServiceReminderTable";

const tabs = ["Service Reminder", "Vehicle Renewal", "Contact Renewal"];

const components = {
  "Service Reminder": <ServiceRemindersTable />,
  "Vehicle Renewal": <VehicleRenewalTable />,
  "Contact Renewal": <ContactRenewalTable />,
};

const Reminders = () => {
  return (
    <Layout
      title="Reminders"
      tabs={tabs}
      components={components}
      showDashboard={false}
    />
  );
};

export default Reminders;
