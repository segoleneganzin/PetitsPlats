/*********************************************************************************
*
* This file manage filters
*
/*********************************************************************************/
import { ApiRecipes } from '../models/api/ApiRecipes.js';
/**
 * manage click on button filter and what to display
 */

const manageFilters = () => {
  const heroFilterInput = document.getElementById('hero-search');
  const selectedFiltersContainer = document.getElementById('selected-filters');
  const selectedFiltersList = document.querySelector('.selected-filters__list');
  let numberFiltersSelected = 0;
  const filterIngredientsButton = document.getElementById('filter-ingredients');
  const filterAppliancesButton = document.getElementById('filter-appliances');
  const filterUstensilsButton = document.getElementById('filter-ustensils');
  const filterIngredientsList = document.getElementById('ingredients-list');
  const filterAppliancesList = document.getElementById('appliances-list');
  const filterUstensilsList = document.getElementById('ustensils-list');
  let filterIngredientsDatas = ApiRecipes().getAllIngredients();
  let filterAppliancesDatas = ApiRecipes().getAllAppliances();
  let filterUstensilsDatas = ApiRecipes().getAllUstensils();
  const filters = [
    {
      name: 'ingredients',
      button: filterIngredientsButton,
      list: filterIngredientsList,
      datas: filterIngredientsDatas,
    },
    {
      name: 'appliances',
      button: filterAppliancesButton,
      list: filterAppliancesList,
      datas: filterAppliancesDatas,
    },
    {
      name: 'ustensils',
      button: filterUstensilsButton,
      list: filterUstensilsList,
      datas: filterUstensilsDatas,
    },
  ];

  /**
   * manage open/close filter list
   * @param {html} listButton
   * @param {html} listDOM
   */
  const toggleFilter = (listButton, listDOM) => {
    const ariaExpandedAttribute = listButton.getAttribute('aria-expanded');
    if (ariaExpandedAttribute === 'false') {
      listDOM.classList.add('filter__list-container--open');
      listButton.classList.add('filter--open');
      listButton.setAttribute('aria-expanded', true);
    } else {
      listDOM.classList.remove('filter__list-container--open');
      listButton.classList.remove('filter--open');
      listButton.setAttribute('aria-expanded', false);
      listButton.focus();
    }
  };
  /**
   * At open, all the datas of filter are display
   * Reusable for filter with what user want (query on filterDatas)
   * @param {html} listButton
   * @param {html} listDOM
   * @param {array} filterDatas
   * @param {string} filterName
   */
  const manageFilterList = (listButton, listDOM, filterDatas, filterName) => {
    const filterList = document.getElementById(`${filterName}-list-items`);
    filterDatas.forEach((filterItem) => {
      const listElement = document.createElement('li');
      const filterButton = document.createElement('button');
      filterButton.setAttribute('role', 'option');
      filterButton.setAttribute('id', filterItem);
      filterButton.textContent = filterItem;

      listElement.appendChild(filterButton);
      filterList.appendChild(listElement);

      filterButton.addEventListener('click', () => {
        addFilter(listButton, listDOM, filterItem);
      });
    });
  };
  const manageFilterInput = (filterId, filterName) => {
    const filterInput = document.getElementById(filterId);
    const filterEmpty = document.getElementById(`empty-filter-${filterName}`);
    filterInput.addEventListener('input', (event) => {
      let inputText = event.target.value;
      console.log(inputText);
      filterEmpty.classList.add('empty-input-button--typing');
      if (inputText.length === 0) {
        filterEmpty.classList.remove('empty-input-button--typing');
      }
    });
    filterEmpty.addEventListener('click', () => {
      filterInput.value = '';
      filterEmpty.classList.remove('empty-input-button--typing');
    });
  };
  /**
   *
   * @param {html} listButton
   * @param {html} listDOM
   * @param {string} filterItem
   */
  const addFilter = (listButton, listDOM, filterItem) => {
    if (selectedFiltersContainer.className === 'selected-filters') {
      selectedFiltersContainer.className = 'selected-filters--activate';
    }
    numberFiltersSelected += 1;
    const selectedFilter = document.createElement('li');
    selectedFilter.className = 'flex-row';
    selectedFilter.setAttribute('id', filterItem + '-selected');

    const filter = document.createElement('span');
    filter.textContent = filterItem;

    const filterCloseButton = document.createElement('button');
    filterCloseButton.innerHTML = `<svg
        xmlns='http://www.w3.org/2000/svg'
        width='14'
        height='13'
        viewBox='0 0 14 13'
        fill='none'
      >
        <path
          d='M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5'
          stroke='#1B1B1B'
          stroke-width='2.16667'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </svg>`;
    filterCloseButton.addEventListener('click', () => {
      removeFilter(listButton, listDOM, filterItem);
    });

    selectedFilter.appendChild(filter);
    selectedFilter.appendChild(filterCloseButton);

    selectedFiltersList.appendChild(selectedFilter);

    toggleFilter(listButton, listDOM);
    // TODO display corresponded recipes (import function with vue)
    // TODO delete filter already selected into list
  };

  /**
   *
   * @param {html} listButton
   * @param {html} listDOM
   * @param {string} filterItem
   */
  const removeFilter = (listButton, listDOM, filterItem) => {
    numberFiltersSelected -= 1;
    const filterItemSelectedDOM = document.getElementById(
      `${filterItem}-selected`
    );
    filterItemSelectedDOM.remove();
    if (numberFiltersSelected === 0) {
      selectedFiltersContainer.className = 'selected-filters';
    }
    toggleFilter(listButton, listDOM);
  };

  manageFilterInput('hero-search', 'hero-search');

  filters.forEach((filter) => {
    manageFilterList(filter.button, filter.list, filter.datas, filter.name);
    filter.button.addEventListener('click', () => {
      toggleFilter(filter.button, filter.list);
      manageFilterInput(`filter-search-${filter.name}`, filter.name);
    });
  });
};

export { manageFilters };
