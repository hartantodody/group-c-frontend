import { useState } from "react";
import { Button, TextField, Grid, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const EmailSendForm = () => {
  const [isFirstTry, setIsFirstTry] = useState(true);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [timer, setTimer] = useState(60);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await fetch("https://group-c-project.onrender.com/v1/request-reset", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: values.email }),
        });

        // Profile registration successful
        Swal.fire({
          icon: "success",
          title: "Request Reset",
          text: "Email sent successfully!",
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
    },
  });

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

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isFirstTry ? false : isResendDisabled || formik.isSubmitting}
          >
            {isFirstTry ? "Send" : "Resend"}
            {!isFirstTry && isResendDisabled && (
              <Typography variant="caption" color="textSecondary" display="inline">
                {` (${timer}s)`}
              </Typography>
            )}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EmailSendForm;
