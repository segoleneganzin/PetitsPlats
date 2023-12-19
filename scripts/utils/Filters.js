/*********************************************************************************
*
* This file manage filters
*
/*********************************************************************************/
import { displayRecipes } from '../pages/Index.js';
import {
  filtersQueries,
  getAllAppliances,
  getAllIngredients,
  getAllUstensils,
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
  let filterIngredientsDatas = getAllIngredients(recipes);
  let filterAppliancesDatas = getAllAppliances(recipes);
  let filterUstensilsDatas = getAllUstensils(recipes);
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
  // tags (selected filters)
  const tagsContainer = document.getElementById('tags');
  const tagsList = document.querySelector('.tags__list');
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
  const manageFilterList = (listButton, listDOM, filterDatas, filterName) => {
    const filterList = document.getElementById(`${filterName}-list-items`);
    filterDatas.forEach((tag) => {
      const listElement = document.createElement('li');
      const filterButton = document.createElement('button');
      filterButton.setAttribute('role', 'option');
      filterButton.setAttribute('id', tag.split(' ').join('')); // remove space into filter name
      filterButton.textContent = tag;

      listElement.appendChild(filterButton);
      filterList.appendChild(listElement);

      filterButton.addEventListener('click', () => {
        addTag(listButton, listDOM, tag);
      });
    });
  };

  /**
   * Manage input when user typing (display cross and recipes corresponded (only after 3 characters typing))
   * @param {string} filterId
   * @param {string} filterName
   */
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
        displayRecipes(recipes);
      }
      // TODO filtered here
      const test = [
        {
          id: 1,
          image: 'Recette01.jpg',
          name: 'Limonade de Coco',
          servings: 1,
          ingredients: [
            {
              ingredient: 'Lait de coco',
              quantity: 400,
              unit: 'ml',
            },
            {
              ingredient: 'Jus de citron',
              quantity: 2,
            },
            {
              ingredient: 'Crème de coco',
              quantity: 2,
              unit: 'cuillères à soupe',
            },
            {
              ingredient: 'Sucre',
              quantity: 30,
              unit: 'grammes',
            },
            {
              ingredient: 'Glaçons',
            },
          ],
          time: 10,
          description:
            "Mettre les glaçons à votre goût dans le blender, ajouter le lait, la crème de coco, le jus de 2 citrons et le sucre. Mixer jusqu'à avoir la consistence désirée.",
          appliance: 'Blender',
          ustensils: ['cuillère à Soupe', 'verres', 'presse citron'],
        },
        {
          id: 2,
          image: 'Recette02.jpg',
          name: 'Poisson Cru à la tahitienne',
          servings: 2,
          ingredients: [
            {
              ingredient: 'Thon Rouge (ou blanc)',
              quantity: 200,
              unit: 'grammes',
            },
            {
              ingredient: 'Concombre',
              quantity: 1,
            },
            {
              ingredient: 'Tomate',
              quantity: 2,
            },
            {
              ingredient: 'Carotte',
              quantity: 1,
            },
            {
              ingredient: 'Citron Vert',
              quantity: 5,
            },
            {
              ingredient: 'Lait de Coco',
              quantity: 100,
              unit: 'ml',
            },
          ],
          time: 60,
          description:
            'Découper le thon en dés, mettre dans un plat et recouvrir de jus de citron vert (mieux vaut prendre un plat large et peu profond). Laisser reposer au réfrigérateur au moins 2 heures. (Si possible faites-le le soir pour le lendemain. Après avoir laissé mariner le poisson, coupez le concombre en fines rondelles sans la peau et les tomates en prenant soin de retirer les pépins. Rayer la carotte. Ajouter les légumes au poissons avec le citron cette fois ci dans un Saladier. Ajouter le lait de coco. Pour ajouter un peu plus de saveur vous pouvez ajouter 1 à 2 cuillères à soupe de Crème de coco',
          appliance: 'Saladier',
          ustensils: ['presse citron'],
        },
        {
          id: 3,
          image: 'Recette03.jpg',
          name: 'Poulet coco réunionnais',
          servings: 4,
          ingredients: [
            {
              ingredient: 'Poulet',
              quantity: 1,
            },
            {
              ingredient: 'Lait de coco',
              quantity: 400,
              unit: 'ml',
            },
            {
              ingredient: 'Coulis de tomate',
              quantity: 25,
              unit: 'cl',
            },
            {
              ingredient: 'Oignon',
              quantity: 1,
            },
            {
              ingredient: 'Poivron rouge',
              quantity: 1,
            },
            {
              ingredient: "Huile d'olive",
              quantity: 1,
              unit: 'cuillères à soupe',
            },
          ],
          time: 80,
          description:
            "Découper le poulet en morceaux, les faire dorer dans une cocotte avec de l'huile d'olive. Salez et poivrez. Une fois doré, laisser cuire en ajoutant de l'eau. Au bout de 30 minutes, ajouter le coulis de tomate, le lait de coco ainsi que le poivron et l'oignon découpés en morceaux. Laisser cuisiner 30 minutes de plus. Servir avec du riz",
          appliance: 'Cocotte',
          ustensils: ['couteau'],
        },
      ];
      if (inputText.length >= 3) {
        const testFilter = filtersQueries(test, inputText, ['name']);
        displayRecipes(testFilter);
      }
    });

    // empty input on cross click
    filterEmpty.addEventListener('click', () => {
      filterInput.value = '';
      filterEmpty.classList.remove('empty-input-button--typing');
      displayRecipes(recipes);
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
    tagCloseButton.addEventListener('click', () => {
      removeTag(listButton, listDOM, tagName);
    });

    tag.appendChild(tagContent);
    tag.appendChild(tagCloseButton);

    tagsList.appendChild(tag);

    toggleFilter(listButton, listDOM);
    // TODO display corresponded recipes (import function with vue)
    // TODO delete filter already selected into list
  };

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
    if (numberTags === 0) {
      tagsContainer.className = 'tags';
    }
    toggleFilter(listButton, listDOM);
  };

  // execute on function call into index.js
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
