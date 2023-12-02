import axios from "axios";
import { useContext } from "react";
import { Ctx } from "../App";
import { useSelector } from "react-redux";
const PrintExpense = (props) => {
  const total=useSelector((state)=>state.expense.total)
  console.log(total);
    const [expense,setExpense]=useContext(Ctx);
    const editHandler=()=>{
        const Amt=document.getElementById("Amt");
        const Des=document.getElementById("Des");
        const Catagory=document.getElementById("Cat");
        let id;
        axios
          .get(
            "https://expensetracker-authentic-6234a-default-rtdb.firebaseio.com/expense.json"
          )
          .then((res) => {
            for (const [key, value] of Object.entries(res.data)) {
              if (value.reason == props.reason) 
              {
              id = key;
              }
            }
            return id;
          })
          .then((res) =>
            axios.delete(
              `https://expensetracker-authentic-6234a-default-rtdb.firebaseio.com/expense/${res}.json`
            ))
            if(Amt)Amt.value=props.amt;
            if(Des)Des.value=props.reason;
            if(Catagory)Catagory.value=props.catagoryobj;
            setExpense(()=>expense.filter((prop)=>prop.reason!=props.reason))

    }
  const removeHandler = () => {
    let id;
    axios
      .get(
        "https://expensetracker-authentic-6234a-default-rtdb.firebaseio.com/expense.json"
      )
      .then((res) => {
        for (const [key, value] of Object.entries(res.data)) {
          if (value.reason == props.reason) 
          {
          id = key;
          }
        }
        return id;
      })
      .then((res) =>
        axios.delete(
          `https://expensetracker-authentic-6234a-default-rtdb.firebaseio.com/expense/${res}.json`
        ))
     setExpense(()=>expense.filter((prop)=>prop.reason!=props.reason))
  };
  return (<div>{props.amt!=undefined && 
    <div style={{ color: "white" }}>
      <h2 style={{ marginLeft: 10, padding: "10px" }}>
        {`Rs${props.amt}`}{" "}
        {props.reason.charAt(0).toUpperCase() + props.reason.slice(1)}{" "}
        {props.catagoryobj}
        <button
          style={{
            float: "right",
            marginLeft: 25,
            width: 85,
            height: 30,
            borderRadius: "15px",
            borderColor: "white",
            background: "white",
            fontWeight: 750,
            fontSize: 15,
            marginTop:5
          }}
          onClick={removeHandler}
        >
          Remove
        </button>
        <button
          style={{
            float: "right",
            width: 75,
            height: 30,
            borderRadius: "15px",
            borderColor: "white",
            background: "white",
            fontWeight: 750,
            fontSize: 15,
            marginTop:5
          }}
          onClick={editHandler}
        >
          Edit
        </button>
       {total>10000 && <button
          style={{
            marginLeft:150,
            marginTop:0,
            width: 150,
            height: 30,
            borderRadius: "15px",
            borderColor: "white",
            background: "white",
            fontWeight: 750,
            fontSize: 15,
          }}
          onClick={editHandler}
        >
          Activate Premium
        </button>}
      </h2>
    </div>}
    </div>
  );
};
export default PrintExpense;
