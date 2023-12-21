import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Typography } from "@mui/material";

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Button
      onClick={goBack}
      variant='text'
      sx={{ borderRadius: 3, "&:hover": { color: "#53CDE2" } }}
      className='text-hover'
    >
      <ChevronLeftIcon style={{ fontSize: 30 }} color='primary' />
      <Typography variant='body1' color='primary' style={{ fontWeight: 800, fontSize: 16 }}>
        Back
      </Typography>
    </Button>
  );
};

export default BackButton;
