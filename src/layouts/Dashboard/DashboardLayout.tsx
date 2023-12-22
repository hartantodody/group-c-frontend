import { Typography, Paper } from "@mui/material";
import { DashboardLayoutProps } from "../../interfaces/interface";
import { Footer, Navbar } from "../../layout";
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
    minWidth: 325,
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
      <div className='top-container'>
        <div className='weather'>
          <Weather />
        </div>
        <div className='chart'>{chartMenu}</div>
      </div>
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
      <Footer />
    </div>
  );
};

export default DashboardLayout;
