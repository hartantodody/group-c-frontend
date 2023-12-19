import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchAddWaterIntake, fetchWaterIntake } from "../../utils/fetchAPI";

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

  return (
    <div>
      <Typography variant='h5'>Water Intake</Typography>
      <Collapse in={!collapsed}>
        <div>
          <Typography variant='h4' color='primary'>
            {userInput === 0 ? "No Glasses" : `${userInput} ${userInput === 1 ? "Glass" : "Glasses"}`}
          </Typography>
          <Typography>Target Intake: 8 glasses</Typography>
          <Button variant='contained' color='primary' onClick={handleIncrement}>
            + Glass
          </Button>
          <Button variant='contained' color='error' onClick={handleDecrement}>
            - Glass
          </Button>
          <br />
          <Button
            variant='contained'
            color='success'
            onClick={() => handleUserInputSubmit(userInput)}
            style={{ width: 250, margin: "5px 0" }}
          >
            Submit
          </Button>
          {loading && <CircularProgress />}
          <Typography variant='h6' style={{ marginTop: "20px" }}>
            Today's Water intake: {todaysIntake !== null ? `${todaysIntake} glasses` : "Loading..."}
          </Typography>
        </div>
      </Collapse>
      <Button variant='contained' color='primary' onClick={handleToggleCollapse}>
        {collapsed ? "Expand" : "Collapse"}
      </Button>
    </div>
  );
};

export default WaterMenu;
