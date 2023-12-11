import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { LandingPage, LoginPage } from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/' element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
