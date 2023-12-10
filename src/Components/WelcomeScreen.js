import { Card } from "react-bootstrap";
import Logout from "./Logout.js";
import { useContext, useRef } from "react";
import AddExpense from "./AddExpense.js";
import { Ctx } from "../App.js";
import { useDispatch, useSelector } from "react-redux";
import { expenseAction, themeAction } from "../store/index.js";
import ReactSwitch from "react-switch";
import exportFromJSON from "export-from-json";
import axios from "axios";
const WelcomeScreen = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expense.expense);
  const total = useSelector((state) => state.expense.total);
  const premium = useSelector((state) => state.themes.isPremium);
  const color = useSelector((state) => state.themes.color);
  console.log(expenses, total);
  const [expense, setExpense] = useContext(Ctx);
  const money = useRef();
  const description = useRef();
  const Catagory = useRef();
  const expenseHandler = (e) => {
    e.preventDefault();
    const moneyRef = money.current.value;
    const desRef = description.current.value;
    const catagoryRef = Catagory.current.value;
    const obj = { amt: moneyRef, reason: desRef, catagoryobj: catagoryRef };
    dispatch(expenseAction.addExpense(obj));
    dispatch(expenseAction.expenseTotal(moneyRef));
    axios
      .post(
        "https://expensetracker-authentic-6234a-default-rtdb.firebaseio.com/expense.json",
        obj
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setExpense([...expense, obj]);
    money.current.value = "";
    description.current.value = "";
    Catagory.current.value = "";
  };
  const premiumHandler = () => {
    dispatch(themeAction.premiumChange());
    localStorage.setItem("premium", true);
  };
  const changeHandler = () => {
    if (color == "#3d8ae8") {
      dispatch(themeAction.themeChange("white"));
      localStorage.setItem("theme", "light");
    } else {
      dispatch(themeAction.themeChange("#3d8ae8"));
      localStorage.setItem("theme", "dark");
    }
  };
  const downloadHandler = () => {
    const data = expenses;
    const fileName = "expenses./detail";
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({ data, fileName, exportType });
  };
  return (
    <div>
      {premium  &&(
        <div style={{ float: "right", marginTop: 7 }}>
          <ReactSwitch onChange={changeHandler} checked={color == "#3d8ae8"} />
        </div>
      )}
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
              <option value="">Select Catagory</option>
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
          {total > 10000 && !premium && (
            <button
              style={{
                float: "right",
                marginTop: 25,
                width: 180,
                height: 40,
                borderRadius: "15px",
                borderColor: "white",
                background: "violet",
                fontWeight: 750,
                fontSize: 18,
              }}
              onClick={premiumHandler}
            >
              Activate Premium
            </button>
          )}
          {premium  && (
            <button
              style={{
                float: "right",
                marginTop: 25,
                width: 350,
                height: 40,
                borderRadius: "15px",
                borderColor: "white",
                background: "violet",
                fontWeight: 750,
                fontSize: 18,
              }}
              onClick={downloadHandler}
            >
              Download Expense Statement
            </button>
          )}
        </Card>
      </div>
    </div>
  );
};
export default WelcomeScreen;
