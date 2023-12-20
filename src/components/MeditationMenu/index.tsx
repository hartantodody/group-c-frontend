import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { fetcAddhMeditation } from "../../utils/fetchAPI";
import { fetchMeditation } from "../../utils/fetchAPI";
import Swal from "sweetalert2";
import "./index.css";

const MeditationMenu: React.FC = () => {
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [todaysMeditation, setTodaysMeditation] = useState<number>(0);
  const [counting, setCounting] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (counting) {
      timer = setInterval(() => {
        setTotalSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [counting]);

  useEffect(() => {
    const fetchDailyMeditation = async () => {
      try {
        const response = await fetchMeditation();
        const data = response.data.meditationActual;
        if (data === null) {
          Swal.fire({
            icon: "error",
            title: "Error Fetching Meditation Data",
            text: "There was an error fetching today's meditation data. Please try again later.",
            confirmButtonText: "OK",
            confirmButtonColor: "#005792",
          });
        }
        setTodaysMeditation(data);
      } catch (error) {
        console.error("Error fetching today's meditation:", error);
      }
    };

    fetchDailyMeditation();
  }, []);

  const handleToggleCollapse = () => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
  };

  const handleStart = () => {
    setCounting(true);
    setButtonDisabled(true);
  };

  const handleStop = () => {
    setCounting(false);
    setButtonDisabled(false);
  };

  const handleReset = () => {
    setTotalSeconds(0);
    setCounting(false);
    setButtonDisabled(false);
  };

  const handleAddMeditation = async () => {
    try {
      const totalAddMeditation = Math.ceil(totalSeconds / 60) + todaysMeditation;

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

    fetchMeditation();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} min ${secs} sec`;
  };

  return (
    <div>
      <img src='/public/meditation-icon.svg' alt='meditation logo' />
      <Typography variant='h6' style={{ marginBottom: 10 }}>
        Meditation
      </Typography>
      <Collapse in={!collapsed}>
        <div>
          <Typography variant='body1' color='primary'>
            Total meditation time today : <span style={{ fontWeight: 700 }}>{todaysMeditation} minutes</span>
          </Typography>
          <Typography>
            Time elapsed: <span style={{ fontWeight: 700 }}>{formatTime(totalSeconds)}</span>
          </Typography>
          <Button
            variant='outlined'
            color='primary'
            onClick={handleStart}
            disabled={buttonDisabled}
            className='small-button'
          >
            <PlayArrowIcon className='small-icon' />
          </Button>
          <Button variant='outlined' color='error' onClick={handleStop} className='small-button'>
            <StopIcon className='small-icon' />
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleReset} className='small-button'>
            <RotateLeftIcon className='small-icon' />
          </Button>
          <br />
          <Button variant='contained' color='primary' onClick={handleAddMeditation} size='small' style={{ margin: 10 }}>
            <Typography variant='body1'>Submit</Typography>
          </Button>
        </div>
      </Collapse>
      <Button variant='outlined' color='primary' onClick={handleToggleCollapse} className='small-button'>
        {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      </Button>
    </div>
  );
};

export default MeditationMenu;
