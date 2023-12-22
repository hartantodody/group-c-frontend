import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import mainLogo from "../../assets/helena-main-logo-01-01.svg";
import "./index.css";
import { Button, Avatar } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { Typography } from "@mui/material";
import { titleCase } from "../../utils/titleCase";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    setIsLoggedIn(!!getToken);
    fetchUserProfile();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    Swal.fire({
      icon: "success",
      title: "Log out",
      text: "Logged out",
      confirmButtonText: "Okay",
      confirmButtonColor: "#005792",
    });
    navigate("/landing-page");
  };

  const fetchUserProfile = async () => {
    try {
      const authToken = localStorage.getItem("token");

      if (!authToken) {
        return;
      }
      console.log(authToken);

      const response = await fetch("https://group-c-project.onrender.com/v1/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.status == 201) {
        const data = await response.json();
        setNickname(data.data.nickname);
      } else {
        // Handle errors
        console.error("Failed to fetch user profile:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user profile:");
    }
  };

  const navigateToRegister = () => {
    navigate("/signup");
  };

  const navigateToLogin = () => {
    navigate("/signin");
  };

  const navigateToUserProfile = () => {
    navigate("/user-profile");
  };

  const navigateToDashboard = () => {
    navigate("/");
  };

  const navigateToAddFood = () => {
    navigate("/add-food");
  };

  return (
    <>
      <motion.div
        className='navbar-container'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.img
          className='logo'
          src={mainLogo}
          alt='Helena Main Logo'
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        <IconButton onClick={toggleMenu} style={{ display: isMenuOpen ? "none" : "" }}>
          <MenuIcon />
        </IconButton>

        {/* Drawer for the menu */}
        <Drawer anchor='right' open={isMenuOpen} onClose={toggleMenu}>
          <motion.div
            className='menu-content'
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 25, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className='close-container'>
              <IconButton className='close-button' onClick={closeMenu}>
                <CloseIcon />
              </IconButton>
            </div>
            <div className='content-inmenu'>
              {isLoggedIn ? (
                <>
                  {location.pathname === "/" && (
                    <>
                      <Avatar alt='User Avatar' src='path/to/user/avatar.jpg' onClick={navigateToUserProfile} />
                      <Typography variant='body1' color={"white"}>
                        User : {titleCase(nickname)}
                      </Typography>
                      <Button className='profile-button' variant='contained' onClick={navigateToUserProfile}>
                        Profile
                      </Button>
                      <Button className='add-food-button' variant='contained' onClick={navigateToAddFood}>
                        Add Food
                      </Button>
                    </>
                  )}
                  {location.pathname === "/user-profile" && (
                    <>
                      <Avatar alt='User Avatar' src='path/to/user/avatar.jpg' onClick={navigateToUserProfile} />
                      <Button className='dahsboard-button' variant='contained' onClick={navigateToDashboard}>
                        Dashboard
                      </Button>
                      <Button className='add-food-button' variant='contained' onClick={navigateToAddFood}>
                        Add Food
                      </Button>
                    </>
                  )}
                  <Button
                    className='logout-button'
                    variant='contained'
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Button className='signup-button' variant='contained' onClick={navigateToRegister}>
                    Sign Up
                  </Button>
                  <Button className='signin-button' variant='outlined' onClick={navigateToLogin}>
                    Sign In
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </Drawer>
      </motion.div>
    </>
  );
};

export default Navbar;
