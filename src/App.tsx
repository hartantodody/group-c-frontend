import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import {
  LandingPage,
  LoginPage,
  RegistrationPage,
  RegisterProfilePage,
  ProfilePage,
  DashboardPage,
  AddFoodConsumedPage,
  EmailSendPage,
  ResetPasswordPage,
  ResendVerifyPage,
  FailedVerifyPage,
  EditProfilePage,
} from "./pages";
import { VerificationSuccessPage } from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DashboardPage />} />
          <Route path='/signin' element={<LoginPage />} />
          <Route path='/signup' element={<RegistrationPage />} />
          <Route path='/register-profile' element={<RegisterProfilePage />} />
          <Route path='/landing-page' element={<LandingPage />} />
          <Route path='/add-food' element={<AddFoodConsumedPage />} />
          <Route path='/user-profile' element={<ProfilePage />} />
          <Route path='/home' element={<LandingPage />} />
          <Route path='/reset-request' element={<EmailSendPage />} />
          <Route path='/reset-password/:token/:userId' element={<ResetPasswordPage />} />
          <Route path='/resend-verify' element={<ResendVerifyPage />} />
          <Route path='/verify' element={<VerificationSuccessPage />} />
          <Route path='/failed-verify' element={<FailedVerifyPage />} />
          <Route path='/edit-profile' element={<EditProfilePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
