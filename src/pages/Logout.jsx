import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const confirmLogout = window.confirm("Do you want to logout?");

    if (confirmLogout) {
      localStorage.removeItem("user");
      alert("Logged out");
      navigate("/login");
    } else {
      navigate(-1);
    }
  }, []);

  return null;
};

export default Logout;