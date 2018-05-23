'use strict';

let main = document.getElementById("main")
function ArrayCreator(width, height, mineCount){
    this.col = width;
    this.row = height;
    this.mineCount = mineCount;
    // this.rowLength = Array(10).join().split(",").map(() => 0);
    this.boardArray = Array(height).join().split(",").map(() => 
    Array(width).join().split(",").map(() => 0));
    // this.rowLength.map()
    console.log("this in arrayCreator",this);
    console.log('this.row in arrayCreator',this.row);

}

ArrayCreator.prototype.mineLocations = function() {
    for(let mine = 0; mine<this.mineCount; mine++){
    let rowOffset = -1
    let randomRow = Math.floor(Math.random()* (this.row));
    let randomCol = Math.floor(Math.random()* (this.col)); 
    this.boardArray[randomRow][randomCol] = "*";
    console.log(this.boardArray);
    console.log("this in arraycreator minelocation",this);
    console.log('randomRow',randomRow);
    console.log('randomcol', randomCol);
    console.log(this.boardArray);

    
    }
}



ArrayCreator.prototype.createBoard = function (){
    this.boardArray.forEach((row, rowIndex) => {
        let displayRow = document.createElement("div");
        displayRow.classList.add("row");
        main.appendChild(displayRow);
        board1.createCells(row,displayRow)
    })
    console.log("this.boardArray in board1 createBoard)",this.boardArray)
}

ArrayCreator.prototype.createCells = function (row,displayRow){
    this.boardArray[0].forEach((col, colIndex) => {
        let displayCell = document.createElement("div");
        displayCell.classList.add("cell");
        displayRow.appendChild(displayCell);
    })
}






let board1 = new ArrayCreator(10, 5, 8);
board1.mineLocations();
board1.createBoard()