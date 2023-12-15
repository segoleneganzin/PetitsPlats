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
  const filterIngredientsButton = document.getElementById('filter-ingredients');
  const filterIngredientsList = document.getElementById('ingredients-list');
  const filterAppliancesButton = document.getElementById('filter-appliances');
  const filterAppliancesList = document.getElementById('appliances-list');
  const filterUstensilsButton = document.getElementById('filter-ustensils');
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
  filters.forEach((element) => {
    element.button.addEventListener('click', () => {
      toggleFilter(element.button, element.list, element.datas, element.name);
    });
  });

  /**
   * manage open/close filter list
   * @param {html} button
   * @param {html} list
   * @param {array} datas
   * @param {string} name
   */
  const toggleFilter = (button, list, datas, name) => {
    const ariaExpandedAttribute = button.getAttribute('aria-expanded');
    if (ariaExpandedAttribute === 'false') {
      list.classList.add('filter__list--open');
      button.setAttribute('aria-expanded', true);
      manageFilterList(datas, name);
    } else {
      list.classList.remove('filter__list--open');
      button.setAttribute('aria-expanded', false);
      button.focus();
    }
  };
};

/**
 * At open, all the datas of filter are display
 * Reusable for filter with what user want (query on filterDatas)
 * @param {Array} filterDatas
 * @param {string} filterName
 */
const manageFilterList = (filterDatas, filterName) => {
  const filterList = document.getElementById(`${filterName}-list`);
  for (let i = 0; i < filterDatas.length; i++) {
    const listElement = `<li><button role="option" id="${filterDatas[i]}">${filterDatas[i]}</button></li>`;
    filterList.innerHTML += listElement;
  }
};

export { manageFilters, manageFilterList };
