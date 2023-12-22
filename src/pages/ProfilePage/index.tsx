import { UserProfile, BackButton } from "../../components";
import { Avatar } from "@mui/material";
import "./index.css";
import { Navbar } from "../../layout";

const ProfilePage = () => {
  return (
    <>
      <div className='profile-container'>
        <Navbar />
        <div className='profile-picture'>
          <Avatar alt='User Avatar' src='path/to/user/avatar.jpg' sx={{ minHeight: "100px", minWidth: "100px" }} />
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
