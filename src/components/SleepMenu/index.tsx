import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import addDays from "date-fns/addDays";

interface SleepMenuProps {
  sleepStartProp?: string;
  wakeUpProp?: string;
}

const SleepMenu: React.FC<SleepMenuProps> = ({ sleepStartProp, wakeUpProp }) => {
  const [sleepStart, setSleepStart] = useState<Date | null>(sleepStartProp ? new Date(sleepStartProp) : null);
  const [wakeUp, setWakeUp] = useState<Date | null>(wakeUpProp ? new Date(wakeUpProp) : null);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  useEffect(() => {
    // Update the state when props change
    setSleepStart(sleepStartProp ? new Date(sleepStartProp) : null);
    setWakeUp(wakeUpProp ? new Date(wakeUpProp) : null);
  }, [sleepStartProp, wakeUpProp]);

  const handleToggleCollapse = () => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
  };

  return (
    <div style={{ margin: "10px" }}>
      <Button variant='text' color='primary' onClick={handleToggleCollapse}>
        {collapsed ? "Expand Sleep" : "Collapse Sleep"}
      </Button>
      <Collapse in={!collapsed}>
        <div style={{ marginTop: "10px" }}>
          <Typography variant='h6'>Sleep</Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TextField fullWidth variant='outlined' style={{ marginTop: "10px" }}>
              <DesktopDatePicker
                label='Sleep Start'
                value={sleepStart}
                onChange={(date: Date | null) => setSleepStart(date)}
              />
            </TextField>
            <TextField fullWidth variant='outlined' style={{ marginTop: "10px" }}>
              <DesktopDatePicker label='Wake Up' value={wakeUp} onChange={(date: Date | null) => setWakeUp(date)} />
            </TextField>
          </LocalizationProvider>
          <div style={{ marginTop: "10px" }}>
            <Button
              variant='outlined'
              color='secondary'
              onClick={() => setSleepStart((prevDate) => addDays(prevDate || new Date(), 1))}
            >
              Add a day to Sleep Start
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              onClick={() => setWakeUp((prevDate) => addDays(prevDate || new Date(), 1))}
            >
              Add a day to Wake Up
            </Button>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default SleepMenu;
