const filtersQueries = (recipes, filterValue, filterBy) => {
  // mange letter lower case for avoid break case
  const filterValueLowerCase = filterValue.toLowerCase();
  // copy list to avoid side effect
  let recipesList = [...recipes];
  const filteredRecipes = [];
  for (let i = 0; i < recipesList.length; i++) {
    //
    let j = 0;
    while (j < filterBy.length) {
      if (filterBy[j] === 'ingredients') {
        const ingredientsList = recipesList[i][filterBy[j]];
        let k = 0;
        while (k < ingredientsList.length) {
          if (
            ingredientsList[k].ingredient
              .toLowerCase()
              .includes(filterValueLowerCase)
          ) {
            filteredRecipes.push(recipesList[i]);
            // as soon as the search item is found in a recipe, we move on to the next one
            j = filterBy.length;
            k = ingredientsList.length;
          }
          k++;
        }
      } else {
        if (
          recipesList[i][filterBy[j]]
            .toLowerCase()
            .includes(filterValueLowerCase)
        ) {
          filteredRecipes.push(recipesList[i]);
          // as soon as the search item is found in a recipe, we move on to the next one
          j = filterBy.length;
        }
      }
      j++;
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
