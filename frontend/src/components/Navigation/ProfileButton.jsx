import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
// import OpenModalMenuItem from "./OpenModalMenuItem";
// import LoginFormModal from "../LoginFormModal/LoginFormModal";
// import SignupFormModal from "../SignupFormModal/SignupFormModal";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); 
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const spotManagement = (e) => {
    e.preventDefault();

    navigate("/spots/current");
    closeMenu();
  };

  const reviewManagement = (e) => {
    e.preventDefault();

    navigate("/reviews/current");
    closeMenu();
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout()).then(navigate("/"));
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <div className="icons">
        <i className="fa-solid fa-bars"></i>{" "}
        <i className="fas fa-user-circle" onClick={toggleMenu} />
      </div>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="profileInfo">
            <div className="userInfo">
              <p>Hello, {user.firstName} </p>
              <p>{user.email}</p>
            </div>
            <div className="profileButtons">
              <div className="managementButtons">
                <button onClick={spotManagement}>Manage Spots</button>
                <button onClick={reviewManagement}>Manage Reviews</button>
              </div>
              <button className="yesDelete" onClick={logout}>
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <>
            <OpenModalMenuItem
              className="button"
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              className="button"
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
