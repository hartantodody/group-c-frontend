import { useEffect, useState } from 'react';
import { EditProfileButton, LogoutButton } from '..';

import usernameIcon from '../../assets/ProfilePageAssets/username.svg';
import emailIcon from '../../assets/ProfilePageAssets/email.svg';
import ageIcon from '../../assets/ProfilePageAssets/age.svg';
import weightIcon from '../../assets/ProfilePageAssets/weight.svg';
import heightIcon from '../../assets/ProfilePageAssets/height.svg';
import activenessIcon from '../../assets/ProfilePageAssets/activeness.svg';
import dateIcon from '../../assets/ProfilePageAssets/membersince.svg';
import './index.css';

interface UserData {
  username?: string;
  email?: string;
  age?: number;
  weight?: number;
  height?: number;
  activeness?: string;
  createdAt?: string;
}

const UserProfile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const authToken = localStorage.getItem('token');

        if (!authToken) {
          // Handle the case when there's no authToken
          return;
        }
        console.log(authToken);
        

        const response = await fetch('https://group-c-project.onrender.com/v1/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (response.status == 201) {
          const data = await response.json();
          setUserData(data.data);
        } else {
          // Handle errors
          console.error('Failed to fetch user profile:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user profile:');
      }
    };

    fetchUserProfile();
  }, []); // The empty dependency array ensures that the effect runs only once on component mount

  return (
    <>
      {userData && (
        <div>
          <div className="card-container">
            <div className="user-data">
              <div className="data-container">
                <img src={usernameIcon} alt="username icon" />
                <div className="text-container">
                  <p className="text-header">Username</p>
                  <p>{userData.username}</p>
                </div>
              </div>
              <div className="data-container">
                <img src={emailIcon} alt="email icon" />
                <div className="text-container">
                  <p className="text-header">Email</p>
                  <p>{userData.email}</p>
                </div>
              </div>
              <div className="data-container">
                <img src={ageIcon} alt="age icon" />
                <div className="text-container">
                  <p className="text-header">Age</p>
                  <p>{userData.age}</p>
                </div>
              </div>
              <div className="data-container">
                <img src={weightIcon} alt="weight icon" />
                <div className="text-container">
                  <p className="text-header">Weight</p>
                  <p>{userData.weight}</p>
                </div>
              </div>
              <div className="data-container">
                <img src={heightIcon} alt="height icon" />
                <div className="text-container">
                  <p className="text-header">Height</p>
                  <p>{userData.height} cm</p>
                </div>
              </div>
              <div className="data-container">
                <img src={activenessIcon} alt="activeness icon" />
                <div className="text-container">
                  <p className="text-header">Activeness</p>
                  <p>{userData.activeness}</p>
                </div>
              </div>
              <div className="data-container">
                <img src={dateIcon} alt="date icon" />
                <div className="text-container">
                  <p className="text-header">Member Since</p>
                  <p>{userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A'}</p>
                </div>
              </div>
            </div>
            <div className="button-container">
              <EditProfileButton />
              <LogoutButton />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
