/*********************************************************************************
*
* This file contains Recipe object management
*
/*********************************************************************************/

/**
 * create object recipe
 * @param {object} data
 */
const Recipe = (data) => ({
  id: data.id,
  image: data.image,
  name: data.name,
  servings: data.servings,
  ingredients: data.ingredients,
  time: data.time,
  description: data.description,
  appliance: data.appliance,
  ustensils: data.ustensils,
});

export { Recipe };
