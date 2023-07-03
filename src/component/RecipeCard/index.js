import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ meals }) => {
  return (
    <>
      {meals.map((meal) => (
        <div className="meal-item" key={meal.idMeal} data-id={meal.idMeal}>
          <div className="meal-img">
            <img src={meal.strMealThumb} alt="food" />
          </div>
          <div className="meal-name">
            <h3>{meal.strMeal}</h3>
            <Link to={`/recipe/${meal.idMeal}`} className="recipe-btn">
              Get Recipe
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};
export default RecipeCard;
