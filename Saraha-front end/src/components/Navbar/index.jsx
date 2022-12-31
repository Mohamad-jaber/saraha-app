import React, { useContext } from "react";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../UserContext/UserProvider";
import styles from "./styles.module.css";

const Navbar = () => {
  const { loggedUser, setLoggedUser } = useContext(UserContext);

  let logOut = (e) => {
    e.preventDefault();
    toast.success(`Hope to see you back soon, ${loggedUser.name}.`);
    setLoggedUser(null);
    cookie.remove("token", { path: "/" });
  };

  return (
    <nav
      className={
        styles.navContainer +
        " navbar navbar-expand-lg bg-custom navbar-dark bg-dark"
      }
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="/assets/images/logo300.png" width={54} alt="" />{" "}
        </Link>
        {/* <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button> */}
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu<span class="navbar-toggler-icon"></span>
        </button>
        <div
          className={styles.navList + " collapse navbar-collapse"}
          id="navbarSupportedContent"
        >
          {loggedUser ? (
            <ul className={styles.navbarContent + " navbar-nav ml-auto"}>
              <li className="nav-item">
                <Link className="nav-link" to="/Massages">
                  Massages
                </Link>
              </li>
              <li className="nav-item">
                <Link onClick={logOut} className="nav-link" to="/">
                  Logout
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/findUser">
                  Find-User
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="login">
                  Login
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
