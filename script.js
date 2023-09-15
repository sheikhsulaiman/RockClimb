//v1.1
const gbtn = document.getElementById("generateBoard");
const vbtn = document.getElementById("visualizeBoard");
const rowInp = document.getElementById("row");
const columnInp = document.getElementById("column");
const boardArea = document.getElementById("boardArea");
const switchDiv = document.getElementById("switch");
const togglebtn = document.getElementById("switch-component");
let I = [];
let temp = [];
let T = [];
let A = [];

togglebtn.addEventListener("change", function () {
  if (togglebtn.checked) {
    I.forEach((i1, i) => {
      temp[i] = [];
      I.forEach((j1, j) => {
        const inp = I[i][j];
        if (inp) {
          temp[i].push(parseInt(inp.value));
          inp.value = A[i][j];
        }
      });
    });
  } else {
    I.forEach((i1, i) => {
      I.forEach((j1, j) => {
        if (I[i][j] && temp[i][j]) I[i][j].value = temp[i][j];
      });
    });
  }
});

gbtn.addEventListener("click", () => {
  while (boardArea.lastElementChild) {
    boardArea.removeChild(boardArea.lastElementChild);
  }

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
      input.value = y;
      if (i === row) {
        input.disabled = true;
        input.className =
          "w-20 h-20 text-center shrink rounded-sm border gap-1  border-slate-400 bg-transparent px-3 py-2.5 font-sans text-sm font-bold text-slate-700";
      } else {
        input.className =
          "w-20 h-20 text-center shrink rounded-sm border gap-1  border-purple-400 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-purple-700 outline outline-1";
      }
      divRow.appendChild(input);
    });
    boardArea.appendChild(divRow);
  });
});

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function visualizer() {
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
      await delay(700);
      cell.classList.add("bg-cyan-300");
      leftCell.classList.add("bg-purple-300");
      rightCell.classList.add("bg-purple-300");
      downCell.classList.add("bg-purple-300");
      await delay(700);
      let cellValue = parseInt(cell.value);
      cellValue += findLowestnumber(
        +leftCell.value,
        +downCell.value,
        +rightCell.value
      );
      cell.value = cellValue;
      leftCell.classList.remove("bg-purple-300");
      rightCell.classList.remove("bg-purple-300");
      downCell.classList.remove("bg-purple-300");
      cell.classList.remove("bg-cyan-300");
      cell.classList.remove("text-sm");
      cell.classList.add("text-xl");
    }
  }
  let [i1, j1] = findSmallestnumberIndex(I[0]);
  while (i1 < +rowInp.value) {
    while (T.length > 0) {
      T.pop();
    }
    let leftCell = I[i1 + 1][j1 - 1 < 0 ? j1 : j1 - 1];
    let downCell = I[i1 + 1][j1];
    let rightCell = I[i1 + 1][j1 + 1 > +columnInp.value - 1 ? j1 : j1 + 1];

    let fcell = I[i1++][j1];
    T.push(leftCell, downCell, rightCell);
    [i1, j1] = findSmallestnumberIndex([...T]);
    await delay(400);
    fcell.classList.add("bg-yellow-400");
    leftCell.classList.add("bg-purple-300");
    rightCell.classList.add("bg-purple-300");
    downCell.classList.add("bg-purple-300");
    await delay(400);
    leftCell.classList.remove("bg-purple-300");
    rightCell.classList.remove("bg-purple-300");
    downCell.classList.remove("bg-purple-300");
  }
  switchDiv.classList.remove("hidden");
  switchDiv.classList.add("inline-flex");
}

vbtn.addEventListener("click", () => {
  visualizer();
});

function findLowestnumber(num1, num2, num3) {
  if (num1 <= num2 && num1 <= num3) {
    return num1;
  } else if (num2 <= num1 && num2 <= num3) {
    return num2;
  } else {
    return num3;
  }
}

function findSmallestnumberIndex(arr) {
  if (arr.length === 0) {
    // Handle the case where the array is empty.
    return undefined;
  }

  let smallest = arr[0]; // Assume the first element is the smallest.

  for (let i = 0; i < arr.length; i++) {
    if (+arr[i].value < +smallest.value) {
      smallest = arr[i]; // Update the smallest if we find a smaller cellber.
    }
  }

  return stringToArray(smallest.id);
}

function stringToArray(inputString) {
  const intArray = [];

  for (let i = 0; i < inputString.length; i++) {
    intArray.push(parseInt(inputString[i]));
  }

  return intArray;
}
