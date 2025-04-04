import DriverSummary from "../components/fleet_management/driver/DriverSummary";
import KYCAlerts from "../components/fleet_management/driver/KYCAlerts";
import Properties from "../components/fleet_management/driver/Properties";
import AIRecommendation from "../components/fleet_management/driver/AIRecommendation";
import ThirdPartyMatches from "../components/fleet_management/driver/ThirdPartyMatches";
import MapActivity from "../components/fleet_management/driver/MapActivity";
import EditButton from "../components/common/EditButton";

const DriverDetails = () => {
  const propertyData = [
    { label: "National ID", value: "01562321" },
    { label: "Name", value: "Chioma Ngozi" },
    { label: "Phone", value: "000 000 0000" },
    { label: "Address", value: "4, Balogun St, Lagos" },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Driver Details</h1>
        <EditButton  />
      </div>

      {/* Summary & AI Score */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="col-span-2">
          <DriverSummary />
        </div>
        <AIRecommendation />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <KYCAlerts />
        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-4">
            <Properties data={propertyData} title="Properties" />

            <MapActivity />
          </div>
          <div className="col-span-2 gap-4 mt-4">
            <ThirdPartyMatches />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDetails;
