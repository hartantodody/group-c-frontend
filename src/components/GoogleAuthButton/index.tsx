import { ButtonProps } from "../../interfaces/interface";
import { redirect } from "react-router-dom";

const GoogleAuthButton = ({ buttonText }: ButtonProps) => {
  const handleClick = () => {
    redirect("https://google.com"); /** <<<<< replace the link, inget! */
  };

  const buttonStyle = {
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
  };

  return (
    <button style={buttonStyle} onClick={handleClick}>
      <img src='src/assets/GoogleLogo.svg' />
      {buttonText} with Google
    </button>
  );
};

export default GoogleAuthButton;
