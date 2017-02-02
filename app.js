function Sheet (appendAt, rowCount, columnCount) {
  var currentColumnCount = columnCount;
  var currentRowCount = rowCount;

  var sheetDOM = document.createElement('div');
  sheetDOM.id = "sheet";
  var i;

  function makeCellAtPos (x, y) {
    var pos = x + '-' + y;
    var cell = document.createElement('input')
    cell.type = 'text';
    cell.value = pos;
    cell.id = "cell-" + pos;

    return cell;
  }

  function makeRowAtIndex (i) {
    var j;
    var rowDOM = document.createElement('div');
    rowDOM.className="row";
    rowDOM.id = "row-" + i;

    for (j = 0; j < currentColumnCount; j++) {
      var cell = makeCellAtPos(i, j);
      rowDOM.appendChild(cell);
    }

    return rowDOM;
  }

  for (i = 0; i < rowCount; i++) {
    sheetDOM.appendChild(makeRowAtIndex(i));
  }

  var container = document.querySelector(appendAt);
  container.appendChild(sheetDOM);

  this.addRow = function (index) {
    console.log('addRow at ' + index);
    var sheet = document.querySelector('#sheet');
    var rowAfter = document.querySelector('#row-' + (index+1));
    var rowDOM = makeRowAtIndex(index)
    sheet.insertBefore(rowDOM, rowAfter);

    currentRowCount += 1;
  }

  this.addColumn = function (index) {
    console.log('addColumn at ' + index);
    var sheet = document.querySelector('#sheet');

    for (i = 0; i < currentRowCount; i++) {
      var rowRef = document.querySelector('#row-' + i);
      var cellToInsertBefore = document.querySelector('#cell-' + i + '-' + index)
      var cellToInsert = makeCellAtPos(i, index);
      rowRef.insertBefore(cellToInsert, cellToInsertBefore);
    }

    currentColumnCount += 1;
  }

  this.removeRow = function (index) {
    console.log('removeRow at ' + index);
    var rowRef = document.querySelector('#row-' + index);
    rowRef.remove();

    currentRowCount -= 1;
  }

  this.removeColumn = function (index) {
    console.log('removeColumn at ' + index);
    for (i = 0; i < currentRowCount; i++) {
      var cellRef = document.querySelector('#cell-' + i + '-' + index);
      cellRef.remove();
    }

    currentColumnCount -= 1;
  }
}

var sheet = new Sheet('#container', 10, 5);

var addRowForm = document.querySelector('#addRowAtIndexForm');
addRowForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var atIndex = document.querySelector('#addRowAtIndex').value;
  sheet.addRow(Number(atIndex));
})

var removeRowForm = document.querySelector('#removeRowAtIndexForm');
removeRowForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var atIndex = document.querySelector('#removeRowAtIndex').value;
  sheet.removeRow(Number(atIndex));
})

var addColumnForm = document.querySelector('#addColumnAtIndexForm');
addColumnForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var atIndex = document.querySelector('#addColumnAtIndex').value;
  sheet.addColumn(Number(atIndex));
})

var removeColumnForm = document.querySelector('#removeColumnAtIndexForm');
removeColumnForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var atIndex = document.querySelector('#removeColumnAtIndex').value;
  sheet.removeColumn(Number(atIndex));
})


// adding a new row at index
// sheet.addRow(3)
// adding a new column at index
// sheet.addColumn(3)
// sort the column at index
// sheet.sortColumn(3);
