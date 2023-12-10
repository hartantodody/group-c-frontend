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
import { GoogleAuthButton } from "..";

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
        <Button
          type='submit'
          color='primary'
          variant='contained'
          disabled={isFormEmpty}
          style={{ width: 114, borderRadius: 15, marginTop: 25 }}
        >
          Sign In
        </Button>
        <Box display='block' alignItems='center' mt={3}>
          <Typography variant='body1' color='black' mt={2}>
            Or continue with :
          </Typography>
          <div style={{ marginTop: 15 }}>
            <GoogleAuthButton buttonText='Sign in' />
          </div>
        </Box>
      </form>
    </>
  );
};

export default LoginForm;
