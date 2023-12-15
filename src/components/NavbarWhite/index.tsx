import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import whiteLogo from "../../assets/icon-white.svg";
import "./index.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { color } from "framer-motion";

const NavbarWhite = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    const closeMenu = () => {
      setIsMenuOpen(false);
    };
  
      const navigate = useNavigate();
      
      const navigateToRegister = () => {
          navigate("/signup");
      };
  
      const navigateToLogin = () => {
          navigate("/signin");
      };
  
    return (
      <>
        <div className="navbar-container">
          <IconButton style={{ color: '#ffffff' }} onClick={toggleMenu}>
            <MenuIcon />
          </IconButton>
          <img className="logo-white" src={whiteLogo} alt="Helena Main Logo" />
  
          {/* Drawer for the menu */}
          <Drawer anchor="top" open={isMenuOpen} onClose={toggleMenu}>
              <div className="menu-content">
                  <IconButton className="close-button" onClick={closeMenu}>
                      <CloseIcon />
                  </IconButton>
                  <div className="content-inmenu">
                      <Button className="signup-button" variant="contained" onClick={navigateToRegister}>Sign Up</Button>
                      <Button className="signin-button" variant="contained" onClick={navigateToLogin}>Sign In</Button>
                  </div>
              </div>
          </Drawer>
        </div>
      </>
    );
  };

  export default NavbarWhite