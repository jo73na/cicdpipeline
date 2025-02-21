import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectToWebsite = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/") {
      navigate("/website", { replace: true });
    }
  }, []);

  return null; // This component doesn't render anything
};

export default RedirectToWebsite;
