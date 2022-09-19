import { Navigate } from "react-router-dom";
import { useUser } from "../UserContext";
import "./Home.css";

function Home() {
  const user = useUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <main id="home"></main>;
}

export default Home;
