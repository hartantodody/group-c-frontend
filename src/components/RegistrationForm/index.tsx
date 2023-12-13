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
import Swal from "sweetalert2";

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
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/, "Password must be alphanumeric"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required")
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|co\.id)$/, "Invalid email domain"),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = ({ username, password, email }: Register) => {
    fetchRegister({ username, password, email })
      .then((data) => {
        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "Registration",
            text: "Registration success. Please check your email for the verification link!",
            confirmButtonText: "OK",
            confirmButtonColor: "#005792",
          });
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
          InputLabelProps={{
            style: { fontSize: "12px" },
          }}
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
          InputLabelProps={{
            style: { fontSize: "12px" },
          }}
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
          InputLabelProps={{
            style: { fontSize: "12px" },
          }}
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
          InputLabelProps={{
            style: { fontSize: "12px" },
          }}
          {...formik.getFieldProps("email")}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Button
          type='submit'
          color='primary'
          variant='contained'
          disabled={isFormEmpty}
          style={{ width: 114, borderRadius: 15, marginTop: 25, fontSize: 12 }}
        >
          Sign Up
        </Button>
      </form>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        mx='auto'
        mt={3}
        textAlign='center'
      >
        <Typography variant='body1' color='black' mt={2}>
          Or continue with :
        </Typography>
        <GoogleAuthButton buttonText='Sign up' />
        <Typography color='black' variant='body1' mt={5}>
          Already have an account?
        </Typography>
        <Typography color='primary' variant='body1' style={{ fontWeight: "bold" }}>
          <Link to='/signin' style={{ textDecoration: "none", color: "black" }}>
            Login here.
          </Link>
        </Typography>
      </Box>
    </>
  );
};

export default RegistrationForm;
