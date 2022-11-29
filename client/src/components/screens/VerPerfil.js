import { useState } from "react";
import axios from "axios";
import { Link , useParams} from "react-router-dom";
import "./CreatepostStyle.css";


const Viewprofile = ({ history }) => {
  const [id, setId] = useState("")
  const [username, setUsername] = useState("");
  const [lastname, setLastname] = useState("");
  const [register, setRegisteracademic] = useState("");
  const {registeracademic} = useParams();
  const [email, setEmail] = useState("");
  
  const [error, setError] = useState("");

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    
    try {
      const { data } = await axios.get(
        `/api/auth/verperfil/${registeracademic}`
      );
      setUsername(data.username)
      setLastname(data.lastname)
      setRegisteracademic(data.registeracademic)
      setEmail(data.email)
      localStorage.setItem("authToken", data);
      
      if (localStorage.setItem){
    
      }
      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="register-screen">
      <form onSubmit={registerHandler} className="register-screen__form">
        <h3 className="register-screen__title">USERNAME: {username}</h3>
        {error && <span className="error-message">{error}</span>}
     

        <div className="form-group">
          <label htmlFor="name">LASTNAME: {lastname}</label><br></br>
          <label htmlFor="name">CARNET ACADEMICO: {register}</label><br></br>
          <label htmlFor="name">EMAIL: {email}</label><br></br>
          
          

          
        </div>


        <button type="submit" className="btn btn-primary">
          Ver Perfil
        </button>

        
      </form>
    </div>
  );
};

export default Viewprofile;