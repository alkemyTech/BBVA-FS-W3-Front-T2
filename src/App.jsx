import { Routes, Route } from "react-router-dom";
import navLinks from "./constants/navLinks";
import NavBar from "./components/Header/NavBar";
import Footer from "./components/Footer/Footer";
import LoginForm from "./forms/LoginForm.jsx";
import "./App.css";
import RegisterForm from "./forms/RegisterForm.jsx";
import Deposit from "./pages/Deposit/Deposit";
import Profile from "./pages/Profile/Profile";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <div className="app-container">
      <Layout>
        <Routes>
          {/* Posteriormente, al atributo element se le pasará la page que corresponda */}
          <Route path="/" />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/mi-perfil" element={<Profile />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/depositar" element={<Deposit />} />
          <Route path="/transferir" />
          <Route path="/plazo-fijo" />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
