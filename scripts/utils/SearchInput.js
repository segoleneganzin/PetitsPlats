import { displayRecipes } from '../pages/Index.js';
import { filtersQueries } from './FiltersQueries.js';
import { manageFilters } from './Filters.js';
/**
 * Manage input when user typing (display cross and recipes corresponded (only after 3 characters typing))
 * @param {string} filterId
 * @param {string} filterName
 */
const manageSearchInput = (originalRecipesList, filteredRecipes) => {
  //   console.log(originalRecipesList);
  //   console.log(filteredRecipes);
  const filterInput = document.getElementById('hero-search');
  const filterEmpty = document.getElementById(`empty-filter-hero-search`);
  //   filterInput.addEventListener('click', (event) => {
  //     let inputText = event.target.value;
  //     if (inputText.length === 0) {
  //       manageFilters(originalRecipesList, filteredRecipes).removeAllTags();
  //     }
  //   });
  // typing event
  filterInput.addEventListener('input', (event) => {
    let inputText = event.target.value;
    // console.log(inputText);
    filterEmpty.classList.add('empty-input-button--typing');
    if (inputText.length === 0) {
      filterEmpty.classList.remove('empty-input-button--typing');
    }
    if (inputText.length < 3) {
      emptyFilters(originalRecipesList);
    }
    if (inputText.length >= 3) {
      const filterBy = ['name', 'ingredients', 'description'];
      // removeAllTags();
      const filteredRecipesBySearch = filtersQueries(
        filteredRecipes,
        inputText,
        filterBy
      );
      displayRecipes(filteredRecipesBySearch);
      // manage advanced filters
      manageFilters(
        originalRecipesList,
        filteredRecipesBySearch
      ).updateFiltersDatas();
    }
  });

  // empty input on cross click
  filterEmpty.addEventListener('click', () => {
    filterInput.value = '';
    filterEmpty.classList.remove('empty-input-button--typing');
    emptyFilters(originalRecipesList);
  });
};

const emptyFilters = (originalList) => {
  displayRecipes(originalList);
  // manage advanced filters
  manageFilters(originalList, originalList).updateFiltersDatas();
};

export { manageSearchInput };
