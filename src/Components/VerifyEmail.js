import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authAction } from "../store";

const VerifyEmail = () => {
  const token=useSelector((state)=>state.auth.token);
  const id=useSelector((state)=>state.auth.userId);
  const navigate=useNavigate();
  const dispatch=useDispatch();
    document.body.style.background = "#271f1f";
    const verifyHandler=()=>{
const token=localStorage.getItem("token");
        fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDTAr60Md60DA5Loqu7YAgbAbYNOMvo-7w", {
                method: "POST",
                body: JSON.stringify({
                requestType:"VERIFY_EMAIL",
                  idToken:token,
                }),
                headers: { "content-type": "application/json" },
              }
          ).then((res) => {
              if (res.ok) {
                dispatch(authAction.login());
                navigate("/welcomepage")
            return res.json();
              } else {
                return res.json().then((data) => {
                  let errorMessage = "Sorry! Email verfication failed";
                  throw new Error(errorMessage);
                });
              }
            })
            .catch((err) => {
              alert(err.message);
            })
    
    }
  return (
    <button
      style={{
        background: "green",
        marginLeft: 500,
        marginTop: 250,
        width: "40%",
        height: 50,
        borderRadius: "7px",
        fontSize: 18,
        color: "white",
      }}
      onClick={verifyHandler}
    >
      Verify Your Email Before Proceed
    </button>
  );
};
export default VerifyEmail;
