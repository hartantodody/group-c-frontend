import "./index.css";
import { AboutUs, Banner, Feature, Footer } from "../../layout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LandingPage = () => {
  const navigate = useNavigate();

  const isUserLoggedIn = () => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      // cek expiration tokennya
      // decode dulu tokennya
      // kalau expired redirect ke login page atau hit refresh token
      return true;
    }

    return false;
  };

  useEffect(() => {
    const loggedIn = isUserLoggedIn();

    if (loggedIn) {
      navigate("/");
    } else {
      navigate("/home");
    }
  }, [history]);

  return (
    <>
      <div>
        <Banner />
        <AboutUs />
        <Feature />
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
