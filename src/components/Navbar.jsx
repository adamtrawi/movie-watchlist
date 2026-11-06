import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link className="logo" to="/">MovieList</Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/features">Features</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/watchlist">My Watchlist</Link>
      </div>
    </nav>
  );
}

export default Navbar;