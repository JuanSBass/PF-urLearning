import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import rootReducer from "./reducer";

const reducers = combineReducers({
  reducer: rootReducer,
  shopping: cartReducer,
});

export default reducers;
