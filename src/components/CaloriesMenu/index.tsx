import { useState, useEffect } from "react";
import { Typography, Box, CircularProgress, Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fetchCalculateCalories, fetchCalories } from "../../utils/fetchAPI";
import { ShowFoodConsumed } from "..";
import Swal from "sweetalert2";
import "./index.css";

type CalorieData = {
  id: number;
  actual: number;
  bmi: number;
  amr: number;
  target: number;
};

const CaloriesMenu = () => {
  const navigate = useNavigate();
  const [calories, setCalories] = useState<CalorieData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    handleCalculateCalories();
    fetchData();
  }, []);

  const handleCalculateCalories = async () => {
    try {
      const data = await fetchCalculateCalories();
      console.log(data);

      if (data.success === true) {
        setCalories(data.data);
      } else if (data.success === false) {
        Swal.fire({
          icon: "error",
          title: "Calories Calculation Failed!",
          text: `${data.message}`,
          confirmButtonText: "OK",
          confirmButtonColor: "#005792",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error in main code",
        text: `${error}`,
        confirmButtonText: "OK",
        confirmButtonColor: "#005792",
      });
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetchCalories();
      if (response.success === true) {
        Swal.fire({
          icon: "success",
          title: "Calories calculation successful!",
          text: `${response.message}`,
          confirmButtonText: "OK",
          confirmButtonColor: "#005792",
        });
        const data = response.data;

        setCalories(data);
        console.log(data);
        console.log(response);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed fetching calories data!",
          text: `${response.message}`,
          confirmButtonText: "OK",
          confirmButtonColor: "#005792",
        });
      }
    } catch (error) {
      alert(`Error in fetching calories: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleExpandClick = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const handleAddFood = () => {
    navigate("/add-food");
  };
  return (
    <>
      <img src='public\fire-svgrepo-com.svg' alt='calories burn icon' style={{ width: "50px" }}></img>
      <Typography variant='h6'>Daily Calories</Typography>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                <Button variant='contained' size='small' color='primary' onClick={handleCalculateCalories}>
                  Calculate
                </Button>
                {calories && calories[0] && (
                  <Table>
                    <TableBody>
                      {calories &&
                        calories.map((calorie) => (
                          <TableRow key={calorie.id}>
                            <TableCell>Calories intake:</TableCell>
                            <TableCell>{calorie.actual !== null ? calorie.actual : "N/A"}</TableCell>
                            <TableRow>
                              <TableCell>Body Mass Index (BMI):</TableCell>
                              <TableCell>{calorie.bmi !== null ? calorie.bmi : "N/A"}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Active Metabolic Rate (AMR):</TableCell>
                              <TableCell>{calorie.amr !== null ? calorie.amr : "N/A"}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Target:</TableCell>
                              <TableCell>{calorie.target !== null ? `${calorie.target} kcal` : "N/A"}</TableCell>
                            </TableRow>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                )}
                <br />
                <Button
                  variant='outlined'
                  size='small'
                  color='primary'
                  onClick={handleAddFood}
                  className='small-button-food'
                >
                  <AddIcon />{" "}
                  <img src='public/food-menu-3-svgrepo-com.svg' alt='healthy-food-icon' style={{ width: 25 }} />
                </Button>
                <ShowFoodConsumed />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <Button onClick={handleExpandClick} variant='outlined' color='primary' className='small-button'>
        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Button>
    </>
  );
};

export default CaloriesMenu;
