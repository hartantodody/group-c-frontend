import { CaloriesMenu, MeditationMenu, SleepMenu, WaterMenu } from "../../components";
import DashboardLayout from "../../layouts/Dashboard/DashboardLayout";

const DashboardPage = () => {
  return (
    <DashboardLayout
      caloriesMenu={<CaloriesMenu />}
      sleepMenu={<SleepMenu />}
      waterMenu={<WaterMenu />}
      meditationMenu={<MeditationMenu />}
    />
  );
};

export default DashboardPage;
