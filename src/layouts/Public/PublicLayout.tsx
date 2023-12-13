import { motion } from "framer-motion";
import { Layout } from "../../interfaces/interface";
import "./PublicLayout.css";
import Typography from "@mui/material/Typography";

const typographyStyle: React.CSSProperties = {
  paddingTop: "65px",
  fontFamily: "Montserrat, sans-serif",
};

const cardMotion = {
  hidden: {
    opacity: 0,
    y: "100%",
  },
  visible: {
    opacity: 1,
    y: "0%",
    transition: {
      type: "spring",
      duration: 0.8,
    },
  },
};

const PublicLayout = ({ children, titleText }: Layout) => {
  return (
    <div className='base-layout'>
      <a href='https://helena-development.netlify.app'>
        <img src='public/logo-white.svg' alt='Logo' className='logo' style={{ width: 284, padding: "95px 0 78px 0" }} />
      </a>
      <motion.div className='card' variants={cardMotion} initial='hidden' animate='visible'>
        <Typography variant='h5' style={typographyStyle}>
          {titleText}
        </Typography>
        <div className='login-container'>
          <div className='login-card'>{children}</div>
        </div>
      </motion.div>
    </div>
  );
};

export default PublicLayout;
