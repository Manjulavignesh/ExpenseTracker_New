import { configureStore, createSlice } from "@reduxjs/toolkit";
const authInitialState = { isLoggedIn: false, token: "", userId: "" };
const authReducer = createSlice({
  name: "loggedin",
  initialState: authInitialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    tokenUpdate(state, action) {
      state.token = action.payload;
    },
    idUpdate(state, action) {
      state.userId = action.payload;
    },
  },
});
const expenseInitialState = { expense: [], total: 0 };
const expenseReducer = createSlice({
  name: "expense",
  initialState: expenseInitialState,
  reducers: {
    addExpense(state, action) {
      state.expense.push(action.payload);
    },
    expenseTotal(state, action) {
      state.total += Number(action.payload);
    },
    expenseTotalInitial(state,action){
        action.payload.forEach(element => {
            if(element.amt !=null & state.total !=null)
            {
            state.total=Number(state.total)+Number(element.amt)
            }
        });
    }
  },
});

const store = configureStore({
  reducer: { auth: authReducer.reducer, expense: expenseReducer.reducer },
});
export const authAction = authReducer.actions;
export const expenseAction=expenseReducer.actions;
export default store;
