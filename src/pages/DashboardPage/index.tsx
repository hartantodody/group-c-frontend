import { CaloriesMenu, GoogleMaps, MeditationMenu, MoodMenu, SleepMenu, WaterMenu } from "../../components";
import LineChart from "../../components/LineChart";
import React from "react";
import DashboardLayout from "../../layouts/Dashboard/DashboardLayout";

import { useEffect } from 'react';
import { useLocation} from 'react-router-dom';

const DashboardPage = () => {
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    if (token) {
      localStorage.setItem('token', token);
    }
  }, [location.search]);
  return (
    <DashboardLayout
      chartMenu={<LineChart />}
      caloriesMenu={<CaloriesMenu />}
      sleepMenu={<SleepMenu />}
      stepsMenu={<GoogleMaps />}
      waterMenu={<WaterMenu />}
      meditationMenu={<MeditationMenu />}
      moodMenu={<MoodMenu />}
    />
  );
};

export default DashboardPage;

