const gbtn = document.getElementById("generateBoard");
const vbtn = document.getElementById("visualizeBoard");
const rowInp = document.getElementById("row");
const columnInp = document.getElementById("column");
const boardArea = document.getElementById("boardArea");
//const boardGrid = document.createElement("div");
let I = [];
// boardGrid.className = "grid gap-1 mx-auto";
gbtn.addEventListener("click", () => {
  while (boardArea.lastElementChild) {
    boardArea.removeChild(boardArea.lastElementChild);
  }
  let A = [];

  let row = +rowInp.value;
  let col = +columnInp.value;

  // Loop to initialize 2D array elements.
  for (let i = 0; i <= row; i++) {
    A[i] = [];
    for (let j = 0; j < col; j++) {
      if (i === row) {
        A[i][j] = 0;
      } else {
        A[i][j] = Math.floor(Math.random() * 8) + 2;
      }
    }
  }

  //console.log(A[0][1]);
  //boardArea.className = `grid grid-cols-${+col} gap-1 `;
  A.forEach((x, i) => {
    const divRow = document.createElement("div");
    divRow.className = "flex shrink";
    I[i] = [];
    x.forEach((y, j) => {
      const input = document.createElement("input");
      I[i][j] = input;
      input.id = `${i}${j}`;
      input.type = "number";
      input.min = "0";
      // input.value = y;
      input.value = `${i}${j}`;
      if (i === row) {
        input.disabled = true;
        input.className =
          "w-20 h-20 text-center shrink rounded-sm border gap-1  border-slate-400 bg-transparent px-3 py-2.5 font-sans text-sm font-bold text-slate-700";
      } else {
        input.className =
          "w-20 h-20 text-center shrink rounded-sm border gap-1  border-purple-400 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-purple-700 outline outline-1";
      }
      //input.className =
      //"shrink w-6 rounded-sm border gap-1  border-purple-400 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-purple-700 outline outline-1 focus:border-purple-500 focus:outline-0 disabled:border-0 disabled:bg-purple-50";
      divRow.appendChild(input);
    });
    boardArea.appendChild(divRow);
  });
});

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function visualizer() {
  //console.log(I[0][0]);
  for (let i = +rowInp.value - 1; i >= 0; i--) {
    for (let j = 0; j < +columnInp.value; j++) {
      const cell = I[i][j];

      let leftCell = I[i + 1][j - 1 < 0 ? j : j - 1];
      let downCell = I[i + 1][j];
      let rightCell = I[i + 1][j + 1 > +columnInp.value - 1 ? j : j + 1];

      // ****** IF DOES NOT GENERATE A LAND ROW THEN USE THIS CODE
      // let leftCell =
      //   I[i + 1 > +rowInp.value - 1 ? i : i + 1][j - 1 < 0 ? j : j - 1];
      // let downCell = I[i + 1 > +rowInp.value - 1 ? i : i + 1][j];
      // let rightCell =
      //   I[i + 1 > +rowInp.value - 1 ? i : i + 1][
      //     j + 1 > +columnInp.value - 1 ? j : j + 1
      //   ];
      await delay(1000);
      cell.classList.add("bg-blue-300");
      leftCell.classList.add("bg-pink-300");
      rightCell.classList.add("bg-pink-300");
      downCell.classList.add("bg-pink-300");
      await delay(1000);
      let cellValue = parseInt(cell.value);
      cellValue += findLowestNumber(
        +leftCell.value,
        +downCell.value,
        +rightCell.value
      );
      cell.value = cellValue;
      leftCell.classList.remove("bg-pink-300");
      rightCell.classList.remove("bg-pink-300");
      downCell.classList.remove("bg-pink-300");
      cell.classList.remove("bg-blue-300");
      cell.classList.remove("text-sm");
      cell.classList.add("text-xl");
    }
  }
  for (let i = 0; i < +rowInp.value; i++) {
    for (let j = 0; i < +columnInp.value; j++) {}
  }
}

vbtn.addEventListener("click", () => {
  visualizer();
});

function findLowestNumber(num1, num2, num3) {
  if (num1 <= num2 && num1 <= num3) {
    return num1;
  } else if (num2 <= num1 && num2 <= num3) {
    return num2;
  } else {
    return num3;
  }
}

function findSmallestNumberIndex(arr) {
  if (arr.length === 0) {
    // Handle the case where the array is empty.
    return undefined;
  }

  let smallest = arr[0]; // Assume the first element is the smallest.

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] < smallest) {
      smallest = arr[i]; // Update the smallest if we find a smaller number.
    }
  }

  return i - 1;
}
