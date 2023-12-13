import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { LandingPage, LoginPage, RegistrationPage, RegisterProfilePage } from "./pages";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    } else {
      navigate("/landing-page");
    }
  }, [token, navigate]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<LoginPage />} />
          <Route path='/signup' element={<RegistrationPage />} />
          <Route path='/register-profile' element={<RegisterProfilePage />} />
          <Route path='/landing-page' element={<LandingPage />} />
          <Route path='/' element={null} /> {/* <<< inget ubah begitu dashboard jadi*/}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
