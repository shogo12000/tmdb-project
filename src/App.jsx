import { useEffect, useState } from "react";
import "./App.css";
import Menu from "./menu/menu";

function App() {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = import.meta.env.VITE_TMDB_TOKEN;
  const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const movies = async () => {
    try {
      const getMovies = await fetch(url, options);
      const results = await getMovies.json();
      setResult(results.results);
      //console.log(results)
    } catch (error) {
      console.error("Error try again!!!", error);
    } finally {
      console.log(result)
      setLoading(false);
    }
  };

  useEffect(() => {
    movies();
  }, []);

  return (
    <>
      <Menu />
      {loading ? (
        "loading..."
      ) : (
        <div>
          {result.map((e, index) => {
            return <div key={index}>{e.title}</div>;
          })}
        </div>
      )}
    </>
  );
}

export default App;
