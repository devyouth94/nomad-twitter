import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Navigation from "../components/Navigation";

import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Auth from "../pages/Auth";

const Router = ({ isAuth, user }) => {
  return (
    <>
      {isAuth && <Navigation />}
      <Routes>
        {isAuth ? (
          <>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Auth />} />
            <Route path="/profile" element={<Navigate replace to="/" />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default Router;
