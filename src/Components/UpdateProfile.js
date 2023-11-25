import { useRef } from "react";
import { Card } from "react-bootstrap";
import { AiFillGithub } from "react-icons/ai";
import { AiOutlineGlobal } from "react-icons/ai";
const Updateprofile = () => {
  const name = useRef();
  const url = useRef();
  const updateHandler = (e) => {
    e.preventDefault();
    const enteredName=name.current.value;
    const enteredUrl=url.current.value;
    const token=localStorage.getItem("token");
    if(localStorage.getItem("Edited")==null){
    fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDTAr60Md60DA5Loqu7YAgbAbYNOMvo-7w",
        {
          method: "POST",
          body: JSON.stringify({
            idToken:token,
            displayName: enteredName,
            photoUrl: enteredUrl,
            returnSecureToken: true,
          }),
          headers: { "content-type": "application/json" },
        }
      )
        .then((res) => {
          if (res.ok) {
            localStorage.setItem("Edited",true);
           console.log("details updated sucessfully")
          } else {
            return res.json().then((data) => {
              let errorMessage = "oops!!! Data not getting updated,plz try again later";
              throw new Error(errorMessage);
            });
          }
        })
        .catch((err) => {
          alert(err.message);
        });}
        
  };
  return (
    <div>
      <div>
        <h4 style={{ fontStyle: "italic" }}>
          Winners never quite,Quiters never win.
          <Card
            style={{
              float: "right",
              width: 400,
              borderRadius: "7px",
              display: "inline",
              background: "#efd1c6",
            }}
          >
            your profile is 64% completed.A complete Profile has higher chances
            of landing a job.
            <a href="" style={{ color: "blue" }}>
              Complete now
            </a>
          </Card>
        </h4>
        <hr style={{ marginTop: 30 }} />
      </div>
      <h2 style={{ marginLeft: 400 }}>
        Contact Details{" "}
        <button
          style={{
            marginLeft: 750,
            width: "7%",
            padding: "6px 10px",
            color: "red",
            background: "white",
            border: "2px solid red",
            borderRadius: "4px",
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          Cancel
        </button>
      </h2>
      <Card
        style={{
          background: "#f5f5f5",
          width: 1050,
          marginLeft: 350,
          height: 150,
        }}
      >
        <form style={{ display: "inline" }} onSubmit={updateHandler}>
          <AiFillGithub
            style={{
              marginTop: 25,
              marginLeft: 25,
              width: 40,
              height: 50,
              display: "inline-block",
              verticalAlign: "middle",
            }}
          />
          <label
            style={{
              display: "inline-block",
              verticalAlign: "middle",
              marginTop: 25,
              marginLeft: 10,
            }}
          >
            Full Name:
          </label>
          <input
          id="name"
            style={{
              display: "inline-block",
              verticalAlign: "middle",
              marginTop: 25,
              marginLeft: 25,
              height: 20,
              borderRadius: "4PX",
              width: 250,
            }}
            type="text"
            ref={name}
          />
          <AiOutlineGlobal
            style={{
              marginTop: 25,
              marginLeft: 90,
              width: 40,
              height: 50,
              display: "inline-block",
              verticalAlign: "middle",
            }}
          />
          <label
            style={{
              display: "inline-block",
              verticalAlign: "middle",
              marginTop: 25,
              marginLeft: 10,
            }}
          >
            Profile Photo URL
          </label>
          <input
          id="url"
            style={{
              display: "inline-block",
              verticalAlign: "middle",
              marginTop: 25,
              marginLeft: 25,
              height: 20,
              borderRadius: "4PX",
              width: 250,
            }}
            type="text"
            ref={url}
          />
          <button
            style={{
              marginLeft: 14,
              marginTop: 30,
              width: 75,
              height: 30,
              borderRadius: "4px",
              background: "brown",
              border: "brown",
              color: "white",
              fontWeight: 700,
            }}
          >
            Update
          </button>
        </form>
      </Card>
    </div>
  );
};
export default Updateprofile;
