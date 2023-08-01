import { Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register/Register.jsx";
import Deposit from "./pages/Deposit/Deposit";
import Transfer from "./pages/Transfer/Transfer.jsx";
import FixedTerm from "./pages/FixedTerm/FixedTerm";
import Profile from "./pages/Profile/Profile";
import Layout from "./components/Layout/Layout";
import PrivateRoutes from "./routes/PrivateRoutes.jsx";
import Home from "./pages/Home/Home.jsx";
import Payment from "./pages/Payment/Payment.jsx";
import Login from "./pages/Login/Login.jsx";

function App() {
  return (
    <div className="app-container">
      <Layout>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} exact />
            <Route path="/mi-perfil" element={<Profile />} exact />
            <Route path="/pagar" element={<Payment />} exact />
            <Route path="/depositar" element={<Deposit />} exact />
            <Route path="/transferir" element={<Transfer />} exact />
            <Route path="/plazo-fijo" element={<FixedTerm />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
