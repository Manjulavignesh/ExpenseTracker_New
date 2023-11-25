import { useRef, useState } from "react";
import { Card } from "react-bootstrap";
const ForgotPasswordWindow = () => {
  const [isLoading, setIsLoading] = useState(true);
  const forgotPassword = useRef();
  const loadHandler = () => {
    setIsLoading(false);
  };
  const forgotHandler = (e) => {
    e.preventDefault();
    const resetEmail = forgotPassword.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDTAr60Md60DA5Loqu7YAgbAbYNOMvo-7w",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: resetEmail,
        }),
        headers: { "content-type": "application/json" },
      }
    )
      .then((res) => {
        if (res.ok) {
            setIsLoading(true);
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage =
              "Unable to change password,plz try sometime later";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <div>
      <Card
        style={{
          background: "white",
          width: 350,
          height: 450,
          marginLeft: 600,
          marginTop: 150,
          borderRadius: "8px",
        }}
      >
        <Card.Title style={{ textAlign: "center", padding: 5 }}>
          <h3 style={{ fontSize: 35 }}> Forgot Password </h3>
          <h4>
            Enter your email and we'll send you a link to reset your password
          </h4>
        </Card.Title>
        <Card.Body>
          <form onSubmit={forgotHandler}>
            <input
              type="text"
              ref={forgotPassword}
              placeholder="Email"
              style={{
                width: "75%",
                height: 25,
                padding: "6px 20px",
                border: "2px solid #dedede",
                borderRadius: "10px",
                marginLeft: 25,
              }}
            />
            {!isLoading && <p>Loading.....</p>}
            <button
              style={{
                width: "75%",
                marginTop: 40,
                padding: "12px 20px",
                marginLeft: 45,
                borderRadius: "75px",
                background: "#0f66ef",
                border: "white",
                color: "white",
                fontSize: 17,
              }}
              onClick={loadHandler}
            >
              Submit
            </button>{" "}
            <a href="http://localhost:3000/" style={{ padding: "0px 115px" }}>
              Back to Login
            </a>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
};
export default ForgotPasswordWindow;
