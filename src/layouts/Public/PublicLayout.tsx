import { Layout } from "../../interfaces/interface";
import "./PublicLayout.css";
import MySvg from "../../assets/bg-logo-fade-blue.svg";
import Typography from "@mui/material/Typography";

const svgStyle: React.CSSProperties = {
  position: "absolute",
  minWidth: "570px",
  transform: "rotate(25deg) translateX(30%) translateY(30%) ",
  zIndex: 0,
};

const typographyStyle: React.CSSProperties = {
  paddingTop: "65px",
  fontFamily: "Montserrat, sans-serif",
};

const PublicLayout = ({ children }: Layout) => {
  return (
    <div>
      <img src='src\assets\logo-white.svg' alt='Logo' className='logo' />
      <div className='card'>
        <Typography variant='h4' style={typographyStyle}>
          Sign In
        </Typography>
        <div className='login-container'>
          <div className='login-card'>{children}</div>
        </div>
        <img src={MySvg} alt='background' style={svgStyle} />
      </div>
    </div>
  );
};

export default PublicLayout;
