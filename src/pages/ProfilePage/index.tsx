import {UserProfile } from "../../components";
import profileImage from "../../assets/ProfilePageAssets/Group 44.jpg"
import "./index.css"
import { Navbar } from "../../layout";

const ProfilePage = () => {
    return (
      <>
        <div className="profile-container">
            <Navbar/>
            <img className="profile-image" src={profileImage} alt="" />
            <div className="card">
                <UserProfile/>
            </div>
        </div>
      </>
    );
  };
  
export default ProfilePage;