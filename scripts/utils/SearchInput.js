import { displayRecipes, displayNumberTotalRecipes } from '../pages/Index.js';
import { filtersQueries } from './FiltersQueries.js';
import { manageFilters } from './Filters.js';
/**
 * Manage input when user typing (display cross and recipes corresponded (only after 3 characters typing))
 * @param {Array} allRecipes
 * @param {Array} filteredRecipes
 */
const manageSearchInput = (allRecipes, filteredRecipes) => {
  const filterInput = document.getElementById('hero-search');
  const filterEmpty = document.getElementById(`empty-filter-hero-search`);
  // typing event
  filterInput.addEventListener('input', (event) => {
    let inputText = event.target.value;
    filterEmpty.classList.add('empty-input-button--typing');
    if (inputText.length === 0) {
      filterEmpty.classList.remove('empty-input-button--typing');
    }
    if (inputText.length < 3) {
      updateFilters(allRecipes, allRecipes);
    }
    if (inputText.length >= 3) {
      const filterBy = ['name', 'ingredients', 'description'];
      const filteredRecipesBySearch = filtersQueries(
        filteredRecipes,
        inputText,
        filterBy
      );
      updateFilters(allRecipes, filteredRecipesBySearch, inputText);
    }
    // empty input on cross click
    filterEmpty.addEventListener('click', () => {
      filterInput.value = '';
      filterEmpty.classList.remove('empty-input-button--typing');
      updateFilters(allRecipes, allRecipes);
    });
  });
};

/**
 * regenerate recipes view with appropriate filters
 * @param {Array} originalList
 */
const updateFilters = (originalList, filteredList, inputText) => {
  // console.log(filteredList.length);
  // if (filteredList.length === 0) {
  //   console.log(`Aucune recette ne contient ${inputText} vous pouvez chercher «
  //   tarte aux pommes », « poisson », etc.`);
  // } else if (filteredList.length >= 1) {
  displayRecipes(filteredList, inputText);
  // }
  // manage advanced filters
  manageFilters(originalList, filteredList);
  displayNumberTotalRecipes(filteredList);
};

export { manageSearchInput };
