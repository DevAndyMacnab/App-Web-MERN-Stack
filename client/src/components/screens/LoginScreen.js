import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./LoginScreen.css";

const LoginScreen = ({ history }) => {
  const [registeracademic, setRegisteracademic] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate =useNavigate();
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      
      history.push("/");
      
    }
  },);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { registeracademic, password },
        config
      );

      localStorage.setItem("authToken", data.token);
      
      


      
      if(localStorage.setItem){
        
        navigate("/post")
        
        
      }
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="login-screen">
      <form onSubmit={loginHandler} className="login-screen__form">
        <h3 className="login-screen__title">Login</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="registeracademic">Register Academic:</label>
          <input
            type="registeracademic"
            required
            id="registeracademic"
            placeholder="Register academic number"
            onChange={(e) => setRegisteracademic(e.target.value)}
            value={registeracademic}
            tabIndex={1}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password:{" "}
            <Link to="/forgotpassword" className="login-screen__forgotpassword">
              Forgot Password?
            </Link>
          </label>
          <input
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            tabIndex={2}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>

        <span className="login-screen__subtext">
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default LoginScreen;
