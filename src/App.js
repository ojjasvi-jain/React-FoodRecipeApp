import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MealsCollection from "./pages/Home";
import Recipe from "./pages/recipePage";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={MealsCollection}></Route>
          <Route path="/recipe/:mealId" Component={Recipe}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
