import Layout from "../layouts/Layout";
import ServiceHistoryTable from "../components/fleet_management/service/ServiceHistoryTable";

const dashboardStats = [
  { label: "Overdue Assets", value: "3" },
  { label: "Due Soon Assets", value: "1" },
  { label: "Snoozed Assets", value: "0" },
  { label: "Average Compliance", value: "44%" },
];

const Service = () => {
  return (
    <Layout
      title="Service"
      components={{ Overview: <ServiceHistoryTable /> }}
      showDashboard={true}
      defaultDashboardData={dashboardStats}
    />
  );
};

export default Service;
