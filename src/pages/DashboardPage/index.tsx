import { CaloriesMenu, GoogleMaps, MeditationMenu, SleepMenu, WaterMenu } from "../../components";
import DashboardLayout from "../../layouts/Dashboard/DashboardLayout";

const DashboardPage = () => {
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
