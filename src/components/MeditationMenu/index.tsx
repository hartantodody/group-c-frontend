import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import { fetcAddhMeditation } from "../../utils/fetchAPI";
import { fetchMeditation } from "../../utils/fetchAPI";
import Swal from "sweetalert2";

const MeditationMenu: React.FC = () => {
  const [minutesMeditated, setMinutesMeditated] = useState<number>(15);
  const [todaysMeditation, setTodaysMeditation] = useState<number>(0);
  const [counting, setCounting] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (counting && minutesMeditated > 0) {
      timer = setInterval(() => {
        setMinutesMeditated((prevMinutes) => (prevMinutes > 0 ? prevMinutes - 1 : 0));
      }, 60 * 1000);
    }

    return () => clearInterval(timer);
  }, [counting, minutesMeditated]);

  useEffect(() => {
    const fetchDailyMeditation = async () => {
      try {
        const response = await fetchMeditation();
        const data = response.data.meditationActual;
        setTodaysMeditation(data);
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
    setMinutesMeditated(15);
    setCounting(true);
    setButtonDisabled(true);
  };

  const handleStop = () => {
    setCounting(false);
    setButtonDisabled(false);
  };

  const handleReset = () => {
    setMinutesMeditated(15);
    setCounting(false);
    setButtonDisabled(false);
  };

  const handleAddMeditation = async () => {
    try {
      const totalAddMeditation = 15 - minutesMeditated + todaysMeditation;

      fetcAddhMeditation({ meditationActual: totalAddMeditation }).then((data) => {
        if (data.success === true) {
          Swal.fire({
            icon: "success",
            title: "Meditation Submitted!",
            text: `${data.message}`,
            confirmButtonText: "OK",
            confirmButtonColor: "#005792",
          });
        } else if (data.success === false) {
          Swal.fire({
            icon: "error",
            title: "Submit Failed!",
            text: `${data.message}`,
            confirmButtonText: "OK",
            confirmButtonColor: "#005792",
          });
        }
      });
    } catch (error) {
      alert("Error: " + error);
    }
  };

  return (
    <div>
      <Typography variant='h6'>Meditation</Typography>
      <Collapse in={!collapsed}>
        <div>
          <Typography variant='body1' color='primary'>
            Yesterday's meditation time: {todaysMeditation} minutes
          </Typography>
          <Typography>Minutes Remaining: {minutesMeditated} minutes</Typography>
          <Button variant='contained' color='primary' onClick={handleStart} disabled={buttonDisabled}>
            Start
          </Button>
          <Button variant='contained' color='error' onClick={handleStop}>
            Stop
          </Button>
          <Button variant='contained' color='secondary' onClick={handleReset}>
            Reset
          </Button>
          <Button variant='contained' color='primary' onClick={handleAddMeditation}>
            Submit
          </Button>
        </div>
      </Collapse>
      <Button variant='contained' color='primary' onClick={handleToggleCollapse}>
        {collapsed ? "Expand" : "Collapse"}
      </Button>
    </div>
  );
};

export default MeditationMenu;
