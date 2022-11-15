import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { Auth0Provider } from "@auth0/auth0-react";
import 'virtual:windi.css'




const domain = import.meta.env.VITE_APP_AUTH0_DOMAIN;
const cliendId = import.meta.env.VITE_APP_AUTH0_CLIENT_ID;


// import dotenv from "dotenv";

// dotenv.config();
axios.defaults.baseURL = import.meta.env.VITE_API ||"http://localhost:3001";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Auth0Provider domain={domain} clientId={cliendId} redirectUri={window.location.origin}>
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </Provider>
);
