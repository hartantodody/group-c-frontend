import { EmailSendForm } from "../../components";
import PublicLayout from "../../layouts/Public/PublicLayout";

const EmailSendPage = () => {
    return (
      <>
        <PublicLayout titleText={"Reset Request"} children={EmailSendForm()} />
      </>
    );
  };
  
  export default EmailSendPage;
  