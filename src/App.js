import { BrowserRouter, Route, Routes } from "react-router"
import Landing from "./pages/Landing"
import Fleet from "./pages/Fleet"
import SideBar from "./components/fleet_management/Sidebar";
import { useLocation } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <div className="flex">
    <ShowSidebar/>
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/fleet" element={<Fleet/>} />
    </Routes>
    </div>
  </BrowserRouter>
  )
}


const ShowSidebar = () => {
  const location = useLocation();
  const isLanding =
    location.pathname === "/"
  return !isLanding ? (
    <>
      
      <SideBar/>
    </>
  ) : null;
};
export default App