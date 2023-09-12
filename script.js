const gbtn = document.getElementById("generateBoard");
const rowInp = document.getElementById("row");
const columnInp = document.getElementById("column");
const boardArea = document.getElementById("boardArea");
//const boardGrid = document.createElement("div");

// boardGrid.className = "grid gap-1 mx-auto";
gbtn.addEventListener("click", () => {
  while (boardArea.lastElementChild) {
    boardArea.removeChild(boardArea.lastElementChild);
  }
  let A = [];
  let row = +rowInp.value;
  let col = +columnInp.value;

  // Loop to initialize 2D array elements.
  for (let i = 0; i < row; i++) {
    A[i] = [];
    for (let j = 0; j < col; j++) {
      A[i][j] = Math.floor(Math.random() * 10);
    }
  }

  console.log(A);
  //boardArea.className = `grid grid-cols-${+col} gap-1 `;
  A.map((x) => {
    const divRow = document.createElement("div");
    divRow.className = "flex shrink";
    x.map((y) => {
      const input = document.createElement("input");
      input.type = "number";
      input.min = "0";
      input.value = y;
      input.className =
        "w-14 h-14 text-center shrink rounded-sm border gap-1  border-purple-400 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-purple-700 outline outline-1";
      //input.className =
      //"shrink w-6 rounded-sm border gap-1  border-purple-400 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-purple-700 outline outline-1 focus:border-purple-500 focus:outline-0 disabled:border-0 disabled:bg-purple-50";
      divRow.appendChild(input);
    });
    boardArea.appendChild(divRow);
  });
});
