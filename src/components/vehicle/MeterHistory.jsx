import Table from "../fleet_management/Table";

const MeterHistory = () => {
  const columns = [
    { key: "asset", label: "Asset" },
    { key: "meterDate", label: "Meter Date" },
    { key: "meterValue", label: "Meter Value" },
    { key: "meterType", label: "Meter Type" },
    { key: "void", label: "Void" },
    { key: "source", label: "Source" },
    { key: "voidStatus", label: "Void Status" },
    { key: "autoVoidReason", label: "Auto-Void Reason" },
  ];

  const data = [
    {
      id: 1,
      asset: "2100 [2016 Ford F-150]",
      meterDate: "03/17/2025",
      meterValue: "56,491 mi",
      meterType: "Primary",
      void: "-",
      source: "GPS Integration",
      voidStatus: "-",
      autoVoidReason: "-",
    },
    {
      id: 2,
      asset: "2100 [2016 Ford F-150]",
      meterDate: "03/17/2025",
      meterValue: "56,398 mi",
      meterType: "Primary",
      void: "-",
      source: "Issue #4",
      voidStatus: "-",
      autoVoidReason: "-",
    },
    {
      id: 3,
      asset: "1100 [2018 Toyota Prius]",
      meterDate: "03/17/2025",
      meterValue: "20,811 mi",
      meterType: "Primary",
      void: "-",
      source: "GPS Integration",
      voidStatus: "-",
      autoVoidReason: "-",
    },
    {
      id: 4,
      asset: "1100 [2018 Toyota Prius]",
      meterDate: "03/17/2025",
      meterValue: "20,778 mi",
      meterType: "Primary",
      void: "-",
      source: "Issue #5",
      voidStatus: "-",
      autoVoidReason: "-",
    },
    {
      id: 5,
      asset: "2100 [2016 Ford F-150]",
      meterDate: "03/16/2025",
      meterValue: "56,362 mi",
      meterType: "Primary",
      void: "-",
      source: "Fuel Entry #175744358",
      voidStatus: "-",
      autoVoidReason: "-",
    },
  ];

  return (
    <Table
      columns={columns}
      data={data}
      searchPlaceholder="Search Meter History..."
      buttonLabel="Add Meter Entry"
      onRowClick={(row) => console.log("Row clicked:", row)}
      onButtonClick={() => console.log("Add Meter Entry Clicked")}
    />
  );
};

export default MeterHistory;
