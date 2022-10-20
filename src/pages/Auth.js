import { useState } from "react";

import { auth } from "../shared/firebaseInstance";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (newAccount) {
        //create account
        const data = await createUserWithEmailAndPassword(auth, email, password);
        console.log(data);
      } else {
        //log in
        const data = await signInWithEmailAndPassword(auth, email, password);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSocialHandler = async (event) => {
    const { name } = event.target;
    let provider;

    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }

    const data = await signInWithPopup(auth, provider);
    console.log(data);
  };

  const toggleHandler = () => {
    setNewAccount((prev) => !prev);
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input name="email" type="text" placeholder="Email" required value={email} onChange={onChangeHandler} />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChangeHandler}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
      </form>
      <div onClick={toggleHandler}>{newAccount ? "로그인 하러가기" : "회원가입 하러가기"}</div>
      <div>
        <button onClick={onSocialHandler} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialHandler} name="github">
          Continue with GitHub
        </button>
      </div>
    </div>
  );
};

export default Auth;
