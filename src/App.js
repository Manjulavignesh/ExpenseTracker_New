import Login from "./Components/Login";
import { Router, Route, Routes } from "react-router-dom";
import WelcomeScreen from "./Components/WelcomeScreen";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/welcomepage" element={<WelcomeScreen/>}/>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
