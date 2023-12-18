/*********************************************************************************
*
* This files permitted to link DB
*
/*********************************************************************************/
import { recipes } from '../../../assets/datas/recipes.js';

/**
 * Manage datas from recipe DB
 * For the moment the data is stored in a js file
 * @returns {functions}
 */
const ApiRecipes = () => {
  /**
   * function to link the database for easier calling up
   * @returns {array}
   */
  const getRecipes = () => {
    return { recipes };
  };

  const getAllIngredients = () => {
    const ingredientsList = [
      'ingrédient1',
      'ingrédient2',
      'ingrédient3',
      'ingrédient1',
      'ingrédient2',
      'ingrédient3',
      'ingrédient1',
      'ingrédient2',
      'ingrédient3',
      'ingrédient1',
      'ingrédient2',
      'ingrédient3',
    ];
    return ingredientsList;
  };
  const getAllAppliances = () => {
    const appliancesList = ['appareil 1', 'appareil 2'];
    return appliancesList;
  };
  const getAllUstensils = () => {
    const ustensilsList = ['ustensile 1', 'ustensile 2'];
    return ustensilsList;
  };
  return { getRecipes, getAllIngredients, getAllAppliances, getAllUstensils };
};

export { ApiRecipes };
