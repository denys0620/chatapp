import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const GoogleCallbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const userString = params.get("user");

    if (token && userString) {
      const user = JSON.parse(userString);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      navigate("/chat");
    }
  }, [location, navigate, setUser]);

  return <div>Loading...</div>;
};

export default GoogleCallbackPage;