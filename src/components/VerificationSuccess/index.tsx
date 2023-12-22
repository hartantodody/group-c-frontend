import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "./index.css"

const VerificationSuccess = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/signin");
  };

  return (
    <div>
      <h1 className="verify-success">Your account has been successfully verified</h1>
      <Button
        type="submit"
        color="primary"
        variant="contained"
        style={{ width: 200, borderRadius: 15, marginTop: 25, fontSize: 12 }}
        onClick={navigateToLogin}
      >
        Continue to Login
      </Button>
    </div>
  );
};

export default VerificationSuccess;
