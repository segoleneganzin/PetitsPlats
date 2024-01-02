/*********************************************************************************
*
* This file control home page
*
/*********************************************************************************/
import { ApiRecipes } from '../models/api/ApiRecipes.js';
import { Recipe } from '../models/metier/Recipe.js';
import { displayFilter } from '../vues/FiltersVue.js';
import { manageFilters } from '../utils/Filters.js';
import { displayRecipeCard } from '../vues/RecipeCardVue.js';
import { manageSearchInput } from '../utils/SearchInput.js';

/**
 * Executed when page is loaded
 */
document.addEventListener('DOMContentLoaded', function () {
  init();
});

/**
 * Function that retrieves the div containing all the recipes and displays them
 * @param {Array} recipes
 */
const displayRecipes = (recipes, inputText) => {
  const recipesContainer = document.getElementById('recipes');
  recipesContainer.innerHTML = '';
  if (recipes.length === 0) {
    recipesContainer.className = 'recipes--not-found';
    const recipesNotFoundDOM = document.createElement('p');
    recipesNotFoundDOM.textContent = `Aucune recette ne contient '${inputText}', vous pouvez chercher «
    tarte aux pommes », « poisson », etc.`;
    recipesContainer.appendChild(recipesNotFoundDOM);
  } else if (recipes.length > 0) {
    recipesContainer.className = 'recipes';
    recipes.forEach((recipe) => {
      recipe = Recipe(recipe);
      const cardDOM = displayRecipeCard(recipe);
      recipesContainer.appendChild(cardDOM);
    });
  }
};

/**
 * display all filters in DOM
 * @param {Array} recipes
 */
const displayFilters = (recipes) => {
  const filtersContainer = document.querySelector('.filters__container');
  const filters = ['ingredients', 'appliances', 'ustensils'];
  filters.forEach((filter) => {
    const filterDOM = displayFilter(filter);
    filtersContainer.appendChild(filterDOM);
  });
  manageFilters(recipes, recipes);
};

/**
 * display total numbers of recipes found
 * @param {Array} recipes
 */
const displayNumberTotalRecipes = (recipes) => {
  const numberTotalRecipesDOM = document.querySelector(
    '.filters__total-recipes'
  );
  const numberTotalRecipes = recipes.length;
  if (numberTotalRecipes < 10) {
    numberTotalRecipesDOM.textContent = `0${numberTotalRecipes} recettes`;
  } else if (numberTotalRecipes <= 1) {
    numberTotalRecipesDOM.textContent = `0${numberTotalRecipes} recette`;
  } else {
    numberTotalRecipesDOM.textContent = `${numberTotalRecipes} recettes`;
  }
};

/**
 * Prevent XSS injection by replacing HTML tags into forms
 * @param {string} input
 * @returns {string}
 */
function sanitize(input) {
  return input.replace(/<[^>]*>/g, '');
}

/**
 * Function called on loading, retrieves data from recipes database
 */
const init = () => {
  const datasRecipes = ApiRecipes();
  const { recipes } = datasRecipes.getRecipes();
  displayFilters(recipes);
  displayRecipes(recipes);
  manageSearchInput(recipes, recipes);
  displayNumberTotalRecipes(recipes);
};

export { displayRecipes, displayNumberTotalRecipes, sanitize };
