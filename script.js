const puzzle = [
  [5,3,0,0,7,0,0,0,0],
  [6,0,0,1,9,5,0,0,0],
  [0,9,8,0,0,0,0,6,0],

  [8,0,0,0,6,0,0,0,3],
  [4,0,0,8,0,3,0,0,1],
  [7,0,0,0,2,0,0,0,6],

  [0,6,0,0,0,0,2,8,0],
  [0,0,0,4,1,9,0,0,5],
  [0,0,0,0,8,0,0,7,9]
];

const table = document.getElementById("sudoku");

function createBoard() {
  table.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 9; j++) {
      const cell = document.createElement("td");
      const input = document.createElement("input");
      input.maxLength = 1;

      if (puzzle[i][j] !== 0) {
        input.value = puzzle[i][j];
        input.disabled = true;
        input.classList.add("fixed");
      }

      input.oninput = () => {
        input.value = input.value.replace(/[^1-9]/g, "");
        checkCell(i, j, input);
      };

      cell.appendChild(input);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}

function checkCell(row, col, input) {
  input.classList.remove("error");
  const value = input.value;
  if (value === "") return;

  const rows = document.querySelectorAll("tr");

  // Satır kontrol
  for (let j = 0; j < 9; j++) {
    if (j !== col) {
      const other = rows[row].children[j].firstChild;
      if (other.value === value) {
        input.classList.add("error");
        return;
      }
    }
  }

  // Sütun kontrol
  for (let i = 0; i < 9; i++) {
    if (i !== row) {
      const other = rows[i].children[col].firstChild;
      if (other.value === value) {
        input.classList.add("error");
        return;
      }
    }
  }

  // 3x3 kutu kontrol
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;

  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (i !== row || j !== col) {
        const other = rows[i].children[j].firstChild;
        if (other.value === value) {
          input.classList.add("error");
          return;
        }
      }
    }
  }
}

function resetSudoku() {
  createBoard();
}

createBoard();
