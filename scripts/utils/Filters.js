/*********************************************************************************
*
* This file manage filters
*
/*********************************************************************************/
import { displayRecipes } from '../pages/Index.js';
import { displayTag } from '../vues/TagVue.js';
import {
  filtersQueries,
  getAppliances,
  getIngredients,
  getUstensils,
} from './FiltersQueries.js';
/**
 * manage click on button filter and what to display
 */

const manageFilters = (originalRecipesList, filteredRecipes) => {
  // filters by tags
  const filterIngredientsButton = document.getElementById('filter-ingredients');
  const filterAppliancesButton = document.getElementById('filter-appliances');
  const filterUstensilsButton = document.getElementById('filter-ustensils');
  const filterIngredientsList = document.getElementById('ingredients-list');
  const filterAppliancesList = document.getElementById('appliances-list');
  const filterUstensilsList = document.getElementById('ustensils-list');
  let filterIngredientsDatas = getIngredients(filteredRecipes);
  let filterAppliancesDatas = getAppliances(filteredRecipes);
  let filterUstensilsDatas = getUstensils(filteredRecipes);
  let filters = [
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
  // let filteredRecipes;
  // tags (selected filters)
  const tagsContainer = document.getElementById('tags');
  const tagsList = document.querySelector('.tags__list');
  const tagsListElement = [];
  let numberTags = 0;

  /**
   * Manage datas to display into advanced filters
   * when user typing
   */
  const updateFiltersDatas = () => {
    const newFiltersDatas = [
      getIngredients(filteredRecipes),
      getAppliances(filteredRecipes),
      getUstensils(filteredRecipes),
    ];
    filters.forEach((filter, index) => {
      filter.datas = newFiltersDatas[index];
      manageFilterList(filter);
    });
  };

  /**
   * manage open/close filter list
   * Close opened filter when another is open
   * @param {html} listButton
   * @param {html} listDOM
   */
  const toggleFilter = (listButton, listDOM) => {
    const allListButtons = document.querySelectorAll('.filter__button');
    const allListDOM = document.querySelectorAll('.filter__list-container');
    const ariaExpandedAttribute = listButton.getAttribute('aria-expanded');
    if (ariaExpandedAttribute === 'false') {
      allListButtons.forEach((button) => {
        button.classList.remove('filter--open');
        button.setAttribute('aria-expanded', false);
      });
      allListDOM.forEach((list) =>
        list.classList.remove('filter__list-container--open')
      );
      listDOM.classList.add('filter__list-container--open');
      listButton.classList.add('filter--open');
      listButton.setAttribute('aria-expanded', true);
    } else {
      listDOM.classList.remove('filter__list-container--open');
      listButton.classList.remove('filter--open');
      listButton.setAttribute('aria-expanded', false);
    }
  };

  /**
   * At open, all the datas of filter are display
   * @param {object} filter
   */
  const manageFilterList = (filter) => {
    const filterList = document.getElementById(`${filter.name}-list-items`);
    filterList.innerHTML = '';
    filter.datas.forEach((tag) => {
      const listElement = document.createElement('li');
      const filterButton = document.createElement('button');
      filterButton.setAttribute('role', 'option');
      filterButton.setAttribute('id', tag.split(' ').join('')); // remove space into filter name
      filterButton.textContent = tag;

      listElement.appendChild(filterButton);
      filterList.appendChild(listElement);

      filterButton.addEventListener('click', () => {
        addTag(filter, tag);
      });
    });
    filter.button.removeEventListener('click', () => {
      toggleFilter(filter.button, filter.list);
    });
    filter.button.addEventListener('click', () => {
      toggleFilter(filter.button, filter.list);
    });
  };

  /**
   * Add tag selected by user
   * @param {object} filter
   * @param {string} tagName
   */
  const addTag = (filter, tagName) => {
    if (tagsContainer.className === 'tags') {
      tagsContainer.className = 'tags--activate';
    }
    numberTags += 1;
    const filterName = filter.name === 'appliances' ? 'appliance' : filter.name;
    displayTag(tagName, tagsList, removeTag);
    tagsListElement.push({
      tagName: tagName,
    });
    toggleFilter(filter.button, filter.list);
    // TODO manage if more than one tag (partage de liste)
    const filteredRecipesByTag = filtersQueries(filteredRecipes, tagName, [
      filterName,
    ]);
    displayRecipes(filteredRecipesByTag);
  };

  /**
   * Remove tag when user click on tag cross
   * @param {string} tagName
   */
  const removeTag = (tagName) => {
    numberTags -= 1;
    const tagNameSelectedDOM = document.getElementById(
      `${tagName.split(' ').join('')}-selected`
    );
    tagNameSelectedDOM.remove();
    // TODO queries
    if (numberTags === 0) {
      tagsContainer.className = 'tags';
      displayRecipes(filteredRecipes);
    }
  };

  /**
   * Remove all tags when user search recipe from principal search bar
   * @param {array} tags
   */
  const removeAllTags = () => {
    if (tagsListElement.length > 0) {
      tagsListElement.forEach((tag) => {
        const tagNameSelectedDOM = document.getElementById(
          `${tag.tagName.split(' ').join('')}-selected`
        );
        tagNameSelectedDOM.remove();
      });
      tagsContainer.className = 'tags';
      // empty table
      tagsListElement.splice(0, tagsListElement.length);
      displayRecipes(originalRecipesList);
    }
  };

  // execute into index.js
  filters.forEach((filter) => {
    manageFilterList(filter);
  });
  const filterInput = document.getElementById('hero-search');
  const filterEmpty = document.getElementById(`empty-filter-hero-search`);
  filterInput.addEventListener('input', (event) => {
    let inputText = event.target.value;
    if (inputText.length === 1) {
      removeAllTags();
    }
  });
  return { updateFiltersDatas, removeAllTags };
};

export { manageFilters };
