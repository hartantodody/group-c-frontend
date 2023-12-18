import "./index.css"
import image from "../../assets/banner-illustration-01.webp"
import { Button } from "@mui/material";
import { Navbar } from "..";
import { useNavigate } from "react-router-dom";

const Banner = () => {
    const navigate = useNavigate();

    const navigateToRegister = () => {
        navigate("/signup");
    };

    return (
        <>
            
            <div className="background-banner">
                <div className="banner-container">
                    <Navbar/>
                    <div className="banner-asset">
                        <div className="banner-title">
                            <p className="tag-title">Elevate Your Well-being:</p>
                            <p>Navigating Health, One Click at a Time!</p>
                        </div>
                        <div >
                            <img className="image" src={image} alt="" />
                        </div>
                        <Button className="banner-button" variant="contained" onClick={navigateToRegister}>Start Your Wellness Journey {'>>>'}</Button>
                    </div>
                </div>
            </div>
        </>
    )
  };
  
export default Banner;