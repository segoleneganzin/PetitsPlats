/*********************************************************************************
*
* This file manage vue of filter's element 
*
/*********************************************************************************/
/**
 * Display filter depend of type (ingredients, appliances, ustensiles)
 * @param {string} filterName
 * @returns {html}
 */
const displayFilter = (filterName) => {
  // manage text to display into button for users
  let filterNameFormatted;
  switch (filterName) {
    case 'ingredients':
      filterNameFormatted = 'Ingrédients';
      break;
    case 'appliances':
      filterNameFormatted = 'Appareils';
      break;
    case 'ustensils':
      filterNameFormatted = 'Ustensiles';
      break;
    default:
      filterNameFormatted = '';
      break;
  }

  const filterContainer = document.createElement('div');
  filterContainer.className = 'filter__container';

  const filter = `
    <button type="button" name="${filterNameFormatted}" class="filter__button flex-row" id="filter-${filterName}" aria-expanded="false"
          aria-controls="${filterName}-list" aria-haspopup="listbox">
      ${filterNameFormatted}
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="8" viewBox="0 0 15 8" fill="none" class="filter__arrow">
          <title>Ouvrir le filtre des ${filterNameFormatted}</title>
          <path d="M1 1L7.5 7L14 1" stroke="#1B1B1B" stroke-linecap="round" />
      </svg>
    </button>
    <div class="filter__list-container flex-col" id="${filterName}-list">
      <!-- input filter search -->
      <div class="filter__input-container input-container flex-row" >
        <label for="filter-search-${filterName}" class="visually-hidden">Rechercher par ${filterName}</label>
          <input id="filter-search-${filterName}" class="input" type="search">
          <div class='cross-svg'>
              <button id="empty-filter-${filterName}" class="empty-input-button">
                  <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='#7a7a7a'
                      viewBox='0 0 16 16'>
                      <title>Vider le filtre</title>
                      <path
                          d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
                  </svg>
              </button>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 28"
              fill="none" class="filter__magnifier-svg" aria-hidden="true">
              <circle cx="10" cy="10" r="9.5" stroke="#7a7a7a" />
              <line x1="18.3536" y1="18.6464" x2="27.3536" y2="27.6464" stroke="black" />
          </svg>
      </div>
      <ul class="filter__list-items flex-col" role="listbox"  id="${filterName}-list-items">
      <!-- list of ${filterName} -->
      <!-- generate into js file -->
      </ul>
    </div>
  `;
  filterContainer.innerHTML = filter;

  return filterContainer;
};

export { displayFilter };
