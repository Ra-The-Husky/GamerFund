import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../AccountPage/AccountPage.css";

function AccountPage() {
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      <h1>Welcome Back {sessionUser?.username}!</h1>
      <div className="accountControlBox">
        <div className="projectControlBox">
          <div className="controlTitle">Projects</div>
          <div className="dropdownItems">
            <ul>
              <div onClick={() => navigate("/account/projects")}>
                Your Active Projects
              </div>
              <div onClick={() => alert("Vestor Information Coming Soon!")}>
                Projects You&apos;re Vested In
              </div>
            </ul>
          </div>
        </div>
        <div className="postsControlBox">
          <div className="controlTitle">Posts</div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default AccountPage;
