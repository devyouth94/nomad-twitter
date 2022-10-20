import { signOut } from "firebase/auth";

import { auth } from "../shared/firebaseInstance";

const Profile = () => {
  const onLogoutHandler = async () => {
    try {
      await signOut(auth);
    } catch (error) {}
  };

  return (
    <>
      <button onClick={onLogoutHandler}>Log Out</button>
    </>
  );
};

export default Profile;
