import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducer";
import thunk from "redux-thunk";

const store = createStore(
  rootReducer,
  compose(
    //* Se encarga de tomar varios parámetros y no tire error
    applyMiddleware(thunk), //? Es importante primero el applyMidd (encargado de hacer peticiones async)
    window.REDUX_DEVTOOLS_EXTENSION
      ? window.REDUX_DEVTOOLS_EXTENSION()
      : (f) => f
  )
);

export default store;
