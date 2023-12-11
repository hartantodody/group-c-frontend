import { RegistrationForm } from "../../components";
import PublicLayout from "../../layouts/Public/PublicLayout";

const LoginPage = () => {
  return (
    <>
      <PublicLayout titleText={"Sign Up"} children={RegistrationForm()} />
    </>
  );
};

export default LoginPage;
