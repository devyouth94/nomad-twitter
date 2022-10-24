import { useEffect, useState } from "react";

import Router from "./routers/Router";

import { auth } from "./shared/firebaseInstance";
import { onAuthStateChanged, updateProfile } from "firebase/auth";

const App = () => {
  const [init, setInit] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
        setUser({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: () => updateProfile(user, { displayName: user.displayName }),
        });
      } else {
        setIsAuth(false);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = auth.currentUser;
    setUser({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: () => updateProfile(user, { displayName: user.displayName }),
    });
  };

  return <>{init ? <Router isAuth={isAuth} user={user} refreshUser={refreshUser} /> : "Loading..."}</>;
};

export default App;
