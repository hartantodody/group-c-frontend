import { CaloriesMenu, GoogleMaps, MeditationMenu, MoodMenu, SleepMenu, WaterMenu } from "../../components";
import LineChart from "../../components/LineChart";
import DashboardLayout from "../../layouts/Dashboard/DashboardLayout";

const DashboardPage = () => {
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
