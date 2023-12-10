import Login from "./Components/Login.js";
import { Route, Routes } from "react-router-dom";
import WelcomeScreen from "./Components/WelcomeScreen.js";
import { BrowserRouter } from "react-router-dom";
import Updateprofile from "./Components/UpdateProfile.js";
import React, { useEffect, useState } from "react";
import VerifyEmail from "./Components/VerifyEmail.js";
import ForgotPasswordWindow from "./Components/ForgotPasswordWindow.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { expenseAction, themeAction } from "./store/index.js";
export const Ctx = React.createContext();
function App() {
  const dispatch = useDispatch();
  const color = useSelector((state) => state.themes.color);
  document.body.style.background = `${color}`;
  const [expense, setExpense] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios
        .get(
          "https://expensetracker-authentic-6234a-default-rtdb.firebaseio.com/expense.json"
        )
        .then((res) => {
          if (res.data != null) {
            return Object.values(res.data);
          } else {
            return [];
          }
        });
      setExpense(response);
      dispatch(expenseAction.addExpense(response));
      dispatch(expenseAction.expenseTotalInitial(response));
      if (localStorage.getItem("premium") == "true")
        dispatch(themeAction.premiumChange());
      if (localStorage.getItem("theme") == "dark")
        dispatch(themeAction.themeChange("#3d8ae8"));
      else if (localStorage.getItem("theme") == "light")
        dispatch(themeAction.themeChange("white"));
    };
    fetchData();
  }, []);
  const handleContentLoaded = () => {
    const Name = document.getElementById("name");
    const URL = document.getElementById("url");
    if (localStorage.getItem("Edited") == "true") {
      const token = localStorage.getItem("token");
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDTAr60Md60DA5Loqu7YAgbAbYNOMvo-7w",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
          }),
          headers: { "content-type": "application/json" },
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          if (Name && URL && data) {
            Name.value = data.users[0].displayName;
            URL.value = data.users[0].photoUrl;
          }
        });
    }
  };
  useEffect(() => {
    handleContentLoaded();
  }, []);
  return (
    <Ctx.Provider value={[expense, setExpense]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/welcomepage" element={<WelcomeScreen />} />
          <Route path="/profile" element={<Updateprofile />} />
          <Route path="/verifyEmail" element={<VerifyEmail />} />
          <Route path="/Forgotpassword" element={<ForgotPasswordWindow />} />
        </Routes>
      </BrowserRouter>
    </Ctx.Provider>
  );
}

export default App;
