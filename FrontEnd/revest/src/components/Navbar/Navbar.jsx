import { Link, useLocation } from "react-router-dom";
import "./style.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2>Revest Store</h2>
        </div>
        <div className="navbar-links">
          <Link
            to="/"
            className={`navbar-link ${location.pathname === "/" ? "active" : ""}`}
          >
            Products
          </Link>
          <Link
            to="/orders"
            className={`navbar-link ${location.pathname === "/orders" ? "active" : ""}`}
          >
            Orders
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
