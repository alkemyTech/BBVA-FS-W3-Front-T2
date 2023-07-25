import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/forms/LoginForm.jsx";
import "./App.css";
import RegisterForm from "./components/forms/RegisterForm.jsx";
import Deposit from "./pages/Deposit/Deposit";
import FixedTerm from "./pages/FixedTerm/FixedTerm";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Profile from "./pages/Profile/Profile";
import Layout from "./components/Layout/Layout";
import PrivateRoutes from "./routes/PrivateRoutes.jsx";
import Home from "./pages/Home/Home.jsx";
import Payment from "./pages/Payment/Payment.jsx";

function App() {
  return (
    <div className="app-container">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Layout>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Home />} exact />
              <Route path="/mi-perfil" element={<Profile />} exact />
              <Route path="/pagar" element={<Payment />} exact />
              <Route path="/depositar" element={<Deposit />} exact />
              <Route path="/transferir" />
              <Route path="/plazo-fijo" element={<FixedTerm />} />
            </Route>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
        </Layout>
      </LocalizationProvider>
    </div>
  );
}

export default App;
