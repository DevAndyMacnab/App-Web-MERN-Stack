import {BrowserRouter , Routes,Route} from "react-router-dom"

//Screens
import PrivateScreen from "./components/screens/PrivateScreen"
import LoginScreen from "./components/screens/LoginScreen"
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen"
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen"
import RegisterScreen from "./components/screens/RegisterScreen"
import Createposts from "./components/screens/Createposts"
import Viewposts from "./components/screens/Post"
import Comments from "./components/screens/Comments"
import Viewprofile from "./components/screens/VerPerfil"

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          
          <Route exact path="/" element={<PrivateScreen/>} />
          <Route exact path="/register" element={<RegisterScreen/>} />
          <Route exact path="/login" element={<LoginScreen/>} />
          <Route exact path="/createpost"element={<Createposts/>}/>
          <Route exact path="/post" element={<Viewposts/>}/>
          <Route  path="/comentar/:ide" element={<Comments/>} exact />
          <Route path="/verperfil/:registeracademic" element={<Viewprofile/>} exact/>
          <Route
            exact
            path="/forgotpassword"
            element={<ForgotPasswordScreen/>}
          />
          <Route
             path="/resetpassword/:resetToken"
            element={<ResetPasswordScreen/>} exact/>
        </Routes>
        
        
        
      </div>
    </BrowserRouter>
  );
};

export default App;
