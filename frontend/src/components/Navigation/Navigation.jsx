import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
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

      <div className="projectControls">

      <div className="search">
        <div className="searchIcon">
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <input placeholder="Search for projects"></input>
      </div>
      <div className="addOption">
        <i
          className="fa-solid fa-square-plus"
          onClick={() => navigate("/new-project")}
        ></i>
        <nav className="addText">Add New Project</nav>
      </div>
      </div>
      <div>
        <img className='logo' src="./GamerFund.jpg" alt="GamerFund Logo" onClick={() => navigate('/')}/>
      </div>
      <div className="signedOut">
        {!sessionUser ? (
          <OpenModalMenuItem
            itemText="Log In"
            modalComponent={<LoginFormModal />}
          />
        ) : (
          <div className="signedIn">
            <div>
              <img className="icon" src="UserIcon.png" alt="userIcon" onClick={() => navigate('/account')}/>
            </div>
            <div onClick={logout}>Logout</div>
          </div>
        )}
        <div></div>
      </div>
    </div>
  );
}

export default Navigation;
