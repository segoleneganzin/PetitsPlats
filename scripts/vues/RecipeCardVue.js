/*********************************************************************************
*
* This file manage vue of recipe's card 
*
/*********************************************************************************/

/**
 * Function that creates an article to display the recipe's card
 * @param {object} recipe
 * @returns {html}
 */
const displayRecipeCard = (recipe) => {
  // article container
  const article = document.createElement('article');
  article.className = 'recipe-card flex-col';
  let src = `assets/photos/${recipe.image}`;
  const ingredientsList = recipe.ingredients
    .map(
      (ingredient) => `    <li class="flex-col">
    <span class="recipe-card__ingredient">${ingredient.ingredient}</span>
    <span class="recipe-card__ingredient-quantity">${
      ingredient.unit ? ingredient.quantity : ''
    } ${ingredient.unit ? ingredient.unit : ''}</span>
</li>`
    )
    .join('');
  const recipeCard = `
    <img src=${src} alt=${recipe.name} height="253px" width="380px">
    <div class="recipe-card__duration">${recipe.time}min</div>
    <div class="recipe-card__content flex-col">
        <h2 class="recipe-card__title">${recipe.name}</h2>
        <section class="recipe-card__content-section flex-col">
            <h3 class="recipe-card__subtitle">Recette</h3>
            <p class="recipe-card__instruction">
            ${recipe.description}
            </p>
        </section>
        <section class="recipe-card__content-section flex-col">
            <h3 class="recipe-card__subtitle">Ingrédients</h3>
            <ul class="recipe-card__ingredients-list">
            ${ingredientsList}
            </ul>
        </section>
    </div>
      `;

  article.innerHTML = recipeCard;

  return article;
};

export { displayRecipeCard };
