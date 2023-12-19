import { ResetPasswordForm } from "../../components";
import PublicLayout from "../../layouts/Public/PublicLayout";

const ResetPasswordPage = () => {
    return (
      <>
        <PublicLayout titleText={"Reset Password"} children={ResetPasswordForm()} />
      </>
    );
  };
  
  export default ResetPasswordPage;
  