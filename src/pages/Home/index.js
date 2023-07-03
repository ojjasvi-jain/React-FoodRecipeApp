import React, { useEffect, useState } from "react";
import RecipeCard from "../../component/RecipeCard";
import "./Home.css";

// RECIPE API
const RECIPE_API = "https://www.themealdb.com/api/json/v1/1/";

const MealsCollection = () => {
  //state
  const [meals, setMeals] = useState([]);
  const [category, setCategory] = useState("");

  // constants
  const categories = [
    "Beef",
    "Chicken",
    "Dessert",
    "Lamb",
    "Miscellaneous",
    "Pasta",
    "Pork",
    "Seafood",
    "Side",
    "Starter",
    "Vegan",
    "Vegetarian",
    "Breakfast",
    "Goat",
  ];

  function getMealList(e) {
    let url = "";
    let searchInputTxt = e.target.value.trim();
    if (searchInputTxt === "") {
      url = `${RECIPE_API}/filter.php?i=${searchInputTxt}`;
    } else {
      url = `${RECIPE_API}/filter.php?c=${searchInputTxt}`;
    }
    setCategory(searchInputTxt);
    fetchRecipeData(url, true);
  }

  // Generic function to fetch the data
  const fetchRecipeData = (url, isMeal) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.meals) {
          setMeals(data.meals);
        }
      });
  };

  // Fetch random recipies on mounting
  useEffect(() => {
    fetchRecipeData(`${RECIPE_API}/filter.php?i=`, true);
  }, []);

  return (
    <div className="container">
      <div className="meal-wrapper">
        <div className="meal-search">
          <h2 className="title">welcome !!! to Fred's kitchen</h2>

          <div className="meal-search-box">
            <select
              id="search-input"
              className="search-control"
              aria-placeholder="select a Category to get your dish recipe"
              onChange={getMealList}
            >
              <option defaultValue="" value={""}>
                -- select a Category to get your dish recipe --
              </option>
              {categories.map((category) => (
                <option id={category} value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
            <button type="submit" className="search-btn btn" id="search-btn">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>

        <div className="meal-result">
          <h5 className="title" id="title">
            {category
              ? "Your Search Results: 😊 "
              : "Here is random recipe list ... 😀 "}
          </h5>
          <div id="meal">{meals.length && <RecipeCard meals={meals} />}</div>
        </div>

        <div className="meal-details">
          <button
            type="button"
            className="btn recipe-close-btn"
            id="recipe-close-btn"
          >
            <i className="fas fa-times"></i>
          </button>

          <div className="meal-details-content"></div>
        </div>
      </div>
    </div>
  );
};

export default MealsCollection;
