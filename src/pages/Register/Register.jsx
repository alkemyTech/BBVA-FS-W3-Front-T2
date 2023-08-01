import RegisterForm from "../../components/forms/RegisterForm";
import "../Login/Login.css";

export default function Register() {
  return (
    <>
      <div className="login-register-foto"></div>
      <div className="login-register-container">
        <RegisterForm />
      </div>
    </>
  );
}
