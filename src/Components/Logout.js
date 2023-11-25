const Logout = () => {
    const logoutHandler=()=>{
       localStorage.removeItem("token");
      window.location.href="http://localhost:3000/"  
    }
  return (
    <button
      style={{
        float: "right",
        marginTop: 5,
        marginRight: 15,
        width: 100,
        height: 35,borderRadius:"4px",
        background:"blue",color:"white",
        border:"blue",
        fontWeight:1050,
        fontSize:16
      }}
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
};
export default Logout;
