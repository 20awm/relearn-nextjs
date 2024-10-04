import React, { useState, useEffect } from "react";
import { getUsername } from "@/services/auth";

const useLogin = () => {
  const [username, setUsername] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const username = getUsername(token);
      setUsername(username);
    } else {
      window.location.href = "/login";
    }
  }, []);

  return username;
};

export default useLogin;
