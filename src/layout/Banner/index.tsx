import "./index.css"
import image from "../../assets/banner-illustration-01.webp"
import backImage from "../../assets/banner-background-01.webp"
import { Button } from "@mui/material";
import { Navbar } from "..";
import { useNavigate } from "react-router-dom";

const Banner = () => {
    const navigate = useNavigate();

    const navigateToRegister = () => {
        navigate("/register");
    };

    return (
        <>
            <img className="back-image" src={backImage} alt="" />
            <div className="banner-container">
                <Navbar/>
                <div className="banner-asset">
                    <div>
                        <p className="banner-title"><span className="tag-title">Elevate Your Well-being:</span><br />Navigating Health, One Click at a Time!</p>
                    </div>
                    <div >
                        <img className="image" src={image} alt="" />
                    </div>
                    <Button className="banner-button" variant="contained" onClick={navigateToRegister}>Start Your Wellness Journey {'>>>'}</Button>
                </div>
            </div>
        </>
    )
  };
  
export default Banner;