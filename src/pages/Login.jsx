import "./Login.css";
import userLogin from "../assets/allFetching";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  const {
    setUser,
    setTokenValidate,
    setWatchLater,
    setWatched,
    setWatching,
    setUserToken,
  } = useContext(AuthContext);

  useEffect(() => {
    setUser("");
    setUserPassword("");
  }, [newUser]);

  useEffect(() => {
    {
      console.log("logado com sucesso");
      if (userLogged) {
        setTokenValidate(true);
        setUser(userName);
        navigate("/");
      }
    }
  }, [userLogged]);

  const createUser = async () => {
    try {
      const response = await fetch(
        "https://tmdb-backend-eta.vercel.app/api/auth/createUser",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userName,
            password: userPassword,
          }),
        }
      );
      console.log(response);
      if (!response.ok) {
        console.log("Error trying to login");
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log("cant create new User: ", error);
    }
  };
  return (
    <>
      {!loading ? (
        <>
          {!newUser ? (
            <div className="login">
              userName:
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              password:
              <input
                type="password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
              <button
                onClick={() =>
                  userLogin.userLogin(
                    userName,
                    userPassword,
                    setLoading,
                    setUserLogged,
                    setWatchLater,
                    setWatched,
                    setWatching,
                    setUserToken
                  )
                }
              >
                login
              </button>
              <button onClick={() => setNewUser(true)}>SignUp</button>
            </div>
          ) : (
            <div className="login">
              userName:
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              password:
              <input
                type="password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
              <button onClick={() => createUser()}>Create User</button>
              <button onClick={() => setNewUser(false)}>Login</button>
            </div>
          )}
        </>
      ) : (
        <h1>loading.s..</h1>
      )}
    </>
  );
}

export default Login;
