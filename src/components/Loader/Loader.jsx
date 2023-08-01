import "./Loader.css";
import titulo from "../../../public/assets/iAzul.png";

const Loader = () => {
  return (
    <div className="loaderContainer">
      <div className="loader-exterior">
        <div className="loader-interior"></div>
      </div>
      <img src={titulo} alt="icono alkywall" id="loader-titulo" />
    </div>
  );
};

export default Loader;
