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

/**
 * Executed when page is loaded
 */
document.addEventListener('DOMContentLoaded', function () {
  init();
});

/**
 * Function that retrieves the div containing all the recipes and displays them
 * @param {array} recipes
 */
const displayRecipes = (recipes) => {
  const recipesContainer = document.querySelector('.recipes');
  recipes.forEach((recipe) => {
    recipe = Recipe(recipe);
    const cardDOM = displayRecipeCard(recipe);
    recipesContainer.appendChild(cardDOM);
  });
};

/**
 * display all filters in DOM
 */
const displayFilters = () => {
  const filtersContainer = document.querySelector('.filters__container');
  const filters = ['ingredients', 'appliances', 'ustensils'];
  filters.forEach((filter) => {
    const filterDOM = displayFilter(filter);
    filtersContainer.appendChild(filterDOM);
  });
  manageFilters();
};

/**
 * Function called on loading, retrieves data from recipes database
 * @async
 */
const init = () => {
  const datasRecipes = ApiRecipes();
  const { recipes } = datasRecipes.getRecipes();
  displayFilters();
  displayRecipes(recipes);
};
