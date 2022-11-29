import { useState } from "react";
import axios from "axios";
import { Link , useParams} from "react-router-dom";
import "./CreatepostStyle.css";


const Comments = ({ history }) => {
  const [id, setId] = useState("")
  const [comments, setComments] = useState("");
  const {ide}=useParams();
  const [error, setError] = useState("");

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    
    try {
      const { data } = await axios.put(
        `/api/post/posts/${ide}`,
        {
          comments
        },
        config
      );
      console.log(comments)
      localStorage.setItem("authToken", data);
      
      if (localStorage.setItem){
        
        setError("COMENTARIO PUBLICADO")

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
          <label htmlFor="name">Agregue el comentario</label>
          <input
            type="text"
            required
            id="comments"
            placeholder="comentario"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />

          
        </div>


        <button type="submit" className="btn btn-primary">
          Comentar
        </button>

        
      </form>
    </div>
  );
};

export default Comments;