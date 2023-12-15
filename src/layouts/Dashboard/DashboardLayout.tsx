import { Typography } from "@mui/material";
import { DashboardLayoutProps } from "../../interfaces/interface";
import { Navbar } from "../../layout";
import "./DashboardLayout.css";
import { TodayDate } from "../../components";

const DashboardLayout = ({ chartMenu, caloriesMenu }: DashboardLayoutProps) => {
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
        <div className='dashboard-card'>{caloriesMenu}</div>
        <div className='dashboard-card'></div>
        <div className='dashboard-card'></div>
        <div className='dashboard-card'></div>
        <div className='dashboard-card'></div>
      </div>
    </div>
  );
};

export default DashboardLayout;
