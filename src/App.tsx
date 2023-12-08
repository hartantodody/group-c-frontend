import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { LoginPage } from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
