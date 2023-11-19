import { useRef, useState } from "react";
import { Card } from "react-bootstrap";

const Login = () => {
  const [newUser, setNewUser] = useState(true);
  const emailInput = useRef();
  const passwordInput = useRef();
  const confirmPassword=useRef();
  const LoginHandler = () => {
    setNewUser(false);
  };
  const signUpHandler = () => {
    setNewUser(true);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const Email = emailInput.current.value;
    const Password = passwordInput.current.value;
    const confirmPass=confirmPassword.current.value;
    if (newUser) {
      if(Email.includes("@")!=true || Password.length<4 || confirmPass<4)
    {
      let message1="1.Email must includes-@ symbol";
      let message2="2.password & confirm password must contain 4 charcters";

      alert(`Please Enter Valid User Details \n ${message1}\n ${message2}`);
    }
    else{
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDTAr60Md60DA5Loqu7YAgbAbYNOMvo-7w",
        {
          method: "POST",
          body: JSON.stringify({
            email: Email,
            password: Password,
            returnSecureToken: true,
          }),
          headers: { "content-type": "application/json" },
        }
      )
        .then((res) => {
          if (res.ok) {
            console.log("User has successfully signed up")
          }
          else
          {
          throw new Error("Authentication Failed")
          }
        })
        .catch((err) => {
          alert(err);
        });
      }}
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
          {!newUser && <h2 style={{ fontSize: 35 }}> LogIn </h2>}
          {newUser && <h2 style={{ fontSize: 35 }}> SignUp</h2>}
        </Card.Title>
        <Card.Body>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              ref={emailInput}
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
            <input
              type="Password"
              placeholder="Password"
              ref={passwordInput}
              style={{
                width: "75%",
                height: 25,
                padding: "6px 20px",
                border: "2px solid #dedede",
                borderRadius: "10px",
                marginLeft: 25,
                marginTop: 25,
              }}
            />
            {newUser && (
              <input
                type="Password"
                ref={confirmPassword}
                placeholder="Confirm Password"
                style={{
                  width: "75%",
                  height: 25,
                  padding: "6px 20px",
                  border: "2px solid #dedede",
                  borderRadius: "10px",
                  marginLeft: 25,
                  marginTop: 25,
                }}
              />
            )}
            {!newUser && (
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
              >
                LogIn
              </button>
            )}
            {newUser  && (
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
              >
                SignUp
              </button>
            )}
            {!newUser && (
              <div style={{ marginTop: 30 }}>
                <button
                  onClick={signUpHandler}
                  style={{
                    width: "95%",
                    marginTop: 65,
                    padding: "12px 20px",
                    marginLeft: 10,
                    borderRadius: "4px",
                    background: "#83f28f",
                    border: "black",
                    color: "black",
                    fontSize: 17,
                  }}
                >
                  NewUser ? CreateAccount
                </button>
              </div>
            )}
            {newUser && (
              <div style={{ marginTop: 30 }}>
                <button
                  onClick={LoginHandler}
                  style={{
                    width: "95%",
                    marginTop: 0,
                    padding: "12px 20px",
                    marginLeft: 10,
                    borderRadius: "4px",
                    background: "#83f28f",
                    border: "black",
                    color: "black",
                    fontSize: 17,
                  }}
                >
                  Have an account ? Login
                </button>
              </div>
            )}
          </form>
        </Card.Body>
      </Card>
    </div>
  );
};
export default Login;