import { Routes, Route } from "react-router-dom";
import navLinks from "./constants/navLinks";
import NavBar from "./components/Header/NavBar";

import "./App.css";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
