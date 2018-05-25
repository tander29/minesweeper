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
                    (this.boardArray[rowIndex][colIndex + 1] || 
                    this.boardArray[rowIndex][colIndex + 1] == 0)) {
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
        this.rowNumber = rowIndex
        // console.log(this.column)
        this.displayRow = document.createElement("div");
        this.displayRow.classList.add("row");
        main.appendChild(this.displayRow);

        //creates cells for each row
        this.createCells(rowID)
    })
    return this;
}

//creates cells/blocks, add css classes, add text to page, add event listeners to each div
ArrayCreator.prototype.createCells = function (rowID) {
    // this.boardArray[0].forEach((col, colIndex) => 
    this.column.forEach((col, colIndex) => {
    // for (this.cellID of rowID) {
    //    console.log(colIndex)
        this.displayCell = document.createElement("div");
        this.displayCell.classList.add("cell");
        this.displayCell.classList.add("hidden")
        this.displayRow.appendChild(this.displayCell);
        //adds text to div's
        this.newText = document.createTextNode(col)
        this.displayCell.appendChild(this.newText) 
        //assigns data set used for flood fill detection and offsetting
        this.displayCell.dataset.row = this.rowNumber; 
        this.displayCell.dataset.col = colIndex;
        //event listeners that remove/add classes 
        this.displayCell.addEventListener('click', this.removeHidden.bind(this))
        // this.displayCell.addEventListener('click', flood)
        this.displayCell.addEventListener('contextmenu', this.addFlag.bind(this))
    })
}

// ArrayCreator.prototype.flood = function () {
    
//     console.log(event.target)
//     // console.log(this.boardArray[])
//     let row = this.targetCell.dataset.row
//     //lose detection
//     // if(this.targetCell.innerHTML === "*"){
//     //     alert("you must be named Jake")
//     // }
// }



ArrayCreator.prototype.addFlag = function () {
    
    // console.log(this.displayRow)
    this.targetCell = event.target
    this.targetCell.classList.remove("hidden")
    this.targetCell.classList.add("flag")
}


//flood fill time!

ArrayCreator.prototype.removeHidden = function () {
    
    // console.log(event.target)
    // console.log(this.boardArray[])
    this.targetCell = event.target
    this.targetCell.classList.remove("hidden")
    let activeRow = parseInt(this.targetCell.dataset.row)
    let activeCol = parseInt(this.targetCell.dataset.col)
    // console.log("this is row",activeRow)
    // console.log("this is col",activeCol)
    // console.log(this)

    //do math on the cell offset, then place into the doc.qSelector
    console.log("this board array item",this.boardArray[activeRow][activeCol])
    let rowBelow = parseInt(activeRow) + 1
    let rowAbove = parseInt(activeRow) - 1
    let colRight = parseInt(activeCol) + 1
    let colLeft = parseInt(activeCol) -1
    
    
    
    let queue = []
    queue.push(activeRow)
    queue.push(activeCol)
    console.log(queue)
    //removes class below
    while(queue.length > 0) {
        
        let queueRow = queue.shift()
        let queueCol = queue.shift()


        const currentCell = document.querySelector('[data-row="' + activeRow + '"][data-col="' + activeCol + '"]');
        const belowCell = document.querySelector('[data-row="' + (queueRow+1) + '"][data-col="' + queueCol + '"]');
        const aboveCell = document.querySelector('[data-row="' + (queueRow-1) + '"][data-col="' + queueCol + '"]');
        const rightCell = document.querySelector('[data-row="' + queueRow+ '"][data-col="' + (queueCol+1) + '"]');
        const leftCell = document.querySelector('[data-row="' + queueRow+ '"][data-col="' + (queueCol-1) + '"]');

            console.log("below",belowCell)
            console.log("above",aboveCell)
            // console.log("hi",this.boardArray[2][3].dataset.row)
        if(this.boardArray[queueRow][queueCol] === 0){


            
            // rightCell.classList.remove("hidden")
            // leftCell.classList.remove("hidden")
            // belowCell.classList.remove("hidden")
            // aboveCell.classList.remove("hidden")

    if(rightCell && this.boardArray[queueRow][queueCol+1] === 0 && rightCell.classList.contains("hidden")){
        rightCell.classList.remove("hidden")
       queue.push(queueRow)
       queue.push(queueCol+1)
    }
    //removes leftcell
    if(leftCell && this.boardArray[queueRow][queueCol-1] === 0 && leftCell.classList.contains("hidden")){
        leftCell.classList.remove("hidden")
        queue.push(queueRow)
        queue.push(queueCol-1)
    }
    //removes cell below
    if( belowCell && this.boardArray[queueRow+1][queueCol] === 0 && belowCell.classList.contains("hidden")){
        belowCell.classList.remove("hidden")
        queue.push(queueRow+1)
        queue.push(queueCol)
    }
    //removes class above
    if(aboveCell && this.boardArray[queueRow-1][queueCol] === 0 && aboveCell.classList.contains("hidden")){
        aboveCell.classList.remove("hidden")
        queue.push(queueRow-1)
        queue.push(queueCol)
    }
     console.log(queue)
    
    

    if(this.boardArray[queueRow][queueCol+1] && this.boardArray[queueRow][queueCol+1] !=="*"){
        rightCell.classList.remove("hidden")
    }
    if( this.boardArray[queueRow][queueCol-1] && this.boardArray[queueRow][queueCol-1] !=="*"){
        leftCell.classList.remove("hidden")
    }
    if(belowCell && this.boardArray[queueRow+1][queueCol] !=="*"){
        belowCell.classList.remove("hidden")
    }
    if(aboveCell && this.boardArray[queueRow-1][queueCol] !=="*"){
        aboveCell.classList.remove("hidden")
    }
    
}  
}

    let lose = 0
    // lose detection
    if(this.targetCell.innerHTML === "*"){
        alert("you lose, your name must be Jake")
        lose = 1
    }

    let hiddenCellCount = document.getElementsByClassName("hidden")
    console.log(this.mineCount === hiddenCellCount.length )
    if (this.mineCount === hiddenCellCount.length && lose !==1){
        alert("you win, your name must be anything but Jake")
    }
lose = 0
    
}











let board1 = new ArrayCreator(10, 5, 5);



board1.mineLocations().countOfMines().createBoard()