import "./index.css"
import sosmedIcon from "../../assets/sosmed-icon.svg"
import footerLogo from "../../assets/footer-logo.svg"

const Footer = () => {
    return(
        <div className="footer">
            <div className="footer-content">
                <img className= 'footer-logo sosmed' src={sosmedIcon} alt="social media icon" />
                <img className= 'footer-logo' src={footerLogo} alt="helena logo" />
            </div>
        </div>
    )
  };
  
  export default Footer;