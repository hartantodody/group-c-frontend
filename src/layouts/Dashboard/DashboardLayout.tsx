import { Typography, Paper } from "@mui/material";
import { DashboardLayoutProps } from "../../interfaces/interface";
import { Navbar } from "../../layout";
import "./DashboardLayout.css";
import { TodayDate } from "../../components";

const DashboardLayout = ({
  chartMenu,
  caloriesMenu,
  waterMenu,
  sleepMenu,
  stepsMenu,
  meditationMenu,
}: DashboardLayoutProps) => {
  const cardStyles = {
    padding: 5,
    borderRadius: 5,
    minHeight: 150,
    minWidth: 300,
    backgroundImage: "url(layout-bg-rotated.svg)",
    backgroundSize: 250,
    backgroundPosition: "bottom right",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className='base-layout'>
      <Navbar />
      <div className='title'></div>
      <Typography variant='h3' color='#FFFFFF' className='user-title'>
        Hi, {/* tambahin nama user pake use context*/}!
      </Typography>
      <TodayDate />
      <div className='chart'>{chartMenu}</div>
      <div className='container'>
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
