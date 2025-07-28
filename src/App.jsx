import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FormProvider } from "./components/context/ProgressBarContext";
import RegistrationForm from "./components/views/Registration/RegistrationForm";
import RegistrationSuccess from "./components/views/Registration/RegistrationSuccess";
import ApplyingPromoCode from "./components/views/Promo/ApplyingPromoCode"
import GitexTicketSelection from "./components/views/Tickets/TicketCard";

function App() {
  return (
    <FormProvider>
    <Router>
      <Routes>
        <Route path="/" element={<GitexTicketSelection/>} />
        <Route path="/register-form" element={<RegistrationForm/>} />
        <Route path="/promo-code" element={<ApplyingPromoCode/>} />
        <Route path="/success" element={<RegistrationSuccess/>} />
      </Routes>
    </Router>
    </FormProvider>
  )
}

export default App
