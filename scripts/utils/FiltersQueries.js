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
  // Converts filter value to lowercase for case-insensitive matching
  const filterValueLowerCase = filterValue.toLowerCase();
  // Filters recipes according to specified filters
  const filteredRecipes = recipes.filter((recipe) => {
    // Checks if at least one of the filters matches the current recipe
    // if a filter matches, go on to the next recipe
    return filterBy.some((filter) => {
      // console.log(filter, recipe.name);
      // if filter is an array
      if (filter === 'ingredients' || filter === 'ustensils') {
        const elementList = recipe[filter];
        // Checks whether at least one element in the list matches the filtered value (if so, go on to the next recipe)
        return elementList.some((element) => {
          const elementText =
            filter === 'ingredients' ? element.ingredient : element;
          // 'break' equivalent if true
          return elementText.toLowerCase().includes(filterValueLowerCase);
        });
      } else {
        // Checks whether the recipe attribute matches the filtered value for other filter types
        return recipe[filter].toLowerCase().includes(filterValueLowerCase);
      }
    });
  });
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
