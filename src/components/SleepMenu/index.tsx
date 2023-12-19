import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import addDays from "date-fns/addDays";
import { Box } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

interface SleepMenuProps {
  sleepStartProp?: string;
  wakeUpProp?: string;
}

const SleepMenu: React.FC<SleepMenuProps> = () => {
  const [expanded, setExpanded] = useState(false);
  const [sleepStart, setSleepStart] = useState<Date | null>(null);
  const [sleepEnd, setSleepEnd] = useState<Date | null>(null);

  const handleDatePickerSleepStart = (date: Date | null) => {
    setSleepStart(date);
  };
  
  const handleDatePickerSleepEnd = (date: Date | null) => {
    setSleepEnd(date);
  };

  const handleExpandClick = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div style={{ margin: "10px" }}>
      <div style={{ marginTop: "10px" }}>        
        <Typography variant='h5'>Sleep</Typography>
        <AnimatePresence>
          {expanded && (
            <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DemoContainer components={['DatePicker']}>
                  <MobileDateTimePicker
                    label="Sleep start time"
                    format="yyyy-MM-dd hh:mm"
                    value={sleepStart}
                    onChange={handleDatePickerSleepStart}
                  />
                </DemoContainer>
                <DemoContainer components={['DatePicker']}>
                  <MobileDateTimePicker
                    label="Wake up time"
                    format="yyyy-MM-dd hh:mm"
                    value={sleepEnd}
                    onChange={handleDatePickerSleepEnd}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <div style={{ marginTop: "10px" }}>
                <Button
                  variant='outlined'
                  color='secondary'
                  onClick={() => setSleepStart((prevDate) => addDays(prevDate || new Date(), 1))}
                >
                  submit
                </Button>
              </div>
            </motion.div>
          )}          
        </AnimatePresence>
      </div>
      <Box style={{ marginTop: 5 }}>
        <Button onClick={handleExpandClick} variant='outlined' color='secondary'>
          {expanded ? "Collapse" : "Expand"}
        </Button>
      </Box>
    </div>
  );
};

export default SleepMenu;
