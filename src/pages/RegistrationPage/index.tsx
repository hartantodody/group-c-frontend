import { RegistrationForm } from "../../components";
import PublicLayout from "../../layouts/Public/PublicLayout";

const RegistrationPage = () => {
  return (
    <>
      <PublicLayout titleText={"Sign Up"} children={RegistrationForm()} />
    </>
  );
};

export default RegistrationPage;
