import { NavLink } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import "./NavMain.css";
import netflixLogo from "./../../styles/img/logo-netflix.png";
import Logout from "./../../styles/img/logout.png";
const NavMain = () => {
  const { isLoggedIn, currentUser, removeUser } = useAuth();
  return (
    <nav className="NavMain">
      <NavLink className="logo" to="/movies">
        <img src={netflixLogo} alt="netflix" />
      </NavLink>

      <NavLink className="logo" to="/movies">
        <p>Movies</p>
      </NavLink>

      {currentUser?.isAdmin && (
        <NavLink className="logo" to="/create">
          <p>Create</p>
        </NavLink>
      )}

      {/* {currentUser?.isAdmin && (
          <>
          <NavLink to="/dashboard">Admin Dashboard</NavLink>
          </>
        )} */}

      {isLoggedIn ? (
        <>
          <NavLink to="/favori">Favorites</NavLink>
          <p onClick={removeUser}>
            <img className="Logout" src={Logout} alt="log-out" />
          </p>
        </>
      ) : (
        <>
          <NavLink className="Sign" to="/signin">
            Log in
          </NavLink>
          <NavLink className="Sign" to="/signup">
            Sign Up
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default NavMain;
