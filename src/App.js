import { useEffect, useState } from "react";

import Router from "./routers/Router";

import { auth } from "./shared/firebaseInstance";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [init, setInit] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
      setInit(true);
    });
  }, []);

  return <>{init ? <Router isAuth={isAuth} /> : "Loading..."}</>;
};

export default App;
