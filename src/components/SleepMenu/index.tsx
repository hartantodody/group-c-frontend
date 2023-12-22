import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Box } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { format } from "date-fns";
import { fetchAddSleep, fetchGetSleep } from "../../utils/fetchAPI";
import ProgressBarComponent from "../ProgressBar";

const SleepMenu: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [sleepStart, setSleepStart] = useState<Date | null>(null);
  const [sleepEnd, setSleepEnd] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [progressValue, setProgressValue] = useState<number>(0);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formattedSleepStart = sleepStart
        ? format(sleepStart, "yyyy-MM-dd HH:mm")
        : "";
      const formattedSleepEnd = sleepEnd
        ? format(sleepEnd, "yyyy-MM-dd HH:mm")
        : "";
      const newSleep = {
        sleepStart: formattedSleepStart,
        sleepEnd: formattedSleepEnd,
      };
      await fetchAddSleep(newSleep);
    } catch (error) {
      console.error("Error submitting water intake:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDatePickerSleepStart = (date: Date | null) => {
    setSleepStart(date);
  };

  const handleDatePickerSleepEnd = (date: Date | null) => {
    setSleepEnd(date);
  };

  const handleExpandClick = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const now = async () => {
    try {
      const result = await fetchGetSleep();
      const sleepActual = result.data.sleepActual;
      const sleepProgress = ((sleepActual * 100) / 7).toFixed(2);
      console.log("sleep", result);
      setProgressValue(parseFloat(sleepProgress));
    } catch (error) {
      console.error("Error fetching sleep data:", error);
      setProgressValue(0);
    }
  };
  useEffect(() => {
    now();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [now()]);

  return (
    <div style={{ margin: "10px" }}>
      <img
        src="public\moon-sleep.svg"
        alt="moon sleep"
        style={{ width: "50px" }}
      ></img>
      <Typography variant="h5" style={{ marginBottom: 20 }}>
        Sleep
      </Typography>
      <ProgressBarComponent now={progressValue} />
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DemoContainer
                components={["DatePicker"]}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <img src="public\sleep-in-bed.svg" alt="Sleep in Bed" />
                  <MobileDateTimePicker
                    label="Sleep start time"
                    format="yyyy-MM-dd HH:mm"
                    value={sleepStart}
                    onChange={handleDatePickerSleepStart}
                  />
                </div>
              </DemoContainer>
              <DemoContainer
                components={["DatePicker"]}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <img src="public\wake-up-bed.svg" alt="Wake up Bed"></img>
                  <MobileDateTimePicker
                    label="Wake up time"
                    format="yyyy-MM-dd HH:mm"
                    value={sleepEnd}
                    onChange={handleDatePickerSleepEnd}
                  />
                </div>
              </DemoContainer>
            </LocalizationProvider>
            <div style={{ marginTop: "10px" }}>
              <Button
                variant="contained"
                color="primary"
                disabled={loading}
                onClick={handleSubmit}
              >
                <Typography variant="body1">Submit</Typography>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Box style={{ marginTop: 20 }}>
        <Button
          onClick={handleExpandClick}
          variant="outlined"
          color="primary"
          className="small-button"
        >
          {!expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </Button>
      </Box>
    </div>
  );
};

export default SleepMenu;
