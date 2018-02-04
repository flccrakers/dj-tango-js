/**
 * Get the table of size for each column
 * @returns {*[] | *}
 */
export function getSizedRows(rowsTemplate, containerWidth) {
  let ret, autoSize = 0;
  ret = rowsTemplate.map(a => Object.assign({}, a));
  if (!isNaN(containerWidth)) {
    autoSize = getAutoSize(rowsTemplate, containerWidth);
  }
  ret.forEach((elmt, index, table) => {
    if (elmt.size === 'auto' || elmt.size === 0) {
      table[index].size = autoSize
    }
  });
  return ret;
}

/**
 * Calculate the size of columns labelled 'auto'
 * @param containerSize size of the container in which the table is in (a div for example)
 * @returns {number} the size of column labeled 'auto'
 */
function getAutoSize(rowsTemplate, containerSize) {
  let autoNb = 0;
  let totalSize = 0;
  let margin = rowsTemplate.length * 4 + 30;
  rowsTemplate.forEach(element => {
    // console.log(element);
    if (element.size === 'auto' || element.size === 0) {
      autoNb += 1;
    }
    else {
      totalSize += element.size
    }
  });
  return (containerSize - totalSize - margin) / autoNb;
}