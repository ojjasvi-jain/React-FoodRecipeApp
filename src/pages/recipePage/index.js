import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Recipe.css";

const RECIPE_API = "https://www.themealdb.com/api/json/v1/1/";

const RecipeContainer = () => {
  const param = useParams();

  const [recipeDetails, setRecipeDetails] = useState("");

  // get recipe of the meal
  function getMealRecipe() {
    fetch(`${RECIPE_API}/lookup.php?i=${param.mealId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.meals) {
          setRecipeDetails(data.meals[0]);
        }
      })
      .catch((err) => {
        console.log("error message", err);
      });
  }

  // arrange the ingrident and measurement
  const ingrediantList = () => {
    let itemsContainer = [];
    let itemsMeasurements = [];
    if (recipeDetails) {
      for (let i = 1; i <= 20; i++) {
        if (recipeDetails[`strIngredient${i}`]) {
          itemsContainer.push(recipeDetails[`strIngredient${i}`]);
          itemsMeasurements.push(recipeDetails[`strMeasure${i}`]);
        }
      }

      return (
        <table>
          <tbody>
            {itemsContainer.map((item, index) => (
              <tr key={`${item}-${index}`} className="ingrediant-img row">
                <td className="col-1">
                  <img
                    src={`https://www.themealdb.com/images/ingredients/${item}.png`}
                    alt=""
                  />
                  <p>{item}</p>
                </td>
                <td className="col-2">{itemsMeasurements[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  };

  useEffect(() => {
    getMealRecipe();
  }, [param]);

  return (
    <main>
      <h1 className="main-heading">{recipeDetails.strMeal}</h1>
      <div className="form-frame">
        <div className="image-container">
          <img src={recipeDetails.strMealThumb} alt={recipeDetails.strMeal} />
        </div>
        <div className="form-container">
          <section>
            <h3 className="heading">Ingrediants</h3>
            <div className="ingrediant_contanier">{ingrediantList()}</div>
          </section>
          <section className="recipe_details">
            <h3 className="heading">Instructions</h3>
            <p>{recipeDetails.strInstructions}</p>
          </section>
          <section className="vedio_details">
            <h3 className="heading">video</h3>
            <Link to={recipeDetails.strYoutube}>video Link</Link>
          </section>
        </div>
      </div>
    </main>
  );
};

export default RecipeContainer;
