import { Card } from "react-bootstrap";
import Logout from "./Logout";
import { useContext, useRef, useState } from "react";
import AddExpense from "./AddExpense";
import axios from "axios";
import { Ctx } from "../App"; 
const WelcomeScreen = () => {
  const [expense,setExpense]=useContext(Ctx);
  const money = useRef();
  const description = useRef();
  const Catagory = useRef();
  const expenseHandler = (e) => {
    e.preventDefault();
    const moneyRef = money.current.value;
    const desRef = description.current.value;
    const catagoryRef = Catagory.current.value;
    const obj = { amt: moneyRef, reason: desRef, catagoryobj: catagoryRef };
    axios
      .post(
        "https://expensetracker-authentic-6234a-default-rtdb.firebaseio.com/expense.json",
        obj
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setExpense([...expense, obj]);
    money.current.value="";
    description.current.value="";
    Catagory.current.value="";
  };
  return (
    <div>
      <Logout />
      <div>
        <h3 style={{ fontStyle: "italic" }}>
          Welcome to Expense Tracker!!!
          <Card
            style={{
              float: "right",
              width: 400,
              borderRadius: "7px",
              display: "inline",
              background: "#efd1c6",
              marginTop: 10,
              marginRight: 20,
            }}
          >
            your profile is incomplete.
            <a href="http://localhost:3000/profile" style={{ color: "blue" }}>
              Complete now
            </a>
          </Card>
        </h3>
        <hr style={{ marginTop: 20 }} />
      </div>
      <Card
        style={{
          background: "#0000b3",
          width: 650,
          height: 180,
          marginLeft: 450,
          borderRadius: "4px",
        }}
      >
        <form onSubmit={expenseHandler}>
          <input
            type="number"
            placeholder="Enter Money Spent"
            style={{
              marginLeft: 25,
              marginTop: 50,
              height: 25,
              borderRadius: "4px",
              borderColor: "white",
            }}
            ref={money}
            id="Amt"
          />
          <input
            type="text"
            placeholder="Description of Expense"
            style={{
              marginLeft: 25,
              marginTop: 50,
              height: 25,
              borderRadius: "4px",
              borderColor: "white",
            }}
            ref={description}
            id="Des"
          />
          <select
            style={{
              marginLeft: 25,
              marginTop: 50,
              height: 30,
              width: 150,
              borderRadius: "4px",
              borderColor: "white",
            }}
            ref={Catagory}
            id="Cat"
          >
            <option value="">
              Select Catagory
            </option>
            <option>Food</option>
            <option>Petrol</option>
            <option>Salary</option>
          </select>
          <button
            style={{
              float: "right",
              marginRight: 25,
              marginTop: 40,
              height: 30,
              width: 150,
              borderRadius: "4px",
              borderColor: "white",
              fontWeight: 700,
              fontSize: 15,
            }}
          >
            Add Expense
          </button>
        </form>
      </Card>
      <Card
        style={{
          background: "#0000b3",
          width: 650,
          marginLeft: 450,
          borderRadius: "4px",
          borderColor: "white",
          marginTop: 10,
        }}
      >
      <AddExpense expense={expense} />
      </Card>
    </div>
  );
};
export default WelcomeScreen;
