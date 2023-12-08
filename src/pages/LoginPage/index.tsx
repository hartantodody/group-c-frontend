import { LoginForm } from "../../components";
import PublicLayout from "../../layouts/Public/PublicLayout";

const LoginPage = () => {
  return (
    <>
      <PublicLayout children={LoginForm()} />
    </>
  );
};

export default LoginPage;
