import { Link } from "react-router-dom";
import "../Components/NavBar.css";

const NavBar = () => {
  return (
    <nav>
      <header className="header">
        <h1>
          <Link to="/songs">Tuner App</Link>
        </h1>
        <button>
          <Link to="/songs/new">New Song</Link>
        </button>
        <button>
          <Link to="/">Home</Link>
        </button>
      </header>
    </nav>
  );
};

export default NavBar;
