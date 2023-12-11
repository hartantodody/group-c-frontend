import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Select, MenuItem, Button, FormControl, InputLabel, Typography } from "@mui/material";
import { fetchRegisterProfile } from "../../utils/fetchAPI";
import { Profile } from "../../interfaces/interface";

const RegisterProfileForm = () => {
  const navigate = useNavigate();
  const initialValues = {
    nickname: "",
    age: 0,
    gender: "",
    height: 0,
    weight: 0,
    activeness: "",
  };

  const validationSchema = Yup.object({
    nickname: Yup.string().max(50, "Nickname must be at most 50 characters"),
    age: Yup.number().max(150, "Age must be less than or equal to 150"),
    gender: Yup.string().oneOf(["man", "woman"], "Invalid gender"),
    height: Yup.number().min(0, "Height must be at least 50cm").max(300, "Height must be less than or equal to 300cm"),
    weight: Yup.number().min(25, "Weight must be at least 25kg").max(300, "Weight must be less than or equal to 300kg"),
    activeness: Yup.string().oneOf(["light", "moderate", "active"], "Invalid activeness"),
  });

  const onSubmit = (values: Profile) => {
    fetchRegisterProfile(values)
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

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          label='Nickname'
          variant='outlined'
          margin='normal'
          size='small'
          {...formik.getFieldProps("nickname")}
          error={formik.touched.nickname && Boolean(formik.errors.nickname)}
          helperText={formik.touched.nickname && formik.errors.nickname}
        />
        <TextField
          fullWidth
          label='Age'
          variant='outlined'
          margin='normal'
          size='small'
          type='number'
          {...formik.getFieldProps("age")}
          error={formik.touched.age && Boolean(formik.errors.age)}
          helperText={formik.touched.age && formik.errors.age}
        />
        <FormControl fullWidth variant='outlined' margin='normal' size='small'>
          <InputLabel htmlFor='gender'>Gender</InputLabel>
          <Select
            label='Gender'
            {...formik.getFieldProps("gender")}
            error={formik.touched.gender && Boolean(formik.errors.gender)}
          >
            <MenuItem value='man'>Man</MenuItem>
            <MenuItem value='woman'>Woman</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label='Height'
          variant='outlined'
          margin='normal'
          size='small'
          type='number'
          {...formik.getFieldProps("height")}
          error={formik.touched.height && Boolean(formik.errors.height)}
          helperText={formik.touched.height && formik.errors.height}
        />
        <TextField
          fullWidth
          label='Weight'
          variant='outlined'
          margin='normal'
          size='small'
          type='number'
          {...formik.getFieldProps("weight")}
          error={formik.touched.weight && Boolean(formik.errors.weight)}
          helperText={formik.touched.weight && formik.errors.weight}
        />
        <FormControl fullWidth variant='outlined' margin='normal' size='small'>
          <InputLabel htmlFor='gender'>Activeness</InputLabel>
          <Select
            label='Activeness'
            {...formik.getFieldProps("activeness")}
            error={formik.touched.activeness && Boolean(formik.errors.activeness)}
          >
            <MenuItem value='light'>Light (Exercise : 1x a week)</MenuItem>
            <MenuItem value='moderate'>Moderate (Exercise : 3x a week)</MenuItem>
            <MenuItem value='active'>Active (Exercise : 5x a week)</MenuItem>
          </Select>
        </FormControl>
        <Button
          type='submit'
          color='primary'
          variant='contained'
          style={{ width: 114, borderRadius: 15, marginTop: 25 }}
        >
          Submit
        </Button>
      </form>
      <div>
        <Typography style={{ color: "grey" }}>
          <Link to='/dashboard' style={{ textDecoration: "none" }}>
            Skip for now {">>>"}
          </Link>
        </Typography>
      </div>
    </>
  );
};

export default RegisterProfileForm;
