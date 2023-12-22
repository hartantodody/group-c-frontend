import { UserProfile, BackButton } from "../../components";
import profileImage from "../../assets/ProfilePageAssets/Group 44.jpg";
import "./index.css";
import { Navbar } from "../../layout";

const ProfilePage = () => {
  return (
    <>
      <div className='profile-container'>
        <Navbar />
        <img className='profile-image' src={profileImage} alt='' />
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
