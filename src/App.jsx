import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/forms/LoginForm.jsx";
import "./App.css";
import RegisterForm from "./components/forms/RegisterForm.jsx";
import Deposit from "./pages/Deposit/Deposit";
import Profile from "./pages/Profile/Profile";
import Layout from "./components/Layout/Layout";
import PrivateRoutes from "./routes/PrivateRoutes.jsx";

function App() {
  return (
    <div className="app-container">
      <Layout>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" exact />
            <Route path="/mi-perfil" element={<Profile />} exact />
            <Route path="/depositar" element={<Deposit />} exact />
            <Route path="/transferir" />
            <Route path="/plazo-fijo" />
          </Route>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
