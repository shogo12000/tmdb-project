import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import allFetching from "./allFetching";

function SingleCard({ e, index, data, user, userToken }) {
  const imageBaseURL = "https://image.tmdb.org/t/p/w400";
  const [title, setTitle] = useState(e.title);
  const navigate = useNavigate();
  const [watchedState, setWatchedState] = useState(false);
  const [watchLaterState, setWatchLaterState] = useState(false);
  const [watchingState, setWatchingState] = useState(false);

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
    } else {
      setWatchedState(false);
      setWatchLaterState(false);
      setWatchingState(false);
    }
  }, [data]);

  const treatCheckBox = (e, obj, watch) => {
    if (userToken != "") {
      const checked = e.target.checked;
      const objId = obj.id;
      const objTitle = obj.title;
      const objPoster_path = obj.poster_path;
      const newObj = {
        email: user,
        checkBox: watch,
        task: checked ? "add" : "erase",
        id: objId,
        title: objTitle,
        poster_path: objPoster_path,
      };

      switch (watch) {
        case "watched": {
          setWatchedState(checked);
          allFetching.saveMovies(newObj, userToken);
          break;
        }
        case "watchLater": {
          setWatchLaterState(checked);
          allFetching.saveMovies(newObj, userToken);
          break;
        }
        case "watching": {
          setWatchingState(checked);
          allFetching.saveMovies(newObj, userToken);
          break;
        }
        default: {
          // Caso nenhum dos casos seja correspondente
          console.log("Estado desconhecido");
        }
      }
    } else {
      console.log("token vazio");
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
