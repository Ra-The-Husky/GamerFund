import {useNavigate} from "react-router-dom";
import "../AccountPage/AccountPage.css";

function AccountPage() {
    const navigate = useNavigate()
  return (
    <>
      <h1>User Account Infomation will live here</h1>

      <div onClick={() => navigate('/account/projects')}>Projects</div>
      <div>Posts</div>
    </>
  );
}

export default AccountPage;
