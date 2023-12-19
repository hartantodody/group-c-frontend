import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import { fetcAddhMeditation } from "../../utils/fetchAPI";
import { fetchMeditation } from "../../utils/fetchAPI";

const MeditationMenu: React.FC = () => {
  const [minutesMeditated, setMinutesMeditated] = useState<number>(0);
  const [yesterdaysMeditation, setYesterdaysMeditation] = useState<number>(0);
  const [counting, setCounting] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (counting && minutesMeditated > 0) {
      timer = setInterval(() => {
        setMinutesMeditated((prevMinutes) => (prevMinutes > 0 ? prevMinutes - 1 : 0));
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [counting, minutesMeditated]);

  useEffect(() => {
    const fetchDailyMeditation = async () => {
      try {
        const response = await fetchMeditation();
        const data = response.data.meditationActual;
        setYesterdaysMeditation(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching yesterday's meditation:", error);
      }
    };

    fetchDailyMeditation();
  }, []);

  const handleToggleCollapse = () => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
  };

  const handleStart = () => {
    setCounting(true);
  };

  const handleStop = () => {
    setCounting(false);
  };

  const handleReset = () => {
    setMinutesMeditated(0);
    setCounting(false);
  };

  const handleAddMeditation = async () => {
    try {
      fetcAddhMeditation({ meditationActual: minutesMeditated });
      alert("Success submitting meditation time.");
    } catch (error) {
      alert("Error : " + error);
    }
  };

  return (
    <div>
      <Button variant='text' color='primary' onClick={handleToggleCollapse}>
        {collapsed ? "Expand Meditation" : "Collapse Meditation"}
      </Button>
      <Typography variant='body1' color={"white"}>
        Yesterday's meditation time : {yesterdaysMeditation}
      </Typography>
      <Collapse in={!collapsed}>
        <div>
          <Typography variant='h6'>Meditation</Typography>
          <Typography>Minutes Remaining: {minutesMeditated} minutes</Typography>
          <Button variant='contained' color='primary' onClick={handleStart}>
            Start
          </Button>
          <Button variant='outlined' color='error' onClick={handleStop}>
            Stop
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleReset}>
            Reset
          </Button>
          <Button variant='contained' color='primary' onClick={handleAddMeditation}>
            Submit
          </Button>
        </div>
      </Collapse>
    </div>
  );
};

export default MeditationMenu;
