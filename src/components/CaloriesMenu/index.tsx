import { useState, useEffect } from "react";
import { Typography, Box, CircularProgress, Button, LinearProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fetchCalories } from "../../utils/fetchAPI";
import { ShowFoodConsumed } from "..";

type CalorieData = {
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
    const fetchData = async () => {
      try {
        const response = await fetchCalories();
        const data = response.data;

        if (data === undefined) {
          alert("Data not available");
        } else {
          setCalories(data);
          console.log(data);
        }
      } catch (error) {
        alert(`Error in fetching calories: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExpandClick = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const handleAddFood = () => {
    navigate("/add-food");
  };

  const calculateProgress = () => {
    if (calories && calories[0]?.actual && calories[0]?.target) {
      return (calories[0].actual / calories[0].target) * 100;
    }
    return 0;
  };

  return (
    <>
      <Typography variant='h4'>Daily Calories</Typography>
      <LinearProgress
        variant='determinate'
        value={calculateProgress()}
        color='primary'
        style={{ marginTop: 5, marginBottom: 5, height: 5, backgroundColor: "#FFFFFF" }}
      />
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
                <Typography variant='body1'>
                  Calories intake: {calories !== null && calories[0]?.actual !== null ? calories[0].actual : "N/A"}
                </Typography>
                <Typography variant='body1'>
                  Body Mass Index (BMI): {calories !== null && calories[0]?.bmi !== null ? calories[0].bmi : "N/A"}
                </Typography>
                <Typography variant='body1'>
                  Active Metabolic Rate (AMR):{" "}
                  {calories !== null && calories[0]?.amr !== null ? calories[0].amr : "N/A"}
                </Typography>
                <Typography variant='body1'>
                  Target: {calories !== null && calories[0]?.target !== null ? calories[0].target : "N/A"} kcal
                </Typography>
                <Button variant='contained' size='small' color='success' onClick={handleAddFood}>
                  <AddIcon /> <img src='/eat-food-healthy-life-svgrepo-com.svg' alt='healthy-food-icon' />
                </Button>
                <ShowFoodConsumed />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <Box style={{ marginTop: 5 }}>
        <Button onClick={handleExpandClick} variant='outlined' color='secondary'>
          {expanded ? "Collapse" : "Expand"}
        </Button>
      </Box>
    </>
  );
};

export default CaloriesMenu;
