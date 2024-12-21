import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./menu/menu";
import Home from "./pages/Home";
import People from "./pages/People";
import Movies from "./pages/Movies";
import AllDetails from "./pages/AllDetails";
import Login from "./pages/Login";
import Tv from "./pages/Tv";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import CheckToken from "./CheckCookie";

function App() {
  const { tokenValidate } = useContext(AuthContext);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />}>
            {/* <Route
              index
              element={
                <CheckToken>
                  <Home />
                </CheckToken>
              }
            /> */}
            <Route index element={<Home />} />
            <Route path="movies" element={<Movies />} />
            <Route path="people" element={<People />} />
            <Route path="tv" element={<Tv />} />
            <Route path="allDetails" element={<AllDetails />} />
            <Route
              path="login"
              element={tokenValidate ? <Home /> : <Login />}
            />
            {/* <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
