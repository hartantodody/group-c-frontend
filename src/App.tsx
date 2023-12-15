import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { LandingPage, LoginPage, RegistrationPage, RegisterProfilePage, DashboardPage } from "./pages";

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
