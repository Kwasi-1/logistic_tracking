import { BrowserRouter, Route, Routes } from "react-router"
import Landing from "./pages/Landing"
import Fleet from "./pages/Fleet"
import SideBar from "./components/fleet_management/Sidebar";
import { useLocation } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <div className="flex public-sans-body">
    <ShowSidebar/>
    <div className="w-[85%] ml-[15%]">
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/fleet" element={<Fleet/>} />
    </Routes>
    </div>
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