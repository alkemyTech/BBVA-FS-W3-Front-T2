import { Routes, Route } from "react-router-dom";
import navLinks from "./constants/navLinks";
import NavBar from "./components/Header/NavBar";
import Footer from "./components/Footer/Footer";
import LoginForm from "./forms/LoginForm.jsx";
import "./App.css";
import RegisterForm from "./forms/RegisterForm.jsx";
import Deposit from "./pages/Deposit/Deposit";
import FixedTerm from "./pages/FixedTerm/FixedTerm";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  return (
    <div className="app-container">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <NavBar navLinks={navLinks} />
      <Routes>
        {/* Posteriormente, al atributo element se le pasará la page que corresponda */}
        <Route path="/" />
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/depositar" element={<Deposit />} />
        <Route path="/transferir" />
        <Route path="/plazo-fijo" element={<FixedTerm />} />
      </Routes>
      <Footer className="footer" />
      </LocalizationProvider>
    </div>
  );
}

export default App;
