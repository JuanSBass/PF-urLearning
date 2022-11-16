import Register from "./components/Register/Register.jsx";
import Home from "./components/Home/Home.jsx";
import Form from "./components/Form/Form.jsx";
import { Route, BrowserRouter } from "react-router-dom";
import Detail from "./components/Detail/Detail.jsx";
import Courses from "./components/Courses/Courses.jsx";
import Nav from "./components/nav/Nav";
import Footer from "./components/footer/Footer";
import ContactUs from "./components/Contact Us/ContactUs.jsx"
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./fireBase/credenciales";
import {useDispatch} from "react-redux"
import {logIn,logOut} from "./redux/actions"
import {useEffect} from "react"

function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      console.log(user)
      if(user.uid){dispatch(logIn(
        user.uid,
        user.email,
        user.displayName,
        user.photoURL))}
      else{dispatch(logOut())}
    })
  },[dispatch])

  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Route exact path="/" component={Home} />
        <Route exact path="/allcourses" component={Courses} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/contact" component={ContactUs} />
        <Route exact path="/form" component={Form} />
        <Route exact path="/course/:id" component={Detail} />

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
