import { Card } from "react-bootstrap";
const WelcomeScreen=()=>{
    return (<div>
        <h3 style={{ fontStyle: "italic" }}>
          Welcome to Expense Tracker!!!
          <Card
            style={{
              float: "right",
              width: 400,
              borderRadius: "7px",
              display: "inline",
              background: "#efd1c6",
            }}
          >
             your profile is incomplete.
            <a href="http://localhost:3000/profile" style={{ color: "blue" }}>
              Complete now
            </a>
          </Card>
        </h3>
        <hr style={{ marginTop: 20 }} />
      </div>)

}
export default WelcomeScreen;