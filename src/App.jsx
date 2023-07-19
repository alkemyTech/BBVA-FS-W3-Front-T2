import { Routes, Route } from "react-router-dom";
import navLinks from "./constants/navLinks";
import NavBar from "./components/Header/NavBar";
import Footer from "./components/Footer/Footer";

import "./App.css";
import NavBar from "./components/Header/NavBar";
import navLinks from "./constants/navLinks";
import Footer from "./components/Footer/Footer";
import Login from "./forms/LoginForm";




function App() {
  return (
    <div className="app-container">
      <NavBar navLinks={navLinks} />
      <Routes>
        {/* Posteriormente, al atributo element se le pasará la page que corresponda */}
        <Route path="/" />
        <Route path="/login" />
        <Route path="/register" />
        <Route path="/depositar" />
        <Route path="/transferir" />
        <Route path="/plazo-fijo" />
      </Routes>
      <Footer className="footer"/>
    </div>
  );
}

export default App;
