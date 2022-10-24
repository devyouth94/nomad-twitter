import React from "react";
import { useNavigate } from "react-router-dom";

const Navigation = ({ user }) => {
  const navigate = useNavigate();

  return (
    <nav>
      <ul>
        <li onClick={() => navigate("/")}>홈</li>
        <li onClick={() => navigate("/profile")}>{user.displayName || "유저"}의 프로필</li>
      </ul>
    </nav>
  );
};

export default Navigation;
