import Table from "../fleet_management/Table";

const invoiceData = [
  {
    id: "ACC-SINV-2025-00837",
    customer: "EAGNACIOUS - GINO",
    creation: "17/02/2025, 02:27 PM",
    modified: "31/03/2025, 10:52 AM",
    currency: "GHS",
    purchase: "₵232,380.00 (1480 items)",
    paidAmount: "₵40,750.00",
    outstanding: "₵191,630.00",
    discount: "₵0",
    status: "Overdue",
  },
  {
    id: "ACC-SINV-2025-00941",
    customer: "EAGNACIOUS - GINO",
    creation: "04/02/2025, 10:49 PM",
    modified: "31/03/2025, 10:50 AM",
    currency: "GHS",
    purchase: "₵42,300.00 (300 items)",
    paidAmount: "₵42,300.00",
    outstanding: "₵0",
    discount: "₵0",
    status: "Paid",
  },
  {
    id: "ACC-SINV-2025-00884",
    customer: "EAGNACIOUS - GINO",
    creation: "17/02/2025, 11:08 PM",
    modified: "31/03/2025, 10:49 AM",
    currency: "GHS",
    purchase: "₵6,950.00 (50 items)",
    paidAmount: "₵6,950.00",
    outstanding: "₵0",
    discount: "₵0",
    status: "Paid",
  },
  {
    id: "ACC-SINV-2025-00925",
    customer: "JOELLA ENT.",
    creation: "19/02/2025, 08:29 AM",
    modified: "30/03/2025, 04:49 PM",
    currency: "GHS",
    purchase: "₵2,630.00 (10 items)",
    paidAmount: "₵2,630.00",
    outstanding: "₵0",
    discount: "₵0",
    status: "Paid",
  },
  {
    id: "ACC-SINV-2025-01370",
    customer: "ENOCH",
    creation: "07/03/2025, 07:58 AM",
    modified: "30/03/2025, 04:44 PM",
    currency: "GHS",
    purchase: "₵66,280.00 (340 items)",
    paidAmount: "₵66,280.00",
    outstanding: "₵0",
    discount: "₵0",
    status: "Paid",
  },
  {
    id: "ACC-SINV-2025-00463",
    customer: "Mother’s Day",
    creation: "03/02/2025, 01:32 PM",
    modified: "30/03/2025, 04:37 PM",
    currency: "GHS",
    purchase: "₵840.00 (3 items)",
    paidAmount: "₵792.00",
    outstanding: "₵48.00",
    discount: "₵0",
    status: "Overdue",
  },
];

const columns = [
  { key: "id", label: "Invoice" },
  { key: "customer", label: "Customer" },
  { key: "creation", label: "Creation" },
  { key: "modified", label: "Modified" },
  { key: "currency", label: "Currency" },
  { key: "purchase", label: "Purchase" },
  { key: "paidAmount", label: "Paid Amount" },
  { key: "outstanding", label: "Outstanding" },
  { key: "discount", label: "Discount" },
  { key: "status", label: "Status" },
];

const InvoiceHistory = () => {
  return (
    <Table
      columns={columns}
      data={invoiceData}
      searchPlaceholder="Search invoices..."
    />
  );
};

export default InvoiceHistory;
