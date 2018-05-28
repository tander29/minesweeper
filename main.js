'use strict';

let main = document.getElementById("main")

//constructor? takes basic inputs and creates a nested array
function ArrayCreator(width, height, mineCount) {
    this.col = width;
    this.row = height;
    this.mineCount = mineCount;
    this.flagCount = this.mineCount
    //something like below will use .fill, not sure how it works yet
    //this.boardArray = new Array(height).map(fill()(new Array(width).fill(0))
    this.boardArray = new Array(height).join().split(",").map(() =>
        new Array(width).join().split(",").map(() => 0));
        
}
//places mines at random location, uses width and height input through this.col and this.row, prevents 
//prevents two mines from going in same spot, only inputs mine into a 0 spot, doesn't stop until currentmine=totalmine
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

//looks for cells with mines, adds +1 to all border cells
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
        this.displayRow.style.height = 60/this.row + "vh"
        this.displayRow.style.width = 90 + "%"
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
        this.displayCell = document.createElement("div");
        this.displayCell.classList.add("cell");
        this.displayCell.classList.add("hidden")
        this.displayCell.style.height = 55/this.row + "vh"
        this.displayCell.style.width = 55/this.col + "vh"
        this.displayRow.appendChild(this.displayCell);
        //adds text to div's
        this.newText = document.createTextNode(col)
        this.displayCell.appendChild(this.newText)
        //assigns data set used for flood fill detection and offsetting
        this.displayCell.dataset.row = this.rowNumber;
        this.displayCell.dataset.col = colIndex;

        document.getElementById("flag").textContent = "Flags Remaining: " + this.flagCount
        //event listeners that remove/add classes 
        this.displayCell.addEventListener('click', this.removeHidden.bind(this))
        // this.displayCell.addEventListener('click', flood)
        this.displayCell.addEventListener('contextmenu', this.addFlag.bind(this))
    })
}

ArrayCreator.prototype.addFlag = function () {
event.preventDefault();
   
    this.targetCell = event.target
    
    
    if (this.targetCell.classList.contains("hidden") && !this.targetCell.classList.contains("flag") && this.flagCount > 0) {
        this.targetCell.classList.remove("hidden")
        this.targetCell.classList.add("flag")
        this.flagCount--
     
    } else if

    (this.targetCell.classList.contains("flag")) {
        this.targetCell.classList.remove("flag")
        this.targetCell.classList.add("hidden")
        this.flagCount++
        
    }

    document.getElementById("flag").textContent = "Flags Remaining: " + (this.flagCount)
}



//flood fill time!
ArrayCreator.prototype.removeHidden = function () {

    this.targetCell = event.target
    if(this.targetCell.classList.contains("flag")){
        return;
    }
    this.targetCell.classList.remove("hidden")
    let activeRow = parseInt(this.targetCell.dataset.row)
    let activeCol = parseInt(this.targetCell.dataset.col)


    //do math on the cell offset, then place into the doc.qSelector
    console.log("this board array item", this.boardArray[activeRow][activeCol])
    let rowBelow = parseInt(activeRow) + 1
    let rowAbove = parseInt(activeRow) - 1
    let colRight = parseInt(activeCol) + 1
    let colLeft = parseInt(activeCol) - 1


    let queue = []
    queue.push(activeRow)
    queue.push(activeCol)
    console.log(queue)
   
    while (queue.length > 0) {

        let queueRow = queue.shift()
        let queueCol = queue.shift()

        const currentCell = document.querySelector('[data-row="' + activeRow + '"][data-col="' + activeCol + '"]');
        const belowCell = document.querySelector('[data-row="' + (queueRow + 1) + '"][data-col="' + queueCol + '"]');
        const aboveCell = document.querySelector('[data-row="' + (queueRow - 1) + '"][data-col="' + queueCol + '"]');
        const rightCell = document.querySelector('[data-row="' + queueRow + '"][data-col="' + (queueCol + 1) + '"]');
        const leftCell = document.querySelector('[data-row="' + queueRow + '"][data-col="' + (queueCol - 1) + '"]');
        const upLeftCell = document.querySelector('[data-row="' + (queueRow-1) + '"][data-col="' + (queueCol - 1) + '"]')
        const upRightCell = document.querySelector('[data-row="' + (queueRow-1) + '"][data-col="' + (queueCol + 1) + '"]')
        const downRightCell = document.querySelector('[data-row="' + (queueRow+1) + '"][data-col="' + (queueCol + 1) + '"]')
        const downLeftCell = document.querySelector('[data-row="' + (queueRow+1) + '"][data-col="' + (queueCol -1) + '"]')

        console.log("below", belowCell)
        console.log("above", aboveCell)
        //if the number is clicked on is a 0, then do flood fill
        if (this.boardArray[queueRow][queueCol] === 0) {
                //reveals cell to right, then adds new coordinates to the array
            if (rightCell && this.boardArray[queueRow][queueCol + 1] === 0 && rightCell.classList.contains("hidden")) {
                rightCell.classList.remove("hidden")
                queue.push(queueRow)
                queue.push(queueCol + 1)
            }
            //reveals leftcell
            if (leftCell && this.boardArray[queueRow][queueCol - 1] === 0 && leftCell.classList.contains("hidden")) {
                leftCell.classList.remove("hidden")
                queue.push(queueRow)
                queue.push(queueCol - 1)
            }
            //reveals cell below
            if (belowCell && this.boardArray[queueRow + 1][queueCol] === 0 && belowCell.classList.contains("hidden")) {
                belowCell.classList.remove("hidden")
                queue.push(queueRow + 1)
                queue.push(queueCol)
            }
            //reveals class above
            if (aboveCell && this.boardArray[queueRow - 1][queueCol] === 0 && aboveCell.classList.contains("hidden")) {
                aboveCell.classList.remove("hidden")
                queue.push(queueRow - 1)
                queue.push(queueCol)
            }
            
            
            console.log(queue)


            //reveals first number left/right, is diag necessary?
            if (this.boardArray[queueRow][queueCol + 1] && this.boardArray[queueRow][queueCol + 1] !== "*") {
                rightCell.classList.remove("hidden")
            }
            if (this.boardArray[queueRow][queueCol - 1] && this.boardArray[queueRow][queueCol - 1] !== "*") {
                leftCell.classList.remove("hidden")
            }
            if (belowCell && this.boardArray[queueRow + 1][queueCol] !== "*") {
                belowCell.classList.remove("hidden")
            }
            if (aboveCell && this.boardArray[queueRow - 1][queueCol] !== "*") {
                aboveCell.classList.remove("hidden")
            }
            if (aboveCell && this.boardArray[queueRow - 1][queueCol+1] && this.boardArray[queueRow - 1][queueCol+1] !== "*") {
                upRightCell.classList.remove("hidden")
            }
            if (aboveCell && this.boardArray[queueRow - 1][queueCol-1] && this.boardArray[queueRow - 1][queueCol-1] !== "*") {
                upLeftCell.classList.remove("hidden")
            }
            if (belowCell && this.boardArray[queueRow + 1][queueCol+1] && this.boardArray[queueRow + 1][queueCol+1] !== "*") {
                downRightCell.classList.remove("hidden")
            }
            if (belowCell && this.boardArray[queueRow + 1][queueCol-1] && this.boardArray[queueRow + 1][queueCol-1] !== "*") {
                downLeftCell.classList.remove("hidden")
            }
            

        }
    }

    let lose = 0
    // lose detection
    if (this.targetCell.innerHTML === "*") {
        alert("you lose, your name must be Jake")
        lose = 1
        //need loop that looksfor all mines and reveals them

    }
    //mediocre win detection
    let hiddenCellCount = document.getElementsByClassName("hidden")
    let flagCellCount = document.getElementsByClassName("flag")
    console.log(this.mineCount === hiddenCellCount.length)
    if (this.mineCount === (hiddenCellCount.length + flagCellCount.length) && lose !== 1) {
        alert("you win, your name must be anything but Jake")
    }
    

}

let board1 = new ArrayCreator(10, 8, 10);

board1.mineLocations().countOfMines().createBoard()