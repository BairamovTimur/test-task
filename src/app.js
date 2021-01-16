import initView from './watchers';
import getData from './data';

const getDataTree = (data) => {
  const iter = (currentData, parent = undefined) => {
    const parentId = parent === undefined ? 0 : parent.id;
    return currentData.filter((element) => element.parentId === parentId)
      .map((elem) => ({ ...elem, showChildren: false, children: iter(currentData, elem) }));
  };

  return iter(data);
};

export default () => {
  const data = getData();
  const dataTree = getDataTree(data);

  const state = {
    viewMode: 'all',
    dataTree,
  };
  const tableElement = document.getElementById('root');
  const checkboxElement = document.getElementById('mainCheckbox');

  checkboxElement.addEventListener('click', () => {
    state.viewMode = state.viewMode === 'all' ? 'onlyActive' : 'all';
    initView(state, tableElement);
  });

  initView(state, tableElement);
};
