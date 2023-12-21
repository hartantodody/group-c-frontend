import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import "./index.css"

// Your LogoutButton component
const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/signin');
  };

  return (
    <Button className='logoutbutton' variant="contained"  onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
