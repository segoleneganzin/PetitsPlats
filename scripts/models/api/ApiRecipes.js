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

  return { getRecipes };
};

export { ApiRecipes };
