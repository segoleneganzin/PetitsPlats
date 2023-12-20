const filtersQueries = (recipes, filterValue, filterBy) => {
  // mange letter lower case for avoid break case
  const filterValueLowerCase = filterValue.toLowerCase();
  // copy list to avoid side effect
  // let recipesList = recipes;
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

const getIngredients = (recipesList) => {
  let ingredientsList = [];
  recipesList.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      // manage sensitive case
      const ingredientUpperCase =
        ingredient.ingredient.charAt(0).toUpperCase() +
        ingredient.ingredient.slice(1);
      // Check if the utensil is not already in the list
      if (!ingredientsList.includes(ingredientUpperCase)) {
        ingredientsList.push(ingredientUpperCase);
      }
    });
  });
  // sort by alphabetic order
  ingredientsList.sort((a, b) => {
    return a.localeCompare(b);
  });
  return ingredientsList;
};
const getAppliances = (recipesList) => {
  let appliancesList = [];
  recipesList.forEach((recipe) => {
    // manage sensitive case
    const applianceUpperCase =
      recipe.appliance.charAt(0).toUpperCase() + recipe.appliance.slice(1);
    // Check if the appliance is not already in the list
    if (!appliancesList.includes(applianceUpperCase)) {
      appliancesList.push(applianceUpperCase);
    }
  });
  // sort by alphabetic order
  appliancesList.sort((a, b) => {
    return a.localeCompare(b);
  });
  return appliancesList;
};
const getUstensils = (recipesList) => {
  let ustensilsList = [];
  recipesList.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      // manage sensitive case
      const ustensilUpperCase =
        ustensil.charAt(0).toUpperCase() + ustensil.slice(1);
      // Check if the utensil is not already in the list
      if (!ustensilsList.includes(ustensilUpperCase)) {
        ustensilsList.push(ustensilUpperCase);
      }
    });
  });
  // sort by alphabetic order
  ustensilsList.sort((a, b) => {
    return a.localeCompare(b);
  });
  return ustensilsList;
};

export { filtersQueries, getIngredients, getAppliances, getUstensils };
