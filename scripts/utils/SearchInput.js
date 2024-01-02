import { displayRecipes, displayNumberTotalRecipes } from '../pages/Index.js';
import { filtersQueries } from './FiltersQueries.js';
import { manageFilters } from './Filters.js';
import { sanitize } from './Helpers.js';

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
    inputText = sanitize(inputText);
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
 * @param {Array} filteredList
 * @param {string} inputText *optionnal
 */
const updateFilters = (originalList, filteredList, inputText) => {
  displayRecipes(filteredList, inputText);
  // manage advanced filters
  manageFilters(originalList, filteredList);
  displayNumberTotalRecipes(filteredList);
};

export { manageSearchInput };
