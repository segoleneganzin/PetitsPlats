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
      updateFilters(allRecipes, filteredRecipesBySearch);
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
 * regenerate recipes with filter
 * @param {Array} originalList
 */
const updateFilters = (originalList, filteredList) => {
  displayRecipes(filteredList);
  // manage advanced filters
  manageFilters(originalList, filteredList);
  displayNumberTotalRecipes(filteredList);
};

export { manageSearchInput };
