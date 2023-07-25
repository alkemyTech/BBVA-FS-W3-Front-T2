import "./Loader.css";

const Loader = () => {
  return (
    <div className="loadingContainer">
      <img
        src="../../../public/iconoAlkywallChico.png"
        alt="icono de la empresa"
        id="loadingIcon"
      />
      <img
        src="../../../public/assets/iAzul.png"
        alt="titulo de la empresa"
        id="loadingTitle"
      />
    </div>
  );
};

export default Loader;
