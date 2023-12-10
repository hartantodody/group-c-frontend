import { Layout } from "../../interfaces/interface";
import "./PublicLayout.css";
import BackgroundLogo from "../../assets/bg-logo-fade-blue.svg";
import Typography from "@mui/material/Typography";

const svgStyle: React.CSSProperties = {
  position: "absolute",
  minWidth: "570px",
  transform: "rotate(0deg) translateX(5%) translateY(0px) ",
};

const typographyStyle: React.CSSProperties = {
  paddingTop: "65px",
  fontFamily: "Montserrat, sans-serif",
};

const PublicLayout = ({ children, titleText }: Layout) => {
  return (
    <div className='base-layout'>
      <img src='src\assets\logo-white.svg' alt='Logo' className='logo' />
      <div className='card'>
        <Typography variant='h4' style={typographyStyle}>
          {titleText}
        </Typography>
        <div className='login-container'>
          <div className='login-card'>{children}</div>
          <img src={BackgroundLogo} alt='background' className='logo-svg' />
        </div>
      </div>
    </div>
  );
};

export default PublicLayout;
