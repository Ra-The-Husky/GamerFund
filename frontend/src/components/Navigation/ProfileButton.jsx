import { FaUserCircle } from "react-icons/fa";
function ProfileButton({ user }) {
  return (
    <>
      <button>
        <FaUserCircle />
      </button>
      <ul>
        {user ? (
          <>
            <div>{user.username}</div>
            <div>
              {user?.firstName} {user?.lastName}
            </div>
            <div>{user.email}</div>
            <div>
              <button>Log Out</button>
            </div>
          </>
        ) : (
          <></>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
