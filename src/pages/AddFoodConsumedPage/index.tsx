import { FoodSearch } from "../../components";
import PublicLayout from "../../layouts/Public/PublicLayout";

const AddFoodConsumedPage = () => {
  return <PublicLayout titleText='Add Food Consumed' children={<FoodSearch />} />;
};

export default AddFoodConsumedPage;
