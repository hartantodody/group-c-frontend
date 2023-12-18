import { EmailSendForm } from "../../components";
import PublicLayout from "../../layouts/Public/PublicLayout";

const EmailSendPage = () => {
    return (
      <>
        <PublicLayout titleText={"Recover Password"} children={EmailSendForm()} />
      </>
    );
  };
  
  export default EmailSendPage;
  