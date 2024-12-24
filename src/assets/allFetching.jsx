import Cookies from "js-cookie";
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

const movieFetching = async (url, user, token)=>{ 
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer "+token,
      "Content-Type": "application/json",
    },
  })
 
  const data = await response.json();
 
  return data;
}

const userLogin = async (
  email,
  password,
  callBack,
  setLogged,
  setWatchLater,
  setWached,
  setWatching, 
  setUserToken
) => {
  try {
    callBack(true);
    const response = await fetch(
      "https://tmdb-backend-eta.vercel.app/api/auth/login",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Error trying to login");
    }

    const data = await response.json();
    const token = data;
 
    if (token) {
      setUserToken(token.token);

      Cookies.set("authToken", JSON.stringify({
        token: token.token,
        username: token.user.email,
      }), {
        expires: 10,
        secure: true,
        sameSite: "Strict",
      });

      setWatchLater(data.user.watchLater);
      setWached(data.user.watched);
      setWatching(data.user.watching);
      setLogged(true);
      callBack(false);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const saveMovies = async (newObj, userToken)=>{
  console.log("saving movies");
  console.log(newObj);
  console.log(userToken);
  try{
    const response = await fetch("https://tmdb-backend-eta.vercel.app/api/auth/savemovies", {
      method: "POST",
      headers: {
        Authorization: "Bearer "+userToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newObj),
    })

    if (!response.ok) {
      throw new Error("Error adding movie");
    }

  }catch(error){
    console.error("error: ", error)
  }

}
export default { allFetching, userLogin, movieFetching, saveMovies };
