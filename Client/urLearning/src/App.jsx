import Register from "./components/Register/Register.jsx";
import Home from "./components/Home/Home.jsx";
import Form from "./components/Form/Form.jsx";
import { Route, BrowserRouter } from "react-router-dom";
import Detail from "./components/Detail/Detail.jsx";
import Courses from "./components/Courses/Courses.jsx";
import Nav from "./components/nav/Nav";
import userDetail from "./components/userDetail/userDetail.jsx";
import Footer from "./components/footer/Footer";
import ContactUs from "./components/Contact Us/ContactUs.jsx"

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {

      console.log(user)
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
        <Route exact path="/" component={Home} />
        <Route exact path="/allcourses" component={Courses} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/contact" component={ContactUs} />
        <Route exact path="/about" component={About} />
        <Route exact path="/form" component={Form} />
        <Route exact path="/course/:id" component={Detail} />
        <Route exact path={`/${user.name}`} component={userDetail} />

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
