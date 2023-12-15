import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { LandingPage, LoginPage, RegistrationPage, RegisterProfilePage, ProfilePage } from "./pages";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<LoginPage />} />
          <Route path='/signup' element={<RegistrationPage />} />
          <Route path='/register-profile' element={<RegisterProfilePage />} />
          <Route path='/user-profile' element={<ProfilePage />} />
          <Route path='/home' element={<LandingPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
