import { manageUpperFirstLetter } from './Helpers.js';
/**
 * manage request depend of filter value and filter by (it can be name, description, ingredients, ...)
 * search bar + advanced filters
 * @param {Array} recipes
 * @param {string} filterValue
 * @param {Array} filterBy
 * @returns
 */
const filtersQueries = (recipes, filterValue, filterBy) => {
  // mange letter lower case for avoid break case
  const filterValueLowerCase = filterValue.toLowerCase();
  const filteredRecipes = [];
  for (let i = 0; i < recipes.length; i++) {
    //
    let j = 0;
    while (j < filterBy.length) {
      if (filterBy[j] === 'ingredients') {
        const ingredientsList = recipes[i][filterBy[j]];
        let k = 0;
        while (k < ingredientsList.length) {
          if (
            ingredientsList[k].ingredient
              .toLowerCase()
              .includes(filterValueLowerCase)
          ) {
            filteredRecipes.push(recipes[i]);
            // as soon as the search item is found in a recipe, we move on to the next one
            j = filterBy.length;
            k = ingredientsList.length;
          }
          k++;
        }
      } else if (filterBy[j] === 'ustensils') {
        const ustensilsList = recipes[i][filterBy[j]];
        let k = 0;
        while (k < ustensilsList.length) {
          if (ustensilsList[k].toLowerCase().includes(filterValueLowerCase)) {
            filteredRecipes.push(recipes[i]);
            // as soon as the search item is found in a recipe, we move on to the next one
            j = filterBy.length;
            k = ustensilsList.length;
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
const getRecipesElements = (recipesList, filterBy) => {
  let elementList = [];
  recipesList.forEach((recipe) => {
    if (filterBy === 'ingredients' || filterBy === 'ustensils') {
      recipe[filterBy].forEach((element) => {
        let elementUpperCase;
        if (filterBy === 'ingredients') {
          elementUpperCase = manageUpperFirstLetter(element.ingredient);
        } else {
          elementUpperCase = manageUpperFirstLetter(element);
        }
        if (!elementList.includes(elementUpperCase)) {
          elementList.push(elementUpperCase);
        }
      });
    } else if (filterBy === 'appliances') {
      const applianceUpperCase = manageUpperFirstLetter(recipe.appliance);
      if (!elementList.includes(applianceUpperCase)) {
        elementList.push(applianceUpperCase);
      }
    }
  });
  elementList.sort((a, b) => a.localeCompare(b));
  return elementList;
};

export { filtersQueries, getRecipesElements, manageUpperFirstLetter };
