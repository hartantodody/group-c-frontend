
import { VerifyButton } from "../../components";
import PublicLayout from "../../layouts/Public/PublicLayout";

const ResendVerifyPage = () => {
    return (
      <>
        <PublicLayout titleText={"Account Verification"} children={VerifyButton()} />
      </>
    );
  };
  
  export default ResendVerifyPage;
  