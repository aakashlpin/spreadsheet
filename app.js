function emptyNodeById (id) {
  var node = document.getElementById(id);
  if (!node) {
    return;
  }
  while (node.hasChildNodes()) {
    node.removeChild(node.firstChild);
  }
}

function Sheet (appendAt, rowCount, columnCount) {
  var currentColumnCount = columnCount;
  var currentRowCount = rowCount;
  var SHEET_ID = "sheet";
  var SHEET_ID_SELECTOR = '#sheet';
  var sheetElement = document.createElement('div');
  sheetElement.id = SHEET_ID;
  var i;

  function initializeData () {
    var arr = new Array(rowCount);
    for (var i = 0; i< rowCount ; i++) {
      arr[i] = new Array(columnCount);
    }

    return arr;
  }

  var sheetData = initializeData();

  function getCellId (x, y) {
    return 'cell-' + x + '-' + y;
  }

  function getRowId (x) {
    return "row-" + x;
  }

  function makeCellAtPos (x, y) {
    var pos = x + '-' + y;
    var cell = document.createElement('input')
    cell.type = 'text';
    cell.value = sheetData[x][y] ? sheetData[x][y] : '';
    cell.id = getCellId(x, y);

    return cell;
  }

  function makeRowAtIndex (i) {
    var j;
    var rowDOM = document.createElement('div');
    rowDOM.className="row";
    rowDOM.id = getRowId(i);

    for (j = 0; j < currentColumnCount; j++) {
      var cell = makeCellAtPos(i, j);
      rowDOM.appendChild(cell);
    }

    return rowDOM;
  }

  function populateSheetElement () {
    for (i = 0; i < currentRowCount; i++) {
      sheetElement.appendChild(makeRowAtIndex(i));
    }
  }

  populateSheetElement();

  var container = document.querySelector(appendAt);
  container.appendChild(sheetElement);

  document.querySelector(SHEET_ID_SELECTOR).addEventListener('change', function(e) {
    var target = e.target;
    var pos = target.id.split('-');
    var posX = Number(pos[1]);
    var posY = Number(pos[2]);
    var value = target.value;

    sheetData[posX][posY] = !isNaN(value) ? Number(value) : value;

    console.log('sheet data written at ' + posX + ', ' + posY);
  })

  function regenerateSheet () {
    emptyNodeById('sheet');
    populateSheetElement();
  }

  this.addRow = function (index) {
    console.log('addRow at ' + index);
    currentRowCount += 1;

    // insert to array
    // and regenerateSheet
    sheetData.splice(index, 0, new Array(currentColumnCount));
    regenerateSheet();
  }

  this.addColumn = function (index) {
    console.log('addColumn at ' + index);
    for (i = 0; i < currentRowCount; i++) {
      // init an empty value in every row at index
      sheetData[i].splice(index, 0, '');
    }

    currentColumnCount += 1;

    // and regenerateSheet?
    //
    regenerateSheet();
  }

  this.removeRow = function (index) {
    console.log('removeRow at ' + index);
    currentRowCount -= 1;
    sheetData.splice(index, 1);
    regenerateSheet();
  }

  this.removeColumn = function (index) {
    console.log('removeColumn at ' + index);
    for (i = 0; i < currentRowCount; i++) {
      sheetData[i].splice(index, 1);
    }

    currentColumnCount -= 1;
    regenerateSheet();
  }

  this.sortColumn = function (index) {
    /**
     * 20 XSY      10 ABC
     * 10 ABC  =>  20 XSY
     * 30 SUDO     30 SUDO
     */
    console.log('sortColumn at ' + index);

    sheetData.sort(function (a, b) {
      if (a[index] === b[index]) {
        return 0;
      }
      return (a[index] < b[index]) ? -1 : 1;
    });

    regenerateSheet();
  }
}

var sheet = new Sheet('#container', 3, 2);

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

var sortColumnForm = document.querySelector('#sortColumnAtIndexForm');
sortColumnForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var atIndex = document.querySelector('#sortColumnAtIndex').value;
  sheet.sortColumn(Number(atIndex));
})


// adding a new row at index
// sheet.addRow(3)
// adding a new column at index
// sheet.addColumn(3)
// sort the column at index
// sheet.sortColumn(3);
