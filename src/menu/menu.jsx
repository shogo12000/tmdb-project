import "./menu.css";
import { Outlet, Link, NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";

function Menu() {
  const { tokenValidate, logout} = useContext(AuthContext);
 
  return (
    <>
      <nav className="menu">
        <label>Logo</label>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "activeLink" : ""
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/movies"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "activeLink" : ""
              }
            >
              Movies
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="/people"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "activeLink" : ""
              }
            >
              People
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tv"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "activeLink" : ""
              }
            >
              Tv
            </NavLink>
          </li> */}
          <li>
            {!tokenValidate ? (
              <NavLink
                to="/login"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "activeLink" : ""
                }
              >
                Login
              </NavLink>
            ) : (

              <button
              onClick={()=>logout()}
              className="btn"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              Logout
            </button>
 
            )}
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Menu;
