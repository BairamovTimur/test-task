/* eslint-disable functional/no-let */
import initView from './watchers';
import fileData from './default.json';

const getDataTree = (data) => {
  const iter = (currentData, parent = undefined) => {
    const parentId = parent === undefined ? 0 : parent.id;
    return currentData.filter((element) => element.parentId === parentId)
      .map((elem) => ({ ...elem, showChildren: false, children: iter(currentData, elem) }));
  };

  return iter(data);
};

export default () => {
  const dataTree = getDataTree(fileData);

  const state = {
    viewMode: 'all',
    dataTree,
  };
  const tableElement = document.getElementById('root');
  const checkboxElement = document.getElementById('mainCheckbox');

  checkboxElement.addEventListener('click', () => {
    const { viewMode } = state;
    state.viewMode = viewMode === 'all' ? 'onlyActive' : 'all';
    initView(state, tableElement);
  });

  initView(state, tableElement);
};
