import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

function SingleCard({ e, index, data }) {
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
    if (data != null) {
      setWatchLaterState(false);
      setWatchingState(false);
      setWatchedState(false);

      const newTitle = checkTitle(e.title);
      setTitle(newTitle);

      const check = data.watched.find((num) => num.id === e.id.toString());
      if (check) {
        setWatchedState(true);
      }

      const checkWatching = data.watching.find(
        (num) => num.id === e.id.toString()
      );

      if (checkWatching) {
        setWatchingState(true);
      }

      const checkWatchLater = data.watchLater.find(
        (num) => num.id === e.id.toString()
      );
      if (checkWatchLater) {
        setWatchLaterState(true);
      }
    }else{
      setWatchedState(false);
      setWatchLaterState(false);
      setWatchingState(false);
    }
  }, [data]);

  const treatCheckBox = (e, obj, watch) => {
    const checked = e.target.checked;

    switch (watch) {
      case "watched": {
        setWatchedState(checked);
        console.log(obj);
        if (checked) {
          console.log("Esta Checado");
        }
        break;
      }
      case "watchLater": {
        setWatchLaterState(checked);
        console.log(obj);
        console.log("Adicionado à lista para assistir depois");
        if (checked) {
          console.log("Esta Checado");
        }
        break;
      }
      case "watching": {
        setWatchingState(checked);
        console.log("Adicionado à lista assistindo");
        if (checked) {
          console.log("Esta Checado");
        }
        break;
      }
      default: {
        // Caso nenhum dos casos seja correspondente
        console.log("Estado desconhecido");
      }
    }
  };

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
          <input
            type="checkbox"
            onChange={(r) => treatCheckBox(r, e, "watched")}
            checked={watchedState}
          />{" "}
          Watched
        </li>
        <li>
          <input
            type="checkbox"
            onChange={(r) => treatCheckBox(r, e, "watchLater")}
            checked={watchLaterState}
          />{" "}
          Watch Later
        </li>
        <li>
          <input
            type="checkbox"
            onChange={(r) => treatCheckBox(r, e, "watching")}
            checked={watchingState}
          />{" "}
          Watching
        </li>
      </ul>
    </div>
  );
}

export default SingleCard;
