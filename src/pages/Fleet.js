import OverallBreakdown from "../components/fleet_management/OverviewBreadown";
import LoanStats from "../components/fleet_management/LoanStats";
import OpenApplications from "../components/fleet_management/OpenApplications";
import OpenApplicationsChart from "../components/fleet_management/OpenApplicationChart";
import LimitVsAgeChart from "../components/fleet_management/LimitVsAgeChart";
import DateFilter from "../components/fleet_management/DateFilter";


const Fleet = () => {
  return (
    <div className=" p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center">
  
      <h1 className="text-2xl font-semibold">Loan</h1>
      
      
      {/* Date Filter */}
      <DateFilter />
      </div>

      <div className="flex  gap-4 mt-4">
        <OverallBreakdown />
        <LoanStats />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <OpenApplications />
        <div className="flex flex-col gap-4">
        <OpenApplicationsChart />
        <LimitVsAgeChart />
      </div>
        
      </div>

      
    </div>
  );
};

export default Fleet;
