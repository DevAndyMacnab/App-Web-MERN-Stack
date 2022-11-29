import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./PostStyle.css"

const Viewposts = ({ history }) => {
  const [registeracademic, setRegisteracademic] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate =useNavigate();
  useEffect(() => {
    
  },);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(
        "/api/post/posts"
      );
      console.log(data)

      
      setPassword(JSON.stringify(data))

    } catch (error) {
      setError(error.response.data.error);
      
    }
  };

  return (
    <div className="other">
      <form onSubmit={loginHandler} className="login-">
        <h3 className="login-">Ventana Principal - Vista de todas las publicaciones</h3>
        {error && <span className="error-">{error}</span>}
        <div className="form-group">
          <label className="prueba" htmlFor="registeracademic">{password}</label>
          
          
        </div>
        
        <button type="submit" className="btn btn-primary">
          Actualizar Informacion
        </button>

        
      </form>
    </div>
  );
};

export default Viewposts;