import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import "./index.css"

// Your LogoutButton component
const EditProfileButton = () => {
  const navigate = useNavigate();

  const handleButton = () => {

    navigate('/edit-profile');
  };

  return (
    <Button className='edit-button' variant="contained"  onClick={handleButton}>
      Edit Profile
    </Button>
  );
};

export default EditProfileButton;
