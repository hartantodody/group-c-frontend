import { CaloriesMenu, FoodSearch } from "../../components";
import DashboardLayout from "../../layouts/Dashboard/DashboardLayout";

const DashboardPage = () => {
  return <DashboardLayout caloriesMenu={<CaloriesMenu />} chartMenu={<FoodSearch />} />;
};

export default DashboardPage;
