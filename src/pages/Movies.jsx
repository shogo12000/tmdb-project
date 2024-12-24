import { useState, useEffect } from "react";
import allFetching from "../assets/allFetching";
import ChangePage from "../assets/ChangePage";
import SingleCard from "../assets/SingleCard";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

function Movies() {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [totalResults, setTotalResults] = useState(0);
  const { user, userToken } = useContext(AuthContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    const aFetching = async () => {
      try {
        if (userToken != "") {
          const urlMovie =
            "https://tmdb-backend-eta.vercel.app/api/auth/movies";
          const dataResponse = await allFetching.movieFetching(
            urlMovie,
            user,
            userToken
          );
          setData(dataResponse);
        } else {
          setData(null);
        }

        const url =
          "https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=" +
          page;

        const response = await allFetching.allFetching(url);

        setResult(response.results);
        setTotalPages(response.total_pages);
        setTotalResults(response.total_results);
      } catch (error) {
        console.error("error fetching movie: ", error);
      } finally {
        setLoading(false);
      }
    };
    aFetching();
  }, [page, user, userToken]);

  return (
    <>
      {loading ? (
        <main>
          <h2>Loading</h2>
        </main>
      ) : (
        <>
          <main>
            <div className="inner-main">
              <h3>Movies &gt; 500 pages &gt; 1000 results {user}</h3>

              <div className="showResult">
                {result.map((e, index) => {
                  return (
                    <SingleCard
                      key={index}
                      e={e}
                      index={index}
                      data={data}
                      user={user}
                      userToken={userToken}
                    />
                  );
                })}
              </div>
            </div>
          </main>
          <ChangePage
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            setLoading={setLoading}
          />
        </>
      )}
    </>
  );
}

export default Movies;
