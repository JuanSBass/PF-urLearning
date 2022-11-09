import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";

const store = createStore(
  rootReducer,
  compose(  //* Se encarga de tomar varios parámetros y no tire error
    applyMiddleware(thunk), //? Es importante primero el applyMidd (encargado de hacer peticiones async)
    window.__REDUX_DEVTOOLS_EXTENSION__ ?
      window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);

export default store;
