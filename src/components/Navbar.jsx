import { Link } from "react-router-dom";
import "./../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        DGX A100 Dashboard
      </div>

      <div className="menu">

        <Link to="/">Home</Link>

        <Link to="/container">Container</Link>

        <Link to="/process">Process</Link>

        <Link to="/gpu">GPU</Link>

        <Link to="/storage">Storage</Link>

      </div>

    </nav>
  );
}

export default Navbar;