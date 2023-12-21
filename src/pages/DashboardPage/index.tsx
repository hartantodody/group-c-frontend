import React from "react";
import { CaloriesMenu, GoogleMaps, MeditationMenu, SleepMenu, WaterMenu } from "../../components";
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
      caloriesMenu={<CaloriesMenu />}
      sleepMenu={<SleepMenu />}
      stepsMenu={<GoogleMaps />}
      waterMenu={<WaterMenu />}
      meditationMenu={<MeditationMenu />}
    />
  );
};

export default DashboardPage;

