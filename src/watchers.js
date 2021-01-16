const initView = (state, tableElement) => {
  const addedFragment = new DocumentFragment();
  tableElement.innerHTML = '';

  const renderTableRow = (dataRow) => {
    const {
      isActive,
      balance,
      name,
      email,
      id,
      children,
      showChildren,
    } = dataRow;
    const rowElement = document.createElement('tr');
    rowElement.id = id;
    rowElement.classList = isActive ? '' : 'del';

    if (state.viewMode === 'onlyActive' && !isActive) {
      return;
    }

    const deepCell = document.createElement('td');
    if (children.length > 0) {
      const deepButton = document.createElement('a');
      deepButton.href = '#';
      deepButton.textContent = showChildren ? '-' : '+';
      deepCell.append(deepButton);

      deepButton.addEventListener('click', (e) => {
        e.preventDefault();
        dataRow.showChildren = !showChildren;
        initView(state, tableElement);
      });
    }

    const nameCell = document.createElement('td');
    nameCell.textContent = name;

    const emailCell = document.createElement('td');
    emailCell.textContent = email;

    const balanceCell = document.createElement('td');
    balanceCell.textContent = balance;

    rowElement.append(deepCell, nameCell, emailCell, balanceCell);
    addedFragment.append(rowElement);

    if (showChildren) {
      children.forEach(renderTableRow);
    }
  };

  const { dataTree } = state;
  dataTree.forEach(renderTableRow);
  tableElement.append(addedFragment);
};

export default initView;
