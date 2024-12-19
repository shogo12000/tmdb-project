const token = import.meta.env.VITE_TMDB_TOKEN;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};

const allFetching = async (url) => {
  try {
    const getMovies = await fetch(url, options);
    const results = await getMovies.json();
    return results;
  } catch (error) {
    console.error("Error try again!!!", error);
  }
};

export default allFetching;
