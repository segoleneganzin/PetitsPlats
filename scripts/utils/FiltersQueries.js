import { manageUpperFirstLetter } from './Helpers.js';
/**
 * manage request depend of filter value and filter by (it can be name, description, ingredients, ...)
 * search bar + advanced filters
 * @param {Array} recipes
 * @param {string} filterValue
 * @param {Array} filterBy
 * @returns {Array}
 */
const filtersQueries = (recipes, filterValue, filterBy) => {
  // mange letter lower case for avoid break case
  const filterValueLowerCase = filterValue.toLowerCase();
  const filteredRecipes = [];
  for (let i = 0; i < recipes.length; i++) {
    let j = 0;
    while (j < filterBy.length) {
      // manage array into recipe
      if (filterBy[j] === 'ingredients' || filterBy[j] === 'ustensils') {
        const elementList = recipes[i][filterBy[j]];
        let k = 0;
        while (k < elementList.length) {
          let element = elementList[k];
          if (filterBy[j] === 'ingredients') {
            element = elementList[k].ingredient;
          }
          if (element.toLowerCase().includes(filterValueLowerCase)) {
            filteredRecipes.push(recipes[i]);
            // as soon as the search item is found in a recipe, we move on to the next one
            k = elementList.length;
            j = filterBy.length;
          }
          k++;
        }
      } else {
        if (
          recipes[i][filterBy[j]].toLowerCase().includes(filterValueLowerCase)
        ) {
          filteredRecipes.push(recipes[i]);
          // as soon as the search item is found in a recipe, we move on to the next one
          j = filterBy.length;
        }
      }
      j++;
    }
  }
  return filteredRecipes;
};

// ************************************** advanced filters for tags
/**
 * get all element (ingredients, appliances, ustensils, ...) of recipes
 * @param {Array} recipesList
 * @param {string} filterBy
 * @returns
 */
const getRecipesElements = (recipesList, filterBy) => {
  let elementList = [];
  recipesList.forEach((recipe) => {
    if (filterBy === 'ingredients' || filterBy === 'ustensils') {
      recipe[filterBy].forEach((element) => {
        let formattedElement;
        if (filterBy === 'ingredients') {
          // prevent sensitive case
          formattedElement = manageUpperFirstLetter(
            element.ingredient.toLowerCase()
          );
        } else {
          // prevent sensitive case
          formattedElement = manageUpperFirstLetter(element.toLowerCase());
        }
        if (!elementList.includes(formattedElement)) {
          elementList.push(formattedElement);
        }
      });
    } else if (filterBy === 'appliances') {
      // prevent sensitive case
      const formattedAppliance = manageUpperFirstLetter(
        recipe.appliance.toLowerCase()
      );
      if (!elementList.includes(formattedAppliance)) {
        elementList.push(formattedAppliance);
      }
    }
  });
  elementList.sort((a, b) => a.localeCompare(b));
  return elementList;
};

export { filtersQueries, getRecipesElements };
