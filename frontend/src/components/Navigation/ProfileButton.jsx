import { FaUserCircle } from 'react-icons/fa';
import OpenModalMenuItem from './OpenModalMenuItem';
import SignupFormModal from '../Signup/SignupFormModal';

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
            <div>{user?.firstName} {user?.lastName}</div>
            <div>{user.email}</div>
            <div>
              <button>Log Out</button>
            </div>
          </>
        ) : (
          <>

            <OpenModalMenuItem
              itemText="Sign Up"
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
