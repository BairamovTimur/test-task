import initView from './watchers';
import fileData from './default.json';

const getDataTree = (data) => {
  const list = [...data];
  const map = {};
  const roots = [];

  list.forEach((element, index) => {
    map[element.id] = index;
    element.children = [];
  });

  list.forEach((element) => {
    if (element.parentId !== 0) {
      list[map[element.parentId]].children.push(element);
    } else {
      roots.push(element);
    }
  });

  return roots;
};

export default () => {
  const data = fileData.map((element) => ({ ...element, showChildren: false }));
  const dataTree = getDataTree(data);

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
