const manageTagsInput = (filterId, filterName) => {
  // work on two list (one for search and other for tag)
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

export { manageTagsInput };
