/*********************************************************************************
*
* This file manage filters
*
/*********************************************************************************/
import { displayRecipes } from '../pages/Index.js';
import {
  filtersQueries,
  getAppliances,
  getIngredients,
  getUstensils,
} from './FiltersQueries.js';
/**
 * manage click on button filter and what to display
 */

const manageFilters = (recipes) => {
  // filters
  const filterIngredientsButton = document.getElementById('filter-ingredients');
  const filterAppliancesButton = document.getElementById('filter-appliances');
  const filterUstensilsButton = document.getElementById('filter-ustensils');
  const filterIngredientsList = document.getElementById('ingredients-list');
  const filterAppliancesList = document.getElementById('appliances-list');
  const filterUstensilsList = document.getElementById('ustensils-list');
  let filterIngredientsDatas = getIngredients(recipes);
  let filterAppliancesDatas = getAppliances(recipes);
  let filterUstensilsDatas = getUstensils(recipes);
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
  let filteredRecipes;
  // tags (selected filters)
  const tagsContainer = document.getElementById('tags');
  const tagsList = document.querySelector('.tags__list');
  const tagsListElement = [];
  let numberTags = 0;

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
   * Reusable for filter with what user want (query on filterDatas)
   * @param {html} listButton
   * @param {html} listDOM
   * @param {array} filterDatas
   * @param {string} filterName
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
        addTag(filter.button, filter.list, tag);
        const filterName =
          filter.name === 'appliances' ? 'appliance' : filter.name;
        filteredRecipes === undefined
          ? (filteredRecipes = filtersQueries(recipes, tag, [filterName]))
          : (filteredRecipes = filtersQueries(filteredRecipes, tag, [
              filterName,
            ]));
        displayRecipes(filteredRecipes);
      });
    });
  };

  /**
   * Manage datas to display into advanced filters
   * when user typing
   * @param {array} recipes
   */
  const updateFiltersDatas = (recipes) => {
    const newFiltersDatas = [
      getIngredients(recipes),
      getAppliances(recipes),
      getUstensils(recipes),
    ];
    filters.forEach((filter, index) => {
      filter.datas = newFiltersDatas[index];
      manageFilterList(filter);
    });
  };

  /**
   * Manage input when user typing (display cross and recipes corresponded (only after 3 characters typing))
   * @param {string} filterId
   * @param {string} filterName
   */
  const manageSearchInput = (filterId, filterName) => {
    const filterInput = document.getElementById(filterId);
    const filterEmpty = document.getElementById(`empty-filter-${filterName}`);
    // typing event
    filterInput.addEventListener('input', (event) => {
      let inputText = event.target.value;
      // console.log(inputText);
      filterEmpty.classList.add('empty-input-button--typing');
      if (inputText.length === 0) {
        filterEmpty.classList.remove('empty-input-button--typing');
      }
      if (inputText.length < 3) {
        displayRecipes(recipes);
      }
      if (inputText.length >= 3) {
        filteredRecipes = recipes;
        const filterBy = ['name', 'ingredients', 'description'];
        // removeAllTags();
        filteredRecipes = filtersQueries(filteredRecipes, inputText, filterBy);
        displayRecipes(filteredRecipes);
        updateFiltersDatas(filteredRecipes);
      }
    });

    // empty input on cross click
    filterEmpty.addEventListener('click', () => {
      filterInput.value = '';
      filteredRecipes = recipes;
      filterEmpty.classList.remove('empty-input-button--typing');
      displayRecipes(recipes);
      // manage advanced filters
      updateFiltersDatas(recipes);
    });
  };

  const manageFilterInput = (filterId, filterName) => {
    const filterInput = document.getElementById(filterId);
    const filterEmpty = document.getElementById(`empty-filter-${filterName}`);
    // typing event
    filterInput.addEventListener('input', (event) => {
      let inputText = event.target.value;
      // console.log(inputText);
      filterEmpty.classList.add('empty-input-button--typing');
      if (inputText.length === 0) {
        filterEmpty.classList.remove('empty-input-button--typing');
      }
      if (inputText.length < 3) {
        // displayRecipes(recipes);
        // TODO display filter list
      }
      if (inputText.length >= 3) {
        switch (filterName) {
          case 'ingredients':
            // ingredients.datas = ...;
            // manageFilterList(ingredients);
            break;
          case 'appliances':
            // filter list of appliances (appliances.datas)
            break;
          case 'ustensils':
            // TODO
            // filter list of ustensils (ustensils.datas)
            break;
          default:
            console.log('no datas to filtered');
            break;
        }
        // filteredList = filtersQueries(filteredRecipes, inputText, filterBy);
        // displayRecipes(filteredRecipes);
        // updateFiltersDatas(filteredRecipes);
      }
    });

    // empty input on cross click
    filterEmpty.addEventListener('click', () => {
      filterInput.value = '';
      filteredRecipes = recipes;
      filterEmpty.classList.remove('empty-input-button--typing');
      displayRecipes(recipes);
      // manage advanced filters
      updateFiltersDatas(recipes);
    });
  };

  /**
   * Add tag selected by user
   * @param {html} listButton
   * @param {html} listDOM
   * @param {string} tagName
   */
  const addTag = (listButton, listDOM, tagName) => {
    if (tagsContainer.className === 'tags') {
      tagsContainer.className = 'tags--activate';
    }
    numberTags += 1;
    const tag = document.createElement('li');
    tag.className = 'flex-row';
    tag.setAttribute('id', tagName.split(' ').join('') + '-selected');

    const tagContent = document.createElement('span');
    tagContent.textContent = tagName;

    const tagCloseButton = document.createElement('button');
    tagCloseButton.innerHTML = `<svg
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
    tagsListElement.push({
      tagName: tagName,
    });
    tagCloseButton.addEventListener('click', () => {
      removeTag(listButton, listDOM, tagName);
    });

    tag.appendChild(tagContent);
    tag.appendChild(tagCloseButton);

    tagsList.appendChild(tag);

    toggleFilter(listButton, listDOM);
  };

  // const manageInputTag = () => {
  //   console.log('coucou');
  // };

  /**
   * Remove tag when user click on tag cross
   * @param {html} listButton
   * @param {html} listDOM
   * @param {string} tagName
   */
  const removeTag = (listButton, listDOM, tagName) => {
    numberTags -= 1;
    const tagNameSelectedDOM = document.getElementById(
      `${tagName.split(' ').join('')}-selected`
    );
    tagNameSelectedDOM.remove();
    // TODO queries
    if (numberTags === 0) {
      tagsContainer.className = 'tags';
      // TODO display all recipes
      filteredRecipes = recipes;
      displayRecipes(recipes);
    }
    toggleFilter(listButton, listDOM);
  };

  /**
   * Remove all tags when user search recipe from principal search bar
   * @param {array} tags
   */
  const removeAllTags = () => {
    tagsListElement.forEach((tag) => {
      const tagNameSelectedDOM = document.getElementById(
        `${tag.tagName.split(' ').join('')}-selected`
      );
      tagNameSelectedDOM.remove();
    });
    tagsContainer.className = 'tags';
  };

  // execute on function call into index.js
  manageSearchInput('hero-search', 'hero-search');

  filters.forEach((filter) => {
    manageFilterList(filter);
    filter.button.addEventListener('click', () => {
      toggleFilter(filter.button, filter.list);
      manageSearchInput(`filter-search-${filter.name}`, filter.name);
    });
  });
};

export { manageFilters };
