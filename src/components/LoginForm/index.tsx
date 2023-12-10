import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { Box, IconButton, InputAdornment, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import { fetchLogin } from "../../utils/fetchAPI";
import { Login } from "../../interfaces/interface";

const LoginForm = () => {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = (values: Login) => {
    fetchLogin(values)
      .then((data) => {
        if (data && data.token) {
          localStorage.setItem("token", data.token);
          navigate("/dashboard");
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

  const isFormEmpty = !formik.values.username && !formik.values.password;
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
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
        <Box display='flex' justifyContent='space-between' alignItems='center' my={3}>
          <Button type='submit' color='primary' variant='contained' disabled={isFormEmpty}>
            Login
          </Button>
          <Typography variant='overline' color='secondary'>
            <Link to='/reset-password' target='_blank' style={{ textDecoration: "none", color: "gray" }}>
              Forgot your password?
            </Link>
          </Typography>
        </Box>
        <Typography variant='overline' color='secondary'>
          <Link to='/register' target='_blank' style={{ textDecoration: "none", color: "gray" }}>
            Dont have any account? Sign up now!
          </Link>
        </Typography>
      </form>
    </>
  );
};

export default LoginForm;
