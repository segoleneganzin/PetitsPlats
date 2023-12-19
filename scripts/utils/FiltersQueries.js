// list to filter
// filter by ...
import { displayRecipes } from '../pages/Index.js';

const filtersQueries = (recipes, filterValue, filterBy) => {
  // console.log(filterBy[0]);
  // TODO manage accent
  // mange letter lower case
  const filterValueLowerCase = filterValue.toLowerCase();
  // console.log(filterValueLowerCase);
  let recipesList = [...recipes];
  const filteredRecipes = [];
  for (let i = 0; i < filterBy.length; i++) {
    // if filterBy = array (ex: ingredients.ingredient)
    for (let j = 0; j < recipesList.length; j++) {
      if (
        recipesList[j][filterBy[i]].toLowerCase().includes(filterValueLowerCase)
      ) {
        filteredRecipes.push(recipesList[j]);
      }
    }
  }
  return filteredRecipes;
};

const getAllIngredients = (list) => {
  const ingredientsList = ['ingrédient1', 'ingrédient2', 'ingrédient3'];
  return ingredientsList;
};
const getAllAppliances = (list) => {
  const appliancesList = ['appareil 1', 'appareil 2'];
  return appliancesList;
};
const getAllUstensils = (list) => {
  const ustensilsList = ['ustensile 1', 'ustensile 2'];
  return ustensilsList;
};

export { filtersQueries, getAllIngredients, getAllAppliances, getAllUstensils };
