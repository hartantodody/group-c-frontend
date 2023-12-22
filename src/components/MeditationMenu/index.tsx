import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { AnimatePresence, motion } from "framer-motion";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { fetcAddhMeditation } from "../../utils/fetchAPI";
import { fetchMeditation } from "../../utils/fetchAPI";
import Swal from "sweetalert2";
import "./index.css";
import { ProgressBar } from "..";

const MeditationMenu: React.FC = () => {
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [todaysMeditation, setTodaysMeditation] = useState<number>(0);
  const [counting, setCounting] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (counting) {
      timer = setInterval(() => {
        setTotalSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [counting]);

  const fetchDailyMeditation = async () => {
    try {
      const response = await fetchMeditation();
      const data = response.data.meditationActual;
      if (data === null) {
        console.error(data.message);
      }
      setTodaysMeditation(data);
    } catch (error) {
      console.error("Error fetching today's meditation:", error);
    }
  };

  useEffect(() => {
    fetchDailyMeditation();
  }, []);

  const handleExpandClick = () => {
    setExpanded((prevExpanded) => !prevExpanded);
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
            title: "Meditation time submitted!",
            text: `${data.message}`,
            confirmButtonText: "OK",
            confirmButtonColor: "#005792",
          });
        } else if (data.success === false) {
          Swal.fire({
            icon: "error",
            title: "Submission has failed!",
            text: `${data.message}`,
            confirmButtonText: "OK",
            confirmButtonColor: "#005792",
          });
        }
      });
    } catch (error) {
      alert("Error: " + error);
    }

    fetchDailyMeditation();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} min ${secs} sec`;
  };

  const meditationProgress = ((todaysMeditation * 100) / 15).toFixed(2);

  return (
    <div style={{ margin: "10px" }}>
      <img src='/meditation-yoga-posture.svg' alt='meditation logo' style={{ width: 50 }} />
      <Typography variant='h6' style={{ marginBottom: 20 }}>
        Meditation
      </Typography>
      <ProgressBar now={parseFloat(meditationProgress)} />
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 283, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div>
              <Typography variant='body1' color='primary' sx={{ marginTop: "50px" }}>
                Total meditation time today :
              </Typography>
              <Typography variant='h5' color='primary'>
                <span style={{ fontWeight: 700 }}>{todaysMeditation} minutes</span>
              </Typography>
              <Typography variant='body1' color='primary' sx={{ marginTop: "25px" }}>
                Time elapsed:
              </Typography>
              <Typography variant='h6'>
                <span style={{ fontWeight: 700 }}>{formatTime(totalSeconds)}</span>
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
              <Button
                variant='contained'
                color='primary'
                onClick={handleAddMeditation}
                size='small'
                style={{ margin: 10 }}
              >
                <Typography variant='body1'>Submit</Typography>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Box style={{ marginTop: 20 }}>
        <Button onClick={handleExpandClick} variant='outlined' color='primary' className='small-button'>
          {!expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </Button>
      </Box>
    </div>
  );
};

export default MeditationMenu;
