import { Button, TextField, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const ResetPasswordForm = () => {
  // Extract token and userId from URL parameters
  const { token, userId } = useParams<{ token: string; userId: string }>();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/, "Password must be alphanumeric"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Convert userId to a number if needed
        const userIdAsNumber = Number(userId);

        // Add token and userId to the request body
        const requestBody = {
          password: values.password,
          token: token,
          userId: userIdAsNumber,
        };

        await fetch("https://group-c-project.onrender.com/v1/reset", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        Swal.fire({
          icon: "success",
          title: "Reset Password",
          text: "Reset password successfully!",
          confirmButtonText: "Okay",
          confirmButtonColor: "#005792",
        });
        navigate("/login");
      } catch (error) {
        // Handle errors
      }
    },
  });

  const isFormEmpty = !formik.values.password;

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Password'
            variant='outlined'
            name='password'
            type='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type='submit'
            color='primary'
            variant='contained'
            disabled={isFormEmpty}
            style={{ width: 114, borderRadius: 15, marginTop: 25, fontSize: 12 }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ResetPasswordForm;
