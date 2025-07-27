import ApplyingPromoCode from "./components/views/ApplyingPromoCode"
import BestSellerCard from "./components/views/BestSellerCard"
import CardMain from "./components/views/CardMain"
import RegistrationForm from "./components/views/RegistrationForm"
import RegistrationSuccess from "./components/views/RegistrationSuccess"
import GitexTicketSelection from "./components/views/TicketCard"
import TicketList from "./components/views/TicketList"
import WorkshopSelector from "./components/views/WorkshopSelector"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GitexTicketSelection/>} />
        <Route path="/summary" element={<RegistrationForm />} />
      </Routes>
    </Router>
  )
}

export default App
