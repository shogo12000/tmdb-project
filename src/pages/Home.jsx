import { useContext } from "react";
import { AuthContext } from "../AuthContext";


function Home() {
  const { user } = useContext(AuthContext);
  return (  
  <>
    <h1>Home</h1>
    <p>{user}</p>
  </>
  )
}

export default Home;
