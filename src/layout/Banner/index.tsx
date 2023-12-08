import "./index.css"
import image from "../../assets/banner-illustration-01.webp"
import { Button } from "@mui/material";

const Banner = () => {


    return (
        <>
            <div className="banner-container">
                <div>
                    <p>Elevate Your Well-being:</p>
                    <p>Navigating Health, One Click at a Time!</p>
                </div>
                <div >
                    <img className="image" src={image} alt="" />
                </div>
                <Button variant="contained">Start Your Wellness Journey</Button>
            </div>
        </>
    )
  };
  
export default Banner;