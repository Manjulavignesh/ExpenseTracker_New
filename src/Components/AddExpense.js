import { useContext } from "react";
import PrintExpense from "./PrintExpense.js";
import { Ctx } from "../App.js";

const AddExpense = (props) => {
    const [expense]=useContext(Ctx);
  return (
    <div>
      {expense && props.expense.map((item) => (
        <PrintExpense
          amt={item.amt}
          reason={item.reason}
          catagoryobj={item.catagoryobj}
        />
      ))}
    </div>
  );
};
export default AddExpense;
