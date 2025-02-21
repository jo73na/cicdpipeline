import { useEffect } from "react";

function LandingPage() {
  useEffect(() => {
    window.location.href = "https://hrumbles.vercel.app/"; // Redirect to static site
  }, []);

  return null; // No need to render anything in React
}

export default LandingPage;
