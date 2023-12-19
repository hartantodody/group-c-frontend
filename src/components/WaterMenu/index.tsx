import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { Water } from "../../interfaces/interface";
import { fetchAddWaterIntake, fetchWaterIntake } from "../../utils/fetchAPI";

const WaterMenu: React.FC = () => {
  const [waterIntake, setWaterIntake] = useState<Water>({ waterActual: 0 });
  const [todaysIntake, setTodaysIntake] = useState<number | null>(null);
  const [userInput, setUserInput] = useState<string>("");
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTodaysIntake = async () => {
      try {
        const response = await fetchWaterIntake();
        const data = response.data.waterActual;
        setTodaysIntake(data);
        setUserInput(data.toString());
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

  const handleUserInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleUserInputSubmit = async () => {
    const parsedIntake = parseInt(userInput, 10);

    if (!isNaN(parsedIntake)) {
      setLoading(true);

      try {
        await fetchAddWaterIntake({ waterActual: parsedIntake });
        setWaterIntake({ waterActual: parsedIntake });
        setUserInput("");
        console.log({ waterActual: parsedIntake });
      } catch (error: any) {
        console.error("Error submitting water intake:", error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Invalid input. Please enter a valid number.");
    }
  };

  const handleIncrement = () => {
    setWaterIntake((prevIntake) => {
      const newIntake = { waterActual: (prevIntake?.waterActual || 0) + 1 };
      setUserInput(newIntake.waterActual.toString());
      return newIntake;
    });
    setTodaysIntake((prevIntake) => (prevIntake !== null ? prevIntake + 1 : 1));
  };

  const handleDecrement = () => {
    setWaterIntake((prevIntake) => {
      const newIntake = {
        waterActual: (prevIntake?.waterActual || 0) > 0 ? (prevIntake?.waterActual || 0) - 1 : 0,
      };
      setUserInput(newIntake.waterActual.toString());
      return newIntake;
    });
    setTodaysIntake((prevIntake) => (prevIntake !== null && prevIntake > 0 ? prevIntake - 1 : 0));
  };
  return (
    <div>
      <Typography variant='h4'>Water Intake</Typography>
      <Collapse in={!collapsed}>
        <div>
          <TextField
            label='Current Intake'
            type='number'
            value={todaysIntake !== null ? todaysIntake.toString() : ""}
            onChange={handleUserInputChange}
            InputProps={{ style: { backgroundColor: "#FFFFFF" } }}
          />
          <Typography>Target Intake: 8 glasses</Typography>
          <Button variant='contained' color='primary' onClick={handleIncrement}>
            Add Glass
          </Button>
          <Button variant='contained' color='error' onClick={handleDecrement}>
            Remove Glass
          </Button>
          <br />
          <Button
            variant='contained'
            color='success'
            onClick={handleUserInputSubmit}
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
