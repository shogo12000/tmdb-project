import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

function SingleCard({ e, index }) {
  const imageBaseURL = "https://image.tmdb.org/t/p/w400";
  const [title, setTitle] = useState(e.title);
  const navigate = useNavigate();
  const [watchedState, setWatchedState] = useState(false);
  const [watchLaterState, setWatchLaterState] = useState(false);
  const [watchingState, setWatchingState] = useState(false);
  const { watched, watching, watchLater } = useContext(AuthContext);

  const checkTitle = (e) => {
    var newTitle = e;
    if (e.length > 15) {
      newTitle = newTitle.substring(0, 15) + "...";
    }
    return newTitle;
  };

  useEffect(() => {
    const newTitle = checkTitle(e.title);
    setTitle(newTitle);
 
 
    const check = watched.find(num =>  num.id === e.id.toString());
    if(check){
      setWatchedState(true);
    }

    const checkWatching = watching.find(num =>  num.id === e.id.toString());
    if(checkWatching){
      setWatchingState(true);
    }

    const checkWatchLater = watchLater.find(num =>  num.id === e.id.toString());
    if(checkWatchLater){
      setWatchLaterState(true);
    }


  }, []);


  const treatCheckBox = (e,obj, watch)=>{
     const checked = e.target.checked;  
 
    switch (watch) {
      case "watched": {
        setWatchedState(checked);
        console.log(obj)
        if(checked){

        }
        break; // Importante para evitar que outros casos sejam executados
      }
      case "watchLater": {
        setWatchLaterState(checked); 
        // Lógica para quando a variável 'watch' for igual a "watchLater"
        console.log("Adicionado à lista para assistir depois");
        break;
      }
      case "watching": {
        setWatchingState(checked);
        // Lógica para quando a variável 'watch' for igual a "watchLater"
        console.log("Adicionado à lista assistindo");
        break;
      }
      default: {
        // Caso nenhum dos casos seja correspondente
        console.log("Estado desconhecido");
      }
    }
  }

  return (
    <div>
      <div
        key={index}
        onClick={() => navigate("../allDetails", { state: { movie: e } })}
      >
        <img
          src={`${imageBaseURL}${e.poster_path}`}
          alt={e.title}
          className="responsive-image"
        />
        {title}
      </div>
      <ul>
        <li>
          <input type="checkbox"   onChange={(r)=>treatCheckBox(r, e, "watched")} checked={watchedState}/> Watched
        </li>
        <li>
          <input type="checkbox"   onChange={(r)=>treatCheckBox(r, e.id, "watchLater")} checked={watchLaterState}/> Watch Later
        </li>
        <li>
          <input type="checkbox"   onChange={(r)=>treatCheckBox(r, e.id, "watching")} checked={watchingState}/> Watching
        </li>
      </ul>
    </div>
  );
}

export default SingleCard;
