import { sanitize } from './Helpers.js';

const manageTagsInput = (filter, manageFilterList) => {
  const originalFilterDatas = filter.datas;
  const filterInput = document.getElementById(`filter-search-${filter.name}`);
  const filterEmpty = document.getElementById(`empty-filter-${filter.name}`);
  filterInput.value = '';
  filterEmpty.classList.remove('empty-input-button--typing');
  // typing event
  filterInput.addEventListener('input', (event) => {
    let inputText = event.target.value;
    inputText = sanitize(inputText);
    filterEmpty.classList.add('empty-input-button--typing');
    if (inputText.length === 0) {
      filterEmpty.classList.remove('empty-input-button--typing');
    }
    if (inputText.length > 0) {
      filter.datas = originalFilterDatas.filter((word) =>
        word.toLowerCase().includes(inputText.toLowerCase())
      );
      manageFilterList(filter);
    }
  });

  // empty input on cross click
  filterEmpty.addEventListener('click', () => {
    filterInput.value = '';
    filterEmpty.classList.remove('empty-input-button--typing');
    filter.datas = originalFilterDatas;
    manageFilterList(filter);
  });
};

export { manageTagsInput };
