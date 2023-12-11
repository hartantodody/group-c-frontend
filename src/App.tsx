import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { LoginPage, RegistrationPage, RegisterProfilePage } from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<LoginPage />} />
          <Route path='/signup' element={<RegistrationPage />} />
          <Route path='/register-profile' element={<RegisterProfilePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
