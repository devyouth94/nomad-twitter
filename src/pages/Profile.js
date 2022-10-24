import { signOut, updateProfile } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

import { auth, firedb } from "../shared/firebaseInstance";

const Profile = ({ user, refreshUser }) => {
  const [myTweets, setMyTweets] = useState([]);
  const [newName, setNewName] = useState(user.displayName || undefined);

  const onLogoutHandler = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  const getMyTweets = useCallback(async () => {
    const q = query(
      collection(firedb, "tweets"),
      where("creatorId", "==", `${user.uid}`),
      orderBy("createdAt", "desc"),
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  }, [user.uid]);

  useEffect(() => {
    getMyTweets();
  }, [getMyTweets]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (user.displayName !== newName) {
      await updateProfile(auth.currentUser, { displayName: newName });
      refreshUser();
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <input type="text" value={newName} onChange={(event) => setNewName(event.target.value)} />
        <input type="submit" value="update profile" />
      </form>
      <button onClick={onLogoutHandler}>Log Out</button>
    </>
  );
};

export default Profile;
