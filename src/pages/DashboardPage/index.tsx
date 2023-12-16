import { CaloriesMenu } from "../../components";
import DashboardLayout from "../../layouts/Dashboard/DashboardLayout";

const DashboardPage = () => {
  return <DashboardLayout caloriesMenu={<CaloriesMenu />} />;
};

export default DashboardPage;
