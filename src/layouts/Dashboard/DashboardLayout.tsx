import { Typography, Paper, Box } from "@mui/material";
import { DashboardLayoutProps } from "../../interfaces/interface";
import { Navbar } from "../../layout";
import "./DashboardLayout.css";
import { Weather } from "../../components";

const DashboardLayout = ({
  chartMenu,
  caloriesMenu,
  waterMenu,
  sleepMenu,
  stepsMenu,
  meditationMenu,
  moodMenu,
  nickname,
}: DashboardLayoutProps) => {
  const cardStyles = {
    padding: 5,
    borderRadius: 5,
    minHeight: 250,
    minWidth: 300,
    backgroundImage: "url(layout-bg-rotated.svg)",
    backgroundSize: 250,
    backgroundPosition: "bottom right",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className='base-layout'>
      <Navbar />
      <div className='title'>
        <Typography variant='h4' color='#FFFFFF' className='user-title' paddingLeft={"50px"}>
          Hi, {nickname}!
        </Typography>
      </div>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: "5px",width: "100svw", paddingLeft: "1vw", paddingRight: "2vw"}}>
        <div className='chart'>{chartMenu}</div>
        <div className='weather'>
          <Weather />
        </div>
      </Box>
      <div className='container'>
        <Paper elevation={5} sx={cardStyles}>
          {moodMenu}
        </Paper>
        <Paper elevation={5} sx={cardStyles}>
          {caloriesMenu}
        </Paper>
        <Paper elevation={5} sx={cardStyles}>
          {waterMenu}
        </Paper>
        <Paper elevation={5} sx={cardStyles}>
          {sleepMenu}
        </Paper>
        <Paper elevation={5} sx={cardStyles}>
          {stepsMenu}
        </Paper>
        <Paper elevation={5} sx={cardStyles}>
          {meditationMenu}
        </Paper>
      </div>
    </div>
  );
};

export default DashboardLayout;
