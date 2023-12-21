import { useState, useEffect } from "react";
import { Typography, CircularProgress, Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fetchCalculateCalories, fetchCalories } from "../../utils/fetchAPI";
import Swal from "sweetalert2";
import "./index.css";
import { ProgressBar } from "..";

type CalorieData = {
  id: number;
  actual: number;
  bmi: number;
  amr: number;
  target: number;
};

const CaloriesMenu = () => {
  const navigate = useNavigate();
  const [calories, setCalories] = useState<CalorieData | null>(null);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCalculateCalories = async () => {
    try {
      const data = await fetchCalculateCalories();

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
        title: "Error!",
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
        const data = response.data;
        setCalories(data);
      } else if (response.success === false) {
        console.error(response.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleExpandClick = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const handleAddFood = () => {
    navigate("/add-food");
  };

  const caloriesProgress = (((calories?.actual ?? 0) * 100) / (calories?.target ?? 1)).toFixed(2);

  return (
    <>
      <img src='public\fire-svgrepo-com.svg' alt='calories burn icon' style={{ width: "50px" }}></img>
      <Typography variant='h6'>Daily Calories</Typography>
      <ProgressBar now={parseFloat(caloriesProgress)} />
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
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Calories intake</TableCell>
                      <TableCell>Body Mass Index (BMI)</TableCell>
                      <TableCell>Active Metabolic Rate (AMR)</TableCell>
                      <TableCell>Target</TableCell>
                    </TableRow>
                    {calories && (
                      <TableRow key={calories.id}>
                        <TableCell>{calories.actual !== null ? calories.actual : "N/A"}</TableCell>
                        <TableCell>{calories.bmi !== null ? calories.bmi : "N/A"}</TableCell>
                        <TableCell>{calories.amr !== null ? calories.amr : "N/A"}</TableCell>
                        <TableCell>{calories.target !== null ? `${calories.target} kcal` : "N/A"}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>

                <br />
                <Button
                  variant='outlined'
                  size='small'
                  color='primary'
                  onClick={handleAddFood}
                  className='small-button-food'
                >
                  <AddIcon />{" "}
                  <img src='public/food-menu-3-svgrepo-com.svg' alt='healthy-food-icon' style={{ width: 35 }} />
                </Button>
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
