import { useState, createContext, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [watchLater, setWatchLater] = useState([]);
  const [watched, setWatched] = useState([]);
  const [watching, setWatching] = useState([]);
  const [tokenValidate, setTokenValidate] = useState(
    !!Cookies.get("authToken")
  );

  useEffect(() => {
    console.log("checando o token");
    const token = Cookies.get("authToken");

    setTokenValidate(!!token);
    if(tokenValidate){ 
      const parseData = JSON.parse(token); 
      setUser(parseData.username);
    }
  }, []);

  const logout = () => {
    Cookies.remove("authToken");
    setUser("");
    setTokenValidate(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        tokenValidate,
        setTokenValidate,
        logout,
        watchLater,
        setWatchLater,
        watched,
        setWatched,
        watching,
        setWatching,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
