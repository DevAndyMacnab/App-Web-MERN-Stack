import { useState } from "react";
import axios from "axios";
import "./ForgotPasswordScree.css";
import { useNavigate } from "react-router-dom";
const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [registeracademic,setRegisteracademic]=useState("");
  const navigate= useNavigate();

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/forgotpassword",
        { registeracademic,email },
        config
      );
      

      setSuccess(data.data);
      navigate(`/resetpassword/${data.resetToken}`)



    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="forgotpassword-screen">
      <form
        onSubmit={forgotPasswordHandler}
        className="forgotpassword-screen__form"
      >
        <h3 className="forgotpassword-screen__title">Forgot Password</h3>
        {error && <span className="error-message">{error}</span>}
        {success && <span className="success-message">{success}</span>}
        <div className="form-group">
          <p className="forgotpassword-screen__subtext">
            Please enter the email address you register your account with.
          </p>

          <label htmlFor="registeracademic">Register Academic:</label>
          <input
            type="registeracademic"
            required
            id="email"
            placeholder="Register Academic number"
            value={registeracademic}
            onChange={(e) => setRegisteracademic(e.target.value)}
          />


          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          


          
        </div>
        <button type="submit" className="btn btn-primary">
          Send Email
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordScreen;