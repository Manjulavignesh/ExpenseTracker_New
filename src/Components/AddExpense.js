import { useContext } from "react";
import PrintExpense from "./PrintExpense";
import { Ctx } from "../App";

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
