import Login from "./Components/Login";
import {  Route, Routes } from "react-router-dom";
import WelcomeScreen from "./Components/WelcomeScreen";
import { BrowserRouter } from "react-router-dom";
import Updateprofile from "./Components/UpdateProfile";
import { useEffect } from "react";
import VerifyEmail from "./Components/VerifyEmail";
function App() {
  const handleContentLoaded= () => {
    const Name=document.getElementById("name");
    const URL=document.getElementById("url");
    if(localStorage.getItem("Edited")=="true"){
      const token=localStorage.getItem("token");
      fetch(
           "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDTAr60Md60DA5Loqu7YAgbAbYNOMvo-7w", {
               method: "POST",
               body: JSON.stringify({
                 idToken:token,
               }),
               headers: { "content-type": "application/json" },
             }
         ).then((res) => {
             if (res.ok) {
               return res.json();
             } else {
               return res.json().then((data) => {
                 let errorMessage = "Data not retrived";
                 throw new Error(errorMessage);
               });
             }
           })
           .then((data) => {
            if(Name && URL){
           Name.value=data.users[0].displayName;
           URL.value=data.users[0].photoUrl;
            }  
           })
           .catch((err) => {
             alert(err.message);
           })
   
  }
}
useEffect(()=>{
  handleContentLoaded();},[]
 )
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/welcomepage" element={<WelcomeScreen/>}/>
        <Route path="/profile" element={<Updateprofile/>}/>
        <Route path="/verifyEmail" element={<VerifyEmail/>}/>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
