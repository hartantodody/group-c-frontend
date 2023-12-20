
import { EditProfileForm } from "../../components";
import PublicLayout from "../../layouts/Public/PublicLayout";

const EditProfilePage = () => {
    return (
      <>
        <PublicLayout titleText={"Edit Profile"} children={EditProfileForm()} />
      </>
    );
  };
  
  export default EditProfilePage;
  