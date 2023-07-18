import "./App.css";
import NavBar from "./components/Header/NavBar";
import navLinks from "./constants/navLinks";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <NavBar navLinks={navLinks} />
      <Footer></Footer>
    </>
  );
}

export default App;
