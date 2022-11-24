import Register from "./components/Register/Register.jsx";
import Home from "./components/Home/Home.jsx";
import Form from "./components/Form/Form.jsx";
import { Route, BrowserRouter } from "react-router-dom";
import Detail from "./components/Detail/Detail.jsx";
import Courses from "./components/Courses/Courses.jsx";
import Nav from "./components/nav/Nav";
import userDetail from "./components/userDetail/userDetail.jsx";
import Footer from "./components/footer/Footer";
import PruebaStripe from "./components/Stripe/PruebaStripe.jsx";
import ContactUs from "./components/ContactUs/ContactUs.jsx"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./fireBase/credenciales";
import { useDispatch, useSelector } from "react-redux"
import { logIn, logOut } from "./redux/actions"
import { useEffect } from "react"
import UploadVideo from "./components/UploadVideo/UploadVideo.jsx";
import PagoExitoso from "./components/Pagos/PagoExitoso.jsx";
import PagoDenegado from "./components/Pagos/PagoDenegado.jsx";
import { Shop } from "./components/Shop/Shop.jsx";
import About from "./components/About/About"
import CursosComprados from "./components/CursosComprados/CursosComprados.jsx";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {

      // console.log(user)
      if (user?.uid) {
        const token = user.accessToken;
        dispatch(logIn(token))
        window.localStorage.setItem("tokken", token)
      }
      else {
        window.localStorage.setItem("tokken", null)
        dispatch(logOut())
      }
    })
  }, [dispatch])



  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        {/* <hr />
        <ShoppingCart />
        <hr /> */}
        <Route exact path="/" component={Home} />
        <Route exact path="/allcourses" component={Courses} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/contact" component={ContactUs} />
        <Route exact path="/about" component={About} />
        <Route exact path="/form" component={Form} />
        <Route exact path="/course/:id" component={Detail} />
        <Route exact path="/formpage" component={PruebaStripe} />
        <Route exact path="/uploadvideo" component={UploadVideo} />
        <Route exact path="/formpage/success" component={PagoExitoso} />
        <Route exact path="/formpage/failed" component={PagoDenegado} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/mycourses" component={CursosComprados} />
        <Route exact path={`/${user.name}`} component={userDetail} />


        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
