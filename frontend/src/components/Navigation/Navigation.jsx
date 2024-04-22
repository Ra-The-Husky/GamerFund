import { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import "./Navigation.css";
import { HiSearch } from "react-icons/hi";

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const sessionUser = useSelector((state) => state.session.user);
  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  // useEffect(() => {
  //   if (!showMenu) return;

  //   const closeMenu = (e) => {
  //     if (!ulRef.current.contains(e.target)) {
  //       setShowMenu(false);
  //     }
  //   };

  //   document.addEventListener("click", closeMenu);

  //   return () => document.removeEventListener("click", closeMenu);
  // }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="navBar">
      <div>
        <NavLink to="/">Home</NavLink>
      </div>
      <div className="search">
        <div>
          <HiSearch />
        </div>
        <input placeholder=""></input>
      </div>
      <nav onClick={() => navigate('/new-project')}>Add Project</nav>
      <div>
        {!sessionUser ? (
          <OpenModalMenuItem
            itemText="Log In"
            modalComponent={<LoginFormModal />}
          />
        ) : (
          <nav className="signedIn">
            <div>
            <NavLink to="/account">Account</NavLink>
            </div>
            <div onClick={logout}>Logout</div>
          </nav>
        )}
        <div></div>
      </div>
    </div>
  );
}

export default Navigation;
