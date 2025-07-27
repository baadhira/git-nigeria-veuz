import ApplyingPromoCode from "./components/views/ApplyingPromoCode"
import BestSellerCard from "./components/views/BestSellerCard"
import CardMain from "./components/views/CardMain"
import RegistrationForm from "./components/views/RegistrationForm"
import RegistrationSuccess from "./components/views/RegistrationSuccess"
import GitexTicketSelection from "./components/views/TicketCard"
import TicketList from "./components/views/TicketList"
import WorkshopSelector from "./components/views/WorkshopSelector"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FormProvider } from "./components/context/ProgressBarContext";
import Badgewithfontsizelarge from "./components/views/Badgewithfontsizelarge"

function App() {
  return (
    <FormProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Badgewithfontsizelarge/>} />
        {/* GitexTicketSelection */}
        <Route path="/register-form" element={<RegistrationForm />} />
        <Route path="/promo-code" element={<ApplyingPromoCode />} />
        <Route path="/success" element={<RegistrationSuccess />} />

      </Routes>
    </Router>
    </FormProvider>
  )
}

export default App
