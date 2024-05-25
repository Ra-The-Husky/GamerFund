import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../Signup/SignupFormModal";
import "./Navigation.css";

function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div className="navBar">
      <div>
        <img
          className="logo"
          src="https://i.imgur.com/gB7gJFb.jpg"
          alt="GamerFund Logo"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="projectControls">
        <div className="search">
          <div className="searchIcon">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <input placeholder="Search for projects"></input>
        </div>
        {!sessionUser ? (
          <></>
        ) : (
          <div className="addOption">
            <i
              className="fa-solid fa-square-plus"
              onClick={() => navigate("/new-project")}
            ></i>
            <div className="addText">Add New Project</div>
          </div>
        )}
      </div>
      <div className="userControls">
        <div>
          {!sessionUser ? (
            <div className="signedOut">
              <OpenModalMenuItem
                itemText="Log In"
                modalComponent={<LoginFormModal />}
              />

              <OpenModalMenuItem
                itemText="Sign Up"
                modalComponent={<SignupFormModal />}
              />
            </div>
          ) : (
            <div className="signedIn">
              <div>
                <img
                  className="icon"
                  alt="userIcon"
                  onClick={() => navigate("/account")}
                />
              </div>
              <div className="logout" onClick={logout}>Logout</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
