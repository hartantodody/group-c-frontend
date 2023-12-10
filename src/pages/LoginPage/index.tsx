import { LoginForm } from "../../components";
import PublicLayout from "../../layouts/Public/PublicLayout";

const LoginPage = () => {
  return (
    <>
      <PublicLayout titleText={"Sign In"} children={LoginForm()} />
    </>
  );
};

export default LoginPage;
