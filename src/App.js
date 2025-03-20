import { BrowserRouter, Route, Routes } from "react-router"
import Landing from "./pages/Landing"

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/fleet" element={<fleet/>} />
    </Routes>
  </BrowserRouter>
  )
}
export default App