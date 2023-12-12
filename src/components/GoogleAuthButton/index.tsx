import { styled } from "@mui/system";
import { ButtonProps } from "../../interfaces/interface";

const StyledButton = styled("button")({
  fontFamily: "Poppins",
  width: 367,
  color: "black",
  borderRadius: 15,
  border: 0,
  backgroundColor: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 20,
  padding: 8,
  boxShadow: "0px 4px 10px -2px rgba(0, 0, 0, 0.5)",
  cursor: "pointer",
  transition: "background-color 0.3s ease-in-out",

  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
});

const GoogleAuthButton = ({ buttonText }: ButtonProps) => {
  const handleClick = () => {
    window.location.href = "https://google.com"; /** << inget ubah ke oauth */
  };

  return (
    <StyledButton onClick={handleClick}>
      <img src='src/assets/GoogleLogo.svg' alt='Google Logo' />
      {buttonText} with Google
    </StyledButton>
  );
};

export default GoogleAuthButton;
