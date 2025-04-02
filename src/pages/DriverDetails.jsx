import DriverSummary from "../components/fleet_management/driver/DriverSummary";
import KYCAlerts from "../components/fleet_management/driver/KYCAlerts";
import Properties from "../components/fleet_management/driver/Properties";
import EditsHistory from "../components/fleet_management/driver/EditsHistory";
import AIRecommendation from "../components/fleet_management/driver/AIRecommendation";
import ThirdPartyMatches from "../components/fleet_management/driver/ThirdPartyMatches";
import MapActivity from "../components/fleet_management/driver/MapActivity";

const DriverDetails = () => {
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-xl font-semibold">Driver Details</h1>

      {/* Summary & AI Score */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="col-span-2">
          <DriverSummary />
        </div>
        <AIRecommendation />
      </div>

      {/* KYC Alerts & Map */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <KYCAlerts />
        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-4">
            <Properties />

            <MapActivity />
          </div>
          <div className="col-span-2 gap-4 mt-4">
            <ThirdPartyMatches />
          </div>
        </div>
      </div>

      {/* Properties, Edits, and 3rd Party Matches */}
    </div>
  );
};

export default DriverDetails;
