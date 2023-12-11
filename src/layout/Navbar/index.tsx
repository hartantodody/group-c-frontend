import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import mainLogo from "../../assets/helena-main-logo-01-01.svg";
import "./index.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
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
        <img className="logo" src={mainLogo} alt="Helena Main Logo" />
        <IconButton onClick={toggleMenu}>
          <MenuIcon />
        </IconButton>

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

export default Navbar;
