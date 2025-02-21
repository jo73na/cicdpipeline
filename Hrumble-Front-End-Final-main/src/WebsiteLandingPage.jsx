import { useEffect } from "react";

function LandingPage() {
  useEffect(() => {
    window.location.href = "/Hrumbles-Website/index.html"; // Redirect to static site
  }, []);

  return null; // No need to render anything in React
}

export default LandingPage;
