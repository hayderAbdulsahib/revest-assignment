import "./style.css";

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="loader-container">
      <div className="loader-spinner">
        <div className="spinner"></div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Loader;
