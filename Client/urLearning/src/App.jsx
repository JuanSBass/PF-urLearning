import Register from "./components/Landing/Register.jsx";
import Home from "./components/Home/Home.jsx";
import Form from "./components/Form/Form.jsx";
import { Route, BrowserRouter } from "react-router-dom";
import Detail from "./components/Detail/Detail.jsx";
import Nav from "./Components/nav/Nav";
import Footer from "./Components/footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Home} />
        <Route exact path="/form" component={Form} />
        <Route exact path="/course:id" component={Detail} />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
