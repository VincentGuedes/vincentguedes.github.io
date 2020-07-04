//Sets important constants and variables

const container = document.getElementById("container");
let rows = document.getElementsByClassName("gridRow");
let cells = document.getElementsByClassName("cell");
let grid, gameTimer, counter = 0;



defaultGrid();

//Creates a default grid sized 16x16 
function defaultGrid() {
    grid = createGameGrid(40, 70);
}

function createGameGrid(nbRows, nbColumns) {
    makeRows(nbRows);
    makeColumns(nbColumns);
    var arr = [];
    for (var i = 0; i < nbRows; i++) {
        arr[i] = new Array(nbColumns);
    }
    return arr;
}

//Takes (rows, columns) input and makes a grid
function makeRows(rowNum) {
    //Creates rows
    for (r = 0; r < rowNum; r++) {
        let row = document.createElement("div");
        container.appendChild(row).className = "gridRow";
    };
};

//Creates columns
function makeColumns(cellNum) {
    for (i = 0; i < rows.length; i++) {
        for (j = 0; j < cellNum; j++) {
            let newCell = document.createElement("div");
            newCell.id = `cell-${i}-${j}`;
            newCell.onclick = function (i, j) { return function () { return toggleCell(i, j) }; }(i, j);
            rows[i].appendChild(newCell).className = "cell";
        };
    };
};

function toggleCell(rowNum, colNum) {
    console.log("rowNum", rowNum)
    console.log("colNum", colNum)
    grid[rowNum][colNum] = grid[rowNum][colNum] ? 0 : 1; 
    document.getElementById(`cell-${rowNum}-${colNum}`).className = grid[rowNum][colNum] ? "cell alive" : "cell";
}

function playGame() {
    console.log("launched game");
    gameTimer = setInterval(updateGrid, 500);
}

function pauseGame() {
    console.log("pause game");
    clearInterval(gameTimer);
}

function updateGrid() {

    let gridCopy = grid.map(function(arr) {
        return arr.slice();
    });

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            // update rule: alive => dead; dead => alive
            // grid[i][j] = (grid[i] && grid[i][j]) ? 0 : 1;
            grid[i][j] = Math.floor(Math.random()*2);
            document.getElementById(`cell-${i}-${j}`).className = grid[i][j] ? "cell alive" : "cell";
        }
    }
}
