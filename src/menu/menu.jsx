import "./menu.css";
import { Outlet, Link } from "react-router-dom";

function Menu() {
  return (
    <>
      <nav className="menu">
        <label>Logo</label>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
          <li>
            <Link to="/people">People</Link>
          </li>
          <li>
            <Link to="/tv">Tv</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Menu;
