import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./CreatepostStyle.css";


const Createposts = ({ history }) => {
  const [username, setUsername] = useState("")
  const [tipo, setTipo] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const[comments,setComments]=useState("")
  const [error, setError] = useState("");

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    
    try {
      const { data } = await axios.post(
        "/api/post/posts",
        {
          username,
          tipo,
          message,
          comments,
          date,
        },
        config
      );

      localStorage.setItem("authToken", data);
      
      if (localStorage.setItem){
        
        setError("PUBLICACION CREADA")

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
        <h3 className="register-screen__title">Crear una Publicacion</h3>
        {error && <span className="error-message">{error}</span>}

        <div className="form-group">
          <label htmlFor="email">Usuario</label>
          <input
            
            id="usuario"
            placeholder="usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        

        <div className="form-group">
          <label htmlFor="name">Tipo Publicacion:</label>
          <input
            type="text"
            required
            id="tipo"
            placeholder="Ingrese el tipo de publicacion"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          />

          
        </div>


        <div className="form-group">
          <label htmlFor="email">Mensaje de la publicacion:</label>
          <input className="message"
            
            id="message"
            placeholder="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>



        


        <button type="submit" className="btn btn-primary">
          Crear
        </button>

        
      </form>
    </div>
  );
};

export default Createposts;
