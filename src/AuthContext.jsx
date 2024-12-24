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
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    const checkUser = async () => { 
      const token = Cookies.get("authToken");

      if (token) {
        const parseData = JSON.parse(token);  
        setUser(parseData.username);
        setUserToken(parseData.token);
        setTokenValidate(true);
      } else {
        setUser("");
        setTokenValidate(false);
      }
    };
    checkUser();
  }, []);

  const logout = () => {
    Cookies.remove("authToken");
    setUser("");
    setWatchLater([]);
    setWatched([]);
    setWatching([]);
    setUserToken("");
    setTokenValidate(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        setUserToken,
        tokenValidate,
        setTokenValidate,
        logout,
        watchLater,
        setWatchLater,
        watched,
        setWatched,
        watching,
        setWatching,
        userToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
