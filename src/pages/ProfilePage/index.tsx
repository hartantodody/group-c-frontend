import { useState, useEffect } from "react";
import { UserProfile, BackButton } from "../../components";
import { Avatar } from "@mui/material";
import "./index.css";
import { Navbar } from "../../layout";

const ProfilePage = () => {
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const authToken = localStorage.getItem("token");

        if (!authToken) {
          return;
        }

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
          console.error("Failed to fetch user profile:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user profile:");
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <>
      <div className='profile-container'>
        <Navbar />
        <div className='profile-picture'>
          <Avatar alt={nickname} src='path/to/user/avatar.jpg' sx={{ minHeight: "100px", minWidth: "100px" }} />
        </div>
        <div className='card'>
          <div style={{ position: "absolute", top: 0, left: 0, margin: "10px 0 0 10px" }}>
            <BackButton />
          </div>
          <UserProfile />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
