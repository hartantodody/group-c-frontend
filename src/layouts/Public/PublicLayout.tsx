import { Layout } from "../../interfaces/interface";
import "./PublicLayout.css";
import Typography from "@mui/material/Typography";

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
        </div>
      </div>
    </div>
  );
};

export default PublicLayout;
