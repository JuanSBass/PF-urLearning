import Register from "./components/Register/Register.jsx";
import Home from "./components/Home/Home.jsx";
import Form from "./components/Form/Form.jsx";
import { Route, BrowserRouter } from "react-router-dom";
import Detail from "./components/Detail/Detail.jsx";
import Courses from "./components/Courses/Courses.jsx";
import Nav from "./components/nav/Nav";
import Footer from "./components/footer/Footer";
import PruebaStripe from "./components/Stripe/PruebaStripe.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Route exact path="/" component={Home} />
        <Route exact path="/allcourses" component={Courses} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/form" component={Form} />
        <Route exact path="/course/:id" component={Detail} />
        <Route exact path="/formpage" component={PruebaStripe} />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
