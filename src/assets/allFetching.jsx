import Cookies from 'js-cookie';
 
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

const userLogin = async (email, password, callBack, setLogged)=>{

  try {
    callBack(true);
    const response = await fetch("https://tmdb-backend-eta.vercel.app/api/auth/login", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",  
      },
      body: JSON.stringify({
        email,  
        password,  
      }),
    });

    if (!response.ok) {
      throw new Error("Error trying to login");
    }

    const data = await response.json();
    const token = data.token;
    
    if(token){
      Cookies.set('authToken', token, { expires: 1, secure: true, sameSite: 'Strict' }); 
      setLogged(true);
      callBack(false);
    }
   

  } catch (error) {
    console.error("Error:", error);
  } finally {

  }
}


export default { allFetching, userLogin };
