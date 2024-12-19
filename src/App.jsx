import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./menu/menu";
import Home from "./pages/Home";
import People from "./pages/People";
import Movies from "./pages/Movies";
import Tv from "./pages/Tv";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />}>
            <Route index element={<Home />} />
            <Route path="movies" element={<Movies />} />
            <Route path="people" element={<People />} />
            <Route path="tv" element={<Tv />} />
            {/* <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
