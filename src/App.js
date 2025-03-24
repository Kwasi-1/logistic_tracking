// index.js or App.js
import './index.css';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import Fleet from "./pages/Fleet";
import SideBar from "./components/fleet_management/Sidebar";
import Shipment from "./pages/Shipment";
import DriverDetails from "./pages/DriverDetails";
import VehicleDetails from "./pages/VehicleDetails";
import CreateShipment from './pages/CreateShipment';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <div className="flex">
      {!isLanding && <SideBar />}
      <div className={!isLanding ? "w-[85%] ml-[15%]" : "w-full"}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/fleet/shipment" element={<Shipment />} />
          <Route path="/fleet/drivers" element={<DriverDetails />} />
          <Route path="/fleet/vehicle" element={<VehicleDetails />} />
          <Route path="/fleet/shipment/add" element={<CreateShipment />} />
          <Route path="/fleet/drivers/add" element={<CreateShipment />} />
          <Route path="/fleet/vehicle/add" element={<CreateShipment />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;
