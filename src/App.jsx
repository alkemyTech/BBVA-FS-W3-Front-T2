import "./App.css";
import NavBar from "./components/Header/NavBar";
import navLinks from "./constants/navLinks";


function App() {
  return (
    <>    
      <NavBar navLinks={navLinks}/>
    </>
  );
}

export default App;
