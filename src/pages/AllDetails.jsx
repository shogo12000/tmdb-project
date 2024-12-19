import { useNavigate, useLocation } from "react-router-dom";
import "./AllDetails.css";

function AllDetails(e) {
  const imageBaseURL = "https://image.tmdb.org/t/p/w500";
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state?.movie;
  console.log(result);
  return (
    <>
      <div className="AllDetails">
        <div className="AllDetailsInner">
          <div className="AllDetailsLeft">
            <img
              src={`${imageBaseURL}${result.poster_path}`}
              alt={result.title}
              className="responsive-image-300"
            />
            <ul>
              <li>
                <p>Title: {result.title} </p>
              </li>
              <li>
                <p>Overview: {result.overview} </p>
              </li>
              <li>
                <p>Language: {result.original_language} </p>
              </li>
              <li>
                <p>Release date: {result.release_date} </p>
              </li>
              <li>
                <p>Average rating: {result.vote_average} </p>
              </li>
              <li>
                <p>Vote count: {result.vote_count} </p>
              </li>

              <li>
                <button onClick={() => navigate(-1)}>back</button>
              </li>
            </ul>
          </div>
          <div className="AllDetailsRight"></div>
        </div>
      </div>
    </>
  );
}

export default AllDetails;
