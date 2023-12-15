import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

const TodayDate = () => {
  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    const userLocale = navigator.language;
    const currentDate = new Date();

    const formattedDate = currentDate.toLocaleDateString(userLocale, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    setTodayDate(formattedDate);
  }, []);

  return (
    <Typography variant='body1' color='#FFFFFF' className='user-title'>
      Today is {todayDate}.
    </Typography>
  );
};

export default TodayDate;
