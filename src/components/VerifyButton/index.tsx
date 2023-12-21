import { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import Swal from "sweetalert2";

const VerifyButton = () => {
  const [isFirstTry, setIsFirstTry] = useState(true);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [timer, setTimer] = useState(60);

  const startResendTimer = () => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(interval);
          setIsResendDisabled(false);
          return 60;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleSubmit = async () => {
    try {
      await fetch("https://group-c-project.onrender.com/v1/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      });

      Swal.fire({
        icon: "success",
        title: "Verify",
        text: "Link verification sent successfully!",
        confirmButtonText: "Okay",
        confirmButtonColor: "#005792",
      });

      setIsFirstTry(false);
      setTimer(60);
      setIsResendDisabled(true);
      startResendTimer();
    } catch (error) {
      console.error("Error sending reset request:", error);
    }
  };

  useEffect(() => {
    startResendTimer();
  }, []);

  return (
    <>
      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!isFirstTry && (isResendDisabled)}
      >
        {isFirstTry ? "Verify" : "Resend"}
        {!isFirstTry && isResendDisabled && (
          <Typography variant="caption" color="textSecondary" display="inline">
            {` (${timer}s)`}
          </Typography>
        )}
      </Button>
    </>
  );
};

export default VerifyButton;
