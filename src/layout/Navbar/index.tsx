import mainLogo from "../../assets/helena-main-logo-01-01.svg"
import MenuIcon from '@mui/icons-material/Menu';
import "./index.css"

const Navbar = () => {


    return (
        <>
            <div className="navbar-container">
                <img className="logo" src={mainLogo} alt="Helena Main Logo" />
                <MenuIcon/>
            </div>
        </>
    )
  };
  
export default Navbar;