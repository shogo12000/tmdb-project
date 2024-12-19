import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SingleCard({ e, index }) {
  const imageBaseURL = "https://image.tmdb.org/t/p/w200";
  const [title, setTitle] = useState(e.title);
  const navigate = useNavigate();

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
  }, []);
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
          <input type="checkbox" /> Watched
        </li>
        <li>
          <input type="checkbox" /> Watch Later
        </li>
        <li>
          <input type="checkbox" /> Watching
        </li>
      </ul>
    </div>
  );
}

export default SingleCard;
