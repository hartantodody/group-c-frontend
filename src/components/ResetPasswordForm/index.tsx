import { Button, TextField, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const ResetPasswordForm = () => {
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
        await fetch("https://group-c-project.onrender.com/v1/reset", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: values.password }),
        });

        Swal.fire({
          icon: "success",
          title: "Reset Password",
          text: "Reset password successfully!",
          confirmButtonText: "Okay",
          confirmButtonColor: "#005792",
        });
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error in main code:", error.message);
          alert(`Error in main code: ${error.message}`);
        } else {
          console.error("Unexpected error:", error);
          alert("Unexpected error occurred");
        }
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
            label="Password"
            variant="outlined"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
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
