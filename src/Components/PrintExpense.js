const PrintExpense = (props) => {
  return (
    <div style={{ color: "white" }}>
      <h2 style={{ marginLeft: 10, padding: "10px" }}>
        {`Rs${props.amt}`}{" "}
        {props.reason.charAt(0).toUpperCase() + props.reason.slice(1)}{" "}
        {props.catagoryobj}
      </h2>
    </div>
  );
};
export default PrintExpense;
