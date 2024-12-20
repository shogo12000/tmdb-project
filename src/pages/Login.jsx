import "./Login.css";
import userLogin from "../assets/allFetching";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [userLogged, setUserLogged] = useState(false);

  useEffect(() => {
    {
      userLogged && navigate("/");
    }
  }, [userLogged]);

  return (
    <>
      {!loading ? (
        <>
          <p>username teste</p>
          <p>password teste</p>
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
                userLogin.userLogin(userName, userPassword, setLoading, setUserLogged)
              }
            >
              login
            </button>
          </div>
        </>
      ) : (
        <h1>loading...</h1>
      )}
    </>
  );
}

export default Login;
