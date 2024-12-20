import { useState, useEffect } from "react";
import allFetching from "../assets/allFetching";
import ChangePage from "../assets/ChangePage";
import SingleCard from "../assets/SingleCard";

function Movies() {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [totalResults, setTotalResults] = useState(0);
  const token = import.meta.env.VITE_TMDB_TOKEN;

  useEffect(() => {
    const aFetching = async () => {
      try {
        const url =
          "https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=" +
          page;
        const response = await allFetching.allFetching(url);
        setPage(response.page);
        setResult(response.results);
        setTotalPages(response.total_pages);
        setTotalResults(response.total_results);
        console.log(response);
      } catch (error) {
        console.error("error fetching movie: ", error);
      } finally {
        console.log(result);
        setLoading(false);
      }
    };
    aFetching();
  }, [page]);

  return (
    <>
      {loading ? (
        <h2>Loading</h2>
      ) : (
        <>
          <main>
            <div className="inner-main">
              <h3>Movies &gt; 500 pages &gt; 1000 results</h3>
              <div className="showResult">
                {result.map((e, index) => {
                  return <SingleCard key={index} e={e} index={index} />;
                })}
              </div>
            </div>
          </main>
          <ChangePage
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            totalResults={totalResults}
          />
        </>
      )}
    </>
  );
}

export default Movies;
