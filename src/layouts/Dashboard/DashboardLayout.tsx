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
        <Paper elevation={5} sx={{ padding: 5, borderRadius: 5 }}>
          {caloriesMenu}
        </Paper>
        <Paper elevation={5} sx={{ padding: 5, borderRadius: 5 }}>
          {waterMenu}
        </Paper>
        <Paper elevation={5} sx={{ padding: 5, borderRadius: 5 }}>
          {sleepMenu}
        </Paper>
        <Paper elevation={5} sx={{ padding: 5, borderRadius: 5 }}>
          {stepsMenu}
        </Paper>
        <Paper elevation={5} sx={{ padding: 5, borderRadius: 5 }}>
          {meditationMenu}
        </Paper>
      </div>
    </div>
  );
};

export default DashboardLayout;
