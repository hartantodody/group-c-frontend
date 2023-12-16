import { useState } from "react";
import { motion } from "framer-motion";
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
      <motion.div
        className="navbar-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.img
          className="logo"
          src={mainLogo}
          alt="Helena Main Logo"
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        <IconButton
          onClick={toggleMenu}
          style={{ display: isMenuOpen ? "none" : "" }}
        >
          <MenuIcon />
        </IconButton>

        {/* Drawer for the menu */}
        <Drawer anchor="right" open={isMenuOpen} onClose={toggleMenu}>
          <motion.div
            className="menu-content"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 25, opacity: 1 }}
            exit={{ x: 200, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="close-container">
              <IconButton className="close-button" onClick={closeMenu}>
                <CloseIcon />
              </IconButton>
            </div>
            <div className="content-inmenu">
              <Button
                className="signup-button"
                variant="contained"
                onClick={navigateToRegister}
              >
                Sign Up
              </Button>
              <Button
                className="signin-button"
                variant="contained"
                onClick={navigateToLogin}
                style={{
                  backgroundColor: "white",
                  borderColor: "#005792",
                  color: "#005792",
                }}
              >
                Sign In
              </Button>
            </div>
          </motion.div>
        </Drawer>
      </motion.div>
    </>
  );
};

export default Navbar;
