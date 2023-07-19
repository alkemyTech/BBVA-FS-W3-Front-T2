import { Routes, Route } from "react-router-dom";
import navLinks from "./constants/navLinks";
import NavBar from "./components/Header/NavBar";
import Footer from "./components/Footer/Footer";
import LoginForm from "./forms/LoginForm.jsx";
import "./App.css";
import RegisterForm from "./forms/RegisterForm.jsx";





function App() {
  return (
    <div className="app-container">
      <NavBar navLinks={navLinks} />
      <Routes>
        {/* Posteriormente, al atributo element se le pasará la page que corresponda */}
        <Route path="/" />
        <Route path="/Login" />
        <Route path="/register" />
        <Route path="/depositar" />
        <Route path="/transferir" />
        <Route path="/plazo-fijo" />
      </Routes>
        <div className="body-conatiner">
            <LoginForm/>
            {/*  <RegisterForm /> */}
        </div>
      <Footer className="footer"/>
    </div>
  );
}

export default App;
