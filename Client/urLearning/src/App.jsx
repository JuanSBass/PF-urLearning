import Landing from "./components/Landing/Landing.jsx";
import Home from "./components/Home/Home.jsx";
import Form from "./components/Form/Form.jsx";
import { Route, BrowserRouter } from "react-router-dom";
import Detail from "./components/Detail/Detail.jsx";


function App() {


  return (
    <BrowserRouter>
    <div className="App">
      <Route exact path="/" component={Landing}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/form" component={Form}/>
      <Route exact path="/course:id" component={Detail}/>

    </div>
    </BrowserRouter>
  )
}

export default App
