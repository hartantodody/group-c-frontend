import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import CircularProgress from "@mui/material/CircularProgress";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { fetchAddWaterIntake, fetchWaterIntake } from "../../utils/fetchAPI";
import "./index.css";
import { ProgressBar } from "..";
const WaterMenu: React.FC = () => {
  const [todaysIntake, setTodaysIntake] = useState<number | null>(null);
  const [userInput, setUserInput] = useState<number>(0);
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  console.log(userInput);
  console.log(todaysIntake);

  useEffect(() => {
    const fetchTodaysIntake = async () => {
      try {
        const response = await fetchWaterIntake();
        const data = response.data.waterActual as number;
        setTodaysIntake(data);
        console.log(data);
      } catch (error) {
        setTodaysIntake(0);
        console.error("Error fetching today's water intake:", error);
      }
    };

    fetchTodaysIntake();
  }, []);

  const handleToggleCollapse = () => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
  };

  const handleIncrement = () => {
    setUserInput((prevIntake) => (prevIntake !== null ? prevIntake + 1 : 1));
  };

  const handleDecrement = () => {
    setUserInput((prevIntake) => (prevIntake !== null && prevIntake > 0 ? prevIntake - 1 : 0));
  };

  const handleUserInputSubmit = async (input: number) => {
    try {
      setLoading(true);

      const totalIntake = todaysIntake !== null ? todaysIntake + input : input;
      console.log(totalIntake);

      await fetchAddWaterIntake({ waterActual: totalIntake });

      const response = await fetchWaterIntake();
      const updatedData = response.data.waterActual as number;

      setTodaysIntake(updatedData);
      setUserInput(0);
      console.log({ waterActual: updatedData });
    } catch (error: any) {
      console.error("Error submitting water intake:", error);
    } finally {
      setLoading(false);
    }
  };

  const waterProgress = (((todaysIntake !== 0 && todaysIntake !== null ? todaysIntake : 0) * 100) / 8).toFixed(2);

  return (
    <div>
      <img src='/public/glass-of-water-with-drop-svgrepo-com.svg' alt='glass of water icon' />
      <Typography variant='h6' style={{ marginBottom: 10 }}>
        Water Intake
      </Typography>
      <ProgressBar now={parseFloat(waterProgress)} />
      <Collapse in={!collapsed}>
        <div>
          <Typography variant='h6' color='primary'>
            {userInput === 0 ? "No Glasses" : `${userInput} ${userInput === 1 ? "Glass" : "Glasses"}`}
          </Typography>
          <Typography variant='body1'>
            Target Intake: <span style={{ fontWeight: 700 }}>8 Glasses</span>
          </Typography>
          <Button variant='outlined' color='primary' onClick={handleIncrement} className='small-button-water'>
            <AddIcon className='small-icon-water' />
            <img src='/public/water-glass.svg' alt='glass of water icon' style={{ width: 10 }} />
          </Button>
          <Button variant='outlined' color='error' onClick={handleDecrement} className='small-button-water'>
            <RemoveIcon className='small-icon-water' />
            <img src='/public/water-glass.svg' alt='glass of water icon' style={{ width: 10 }} />
          </Button>
          <br />
          <Button
            variant='contained'
            color='primary'
            onClick={() => handleUserInputSubmit(userInput)}
            size='small'
            style={{ margin: 10 }}
            disabled={loading}
          >
            <Typography variant='body1'>Submit</Typography>
            {loading && <CircularProgress size={17} sx={{ marginLeft: 1, color: "grey" }} />}
          </Button>
          <Typography variant='h6' style={{ marginTop: "20px" }}>
            Today's Water intake: {todaysIntake !== null ? `${todaysIntake} glasses` : "Loading..."}
          </Typography>
        </div>
      </Collapse>
      <Button variant='outlined' color='primary' onClick={handleToggleCollapse} className='small-button'>
        {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      </Button>
    </div>
  );
};

export default WaterMenu;
