import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { Box, IconButton, InputAdornment, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GoogleAuthButton } from "..";
import { fetchRegister } from "../../utils/fetchAPI";
import { Register } from "../../interfaces/interface";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (values: Register) => {
    fetchRegister(values)
      .then((data) => {
        if (data && data.token) {
          localStorage.setItem("token", data.token);
          navigate("/register-profile");
        } else {
          alert("Invalid data format received from server");
        }
      })
      .catch((error) => alert(`Error in main code: ${error.message}`));
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const isFormEmpty =
    !formik.values.username && !formik.values.password && !formik.values.confirmPassword && !formik.values.email;

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          label='Username'
          variant='outlined'
          margin='normal'
          size='small'
          {...formik.getFieldProps("username")}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          fullWidth
          label='Password'
          type={showPassword ? "text" : "password"}
          variant='outlined'
          margin='normal'
          size='small'
          {...formik.getFieldProps("password")}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge='end'>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label='Confirm Password'
          type={showConfirmPassword ? "text" : "password"}
          variant='outlined'
          margin='normal'
          size='small'
          {...formik.getFieldProps("confirmPassword")}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownConfirmPassword}
                  edge='end'
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label='Email'
          variant='outlined'
          margin='normal'
          size='small'
          {...formik.getFieldProps("email")}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Button
          type='submit'
          color='primary'
          variant='contained'
          disabled={isFormEmpty}
          style={{ width: 114, borderRadius: 15, marginTop: 25 }}
        >
          Sign Up
        </Button>
        <Box alignItems='center' mt={3}>
          <Typography variant='body1' color='black' mt={2}>
            Or continue with :
          </Typography>
          <div style={{ marginTop: 15 }}>
            <GoogleAuthButton buttonText='Sign in' />
          </div>
          <div style={{ marginTop: 15, display: "block" }}>
            <Typography color='black' variant='overline'>
              Already have an account?
            </Typography>
            <Typography color='primary' variant='overline'>
              <Link to='/login' style={{ textDecoration: "none" }}>
                Login here.
              </Link>
            </Typography>
          </div>
        </Box>
      </form>
    </>
  );
};

export default RegistrationForm;
