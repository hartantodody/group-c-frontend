import { RegisterProfileForm } from "../../components";
import PublicLayout from "../../layouts/Public/PublicLayout";

const RegistrationPage = () => {
  return (
    <>
      <PublicLayout titleText={"Add Profile"} children={RegisterProfileForm()} />
    </>
  );
};

export default RegistrationPage;
