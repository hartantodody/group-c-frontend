import { NavbarWhite, UserProfile } from "../../components";
import profileImage from "../../assets/ProfilePageAssets/Group 44.jpg"
import "./index.css"

const ProfilePage = () => {
    return (
      <>
        <div className="profile-container">
            <NavbarWhite/>
            <img className="profile-image" src={profileImage} alt="" />
            <div className="card">
                <UserProfile/>
            </div>
        </div>
      </>
    );
  };
  
export default ProfilePage;