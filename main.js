'use strict';

let main = document.getElementById("main")


function ArrayCreator(width, height, mineCount) {
    this.col = width;
    this.row = height;
    this.mineCount = mineCount;
    // this.rowLength = Array(10).join().split(",").map(() => 0);
    //try to use Array(10).fill.map like below
    // this.array = Array(height).fill().map(Array(width).fill(0))
    this.boardArray = new Array(height).join().split(",").map(() =>
        new Array(width).join().split(",").map(() => 0));
}

ArrayCreator.prototype.mineLocations = function () {
    this.currentMineCount = 0
    do {
        this.randomRow = Math.floor(Math.random() * (this.row));
        this.randomCol = Math.floor(Math.random() * (this.col));
        if (this.boardArray[this.randomRow][this.randomCol] === 0) {
            this.boardArray[this.randomRow][this.randomCol] = "*";
            this.currentMineCount += 1;
        }
    } while (this.currentMineCount < this.mineCount)

    return this;
}

ArrayCreator.prototype.countOfMines = function () {


    this.boardArray.forEach((row, rowIndex) => {
        this.boardArray[rowIndex].forEach((col, colIndex) => {

            if (this.boardArray[rowIndex][colIndex] === "*") {

                //adds+1 to next row (row below)
                if (this.boardArray[rowIndex + 1] && this.boardArray[rowIndex + 1][colIndex] != "*") {
                    this.boardArray[rowIndex + 1][colIndex] += 1;
                }
                //adds+1 to row above 
                if (this.boardArray[rowIndex - 1] &&
                    this.boardArray[rowIndex - 1][colIndex] != "*") {
                    this.boardArray[rowIndex - 1][colIndex] += 1;
                }
                // //adds +1 to right cell
                if (this.boardArray[rowIndex][colIndex + 1] != "*" &&
                    (this.boardArray[rowIndex][colIndex + 1] || this.boardArray[rowIndex][colIndex + 1] == 0)) {
                    this.boardArray[rowIndex][colIndex + 1] += 1;
                }
                //adds +1 to left cell
                if (this.boardArray[rowIndex][colIndex - 1] != "*" &&
                    (this.boardArray[rowIndex][colIndex - 1] || this.boardArray[rowIndex][colIndex - 1] == 0)) {
                    this.boardArray[rowIndex][colIndex - 1] += 1;
                }
                //adds +1 diag up-left
                if (this.boardArray[rowIndex - 1]
                    && (this.boardArray[rowIndex][colIndex - 1] || this.boardArray[rowIndex][colIndex - 1] == 0) &&
                    this.boardArray[rowIndex - 1][colIndex - 1] != "*") {
                    this.boardArray[rowIndex - 1][colIndex - 1] += 1
                }
                //adds +1 to diag up-right
                if (this.boardArray[rowIndex - 1]
                    && (this.boardArray[rowIndex][colIndex + 1] || this.boardArray[rowIndex][colIndex + 1] == 0) &&
                    this.boardArray[rowIndex - 1][colIndex + 1] != "*") {
                    this.boardArray[rowIndex - 1][colIndex + 1] += 1
                }
                //adds +1 to diag down-right
                if (this.boardArray[rowIndex + 1]
                    && (this.boardArray[rowIndex + 1][colIndex + 1] || this.boardArray[rowIndex + 1][colIndex + 1] == 0) &&
                    this.boardArray[rowIndex + 1][colIndex + 1] != "*") {
                    this.boardArray[rowIndex + 1][colIndex + 1] += 1
                }
                // adds +1 to diag down-left
                if (this.boardArray[rowIndex + 1] &&
                    (this.boardArray[rowIndex + 1][colIndex - 1] || this.boardArray[rowIndex + 1][colIndex - 1] == 0) &&
                    this.boardArray[rowIndex + 1][colIndex - 1] != "*") {
                    this.boardArray[rowIndex + 1][colIndex - 1] += 1;
                }
            }
        })
    })
    return this;
}

//creates rows-cells/blocks made in each
ArrayCreator.prototype.createBoard = function () {
    this.boardArray.forEach((rowID, rowIndex) => {
        this.column = rowID
        console.log(this.column)
        this.displayRow = document.createElement("div");
        this.displayRow.classList.add("row");
        main.appendChild(this.displayRow);
        this.createCells(rowID, this.displayRow)
    })
    return this;
}

//creates cells/blocks, add css classes, add text to page, add event listeners to each div
ArrayCreator.prototype.createCells = function (rowID) {
    // this.boardArray[0].forEach((col, colIndex) => 
    for (this.cellID of rowID) {
       
        this.displayCell = document.createElement("div");
        this.displayCell.classList.add("cell");
        this.displayCell.classList.add("hidden")
        this.displayRow.appendChild(this.displayCell);

        this.newText = document.createTextNode(this.cellID)
        this.displayCell.appendChild(this.newText)  
        //event listeners that remove/add classes 
        this.displayCell.addEventListener('click', this.removeHidden)
        this.displayCell.addEventListener('contextmenu', this.addFlag)
    }
}



ArrayCreator.prototype.removeHidden = function () {
    
    console.log(event.target)
    // console.log(this.boardArray[])
    this.targetCell = event.target
    this.targetCell.classList.remove("hidden")
    // if(this.targetCell.innerHTML === "*"){
    //     alert("you must be named Jake")
    // }
}

ArrayCreator.prototype.addFlag = function () {
    
    console.log(this.displayRow)
    this.targetCell = event.target
    this.targetCell.classList.remove("hidden")
    this.targetCell.classList.add("flag")
}


let board1 = new ArrayCreator(10, 5, 8);
// let board2 = new ArrayCreator (20,50,30);


board1.mineLocations().countOfMines().createBoard()