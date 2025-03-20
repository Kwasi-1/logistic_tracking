import { BrowserRouter, Route, Routes } from "react-router"
import Landing from "./pages/Landing"
import Fleet from "./pages/Fleet"

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/fleet" element={<Fleet/>} />
    </Routes>
  </BrowserRouter>
  )
}
export default App