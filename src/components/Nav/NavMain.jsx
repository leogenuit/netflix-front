import { NavLink } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import "./NavMain.css";
import netflixLogo from "./../../styles/img/logo-netflix.png";
const NavMain = () => {
  const { isLoggedIn, currentUser, removeUser } = useAuth();
  return (
    <nav className="NavMain">
      <NavLink className="logo" to="/">
        <img src={netflixLogo} alt="netflix" />
      </NavLink>

      {isLoggedIn && (
        <>
          <button onClick={removeUser}>LogOut</button>
        </>
      )}
      {!isLoggedIn && (
        <>
          <NavLink to="/signin">Log in</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </>
      )}
      {currentUser?.isAdmin && (
        <>
          <NavLink to="/dashboard" className="Admin-Dashboard">
            Admin Dashboard
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default NavMain;
