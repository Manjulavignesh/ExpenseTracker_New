import PrintExpense from "./PrintExpense";

const AddExpense = (props) => {
  return (
    <div>
      {props.expense.map((item) => (
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
