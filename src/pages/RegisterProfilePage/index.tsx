import { RegisterProfileForm } from "../../components";
import PublicLayout from "../../layouts/Public/PublicLayout";

const RegistrationPage = () => {
  return (
    <>
      <PublicLayout titleText={"Sign Up"} children={RegisterProfileForm()} />
    </>
  );
};

export default RegistrationPage;
