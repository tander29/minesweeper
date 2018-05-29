'use strict';

let main = document.getElementById("main")
let winOrLose = false
//constructor? takes basic inputs and creates a nested array
function ArrayCreator(width, height, mineCount) {
    this.col = width;
    this.row = height;
    this.mineCount = mineCount;
    this.flagCount = this.mineCount
    document.getElementById("largerBoard").addEventListener('click', this.hardGame.bind(this))
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

        this.displayRow = document.createElement("div");
        this.displayRow.classList.add("row");
        main.appendChild(this.displayRow);
        this.displayRow.style.height = 60 / this.row + "vh"
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
        this.displayCell.style.height = 55 / this.row + "vh"
        this.displayCell.style.width = 55 / this.col + "vh"
        this.displayRow.appendChild(this.displayCell);
        //adds text to div's
        // this.newText = document.createTextNode(col)
        // this.displayCell.appendChild(this.newText)
        //assigns data set used for flood fill detection and offsetting
        this.displayCell.dataset.row = this.rowNumber;
        this.displayCell.dataset.col = colIndex;

        document.getElementById("flag").textContent = "Flags Remaining: " + this.flagCount
        //event listeners that remove/add classes 
        this.displayCell.addEventListener('click', this.removeHidden.bind(this))
        // this.displayCell.addEventListener('click', flood)
        this.displayCell.addEventListener('contextmenu', this.addFlag.bind(this))
        console.log(col)
        if(col === "*"){
            this.displayCell.classList.add("mine")
        }
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
    if (winOrLose === true) {
        return
    }
    this.targetCell = event.target

    if (this.targetCell.classList.contains("flag")) {
        return;
    }

    startTime = true
    this.targetCell.classList.remove("hidden")
    let activeRow = parseInt(this.targetCell.dataset.row)
    let activeCol = parseInt(this.targetCell.dataset.col)

    //do math on the cell offset, then place into the doc.qSelector

    let rowBelow = parseInt(activeRow) + 1
    let rowAbove = parseInt(activeRow) - 1
    let colRight = parseInt(activeCol) + 1
    let colLeft = parseInt(activeCol) - 1


    let queue = []
    queue.push(activeRow)
    queue.push(activeCol)


    while (queue.length > 0) {

        let queueRow = queue.shift()
        let queueCol = queue.shift()
        let someText = this.boardArray[queueRow][queueCol]

        const currentCell = document.querySelector('[data-row="' + activeRow + '"][data-col="' + activeCol + '"]');
        const currentQueue = document.querySelector('[data-row="' + queueRow + '"][data-col="' + queueCol + '"]');
        const belowCell = document.querySelector('[data-row="' + (queueRow + 1) + '"][data-col="' + queueCol + '"]');
        const aboveCell = document.querySelector('[data-row="' + (queueRow - 1) + '"][data-col="' + queueCol + '"]');
        const rightCell = document.querySelector('[data-row="' + queueRow + '"][data-col="' + (queueCol + 1) + '"]');
        const leftCell = document.querySelector('[data-row="' + queueRow + '"][data-col="' + (queueCol - 1) + '"]');
        const upLeftCell = document.querySelector('[data-row="' + (queueRow - 1) + '"][data-col="' + (queueCol - 1) + '"]')
        const upRightCell = document.querySelector('[data-row="' + (queueRow - 1) + '"][data-col="' + (queueCol + 1) + '"]')
        const downRightCell = document.querySelector('[data-row="' + (queueRow + 1) + '"][data-col="' + (queueCol + 1) + '"]')
        const downLeftCell = document.querySelector('[data-row="' + (queueRow + 1) + '"][data-col="' + (queueCol - 1) + '"]')

        //appends text to screen as you click so it remains hidden

        currentQueue.textContent = someText

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

            //reveals first number left/right, is diag necessary?
            if (this.boardArray[queueRow][queueCol + 1] && this.boardArray[queueRow][queueCol + 1] !== "*") {
                rightCell.classList.remove("hidden")
                rightCell.textContent = this.boardArray[queueRow][queueCol + 1]
            }
            if (this.boardArray[queueRow][queueCol - 1] && this.boardArray[queueRow][queueCol - 1] !== "*") {
                leftCell.classList.remove("hidden")
                leftCell.textContent = this.boardArray[queueRow][queueCol - 1]
            }
            if (belowCell && this.boardArray[queueRow + 1][queueCol] !== "*") {
                belowCell.classList.remove("hidden")
                belowCell.textContent = this.boardArray[queueRow + 1][queueCol]
            }
            if (aboveCell && this.boardArray[queueRow - 1][queueCol] !== "*") {
                aboveCell.classList.remove("hidden")
                aboveCell.textContent = this.boardArray[queueRow - 1][queueCol]
            }
            if (aboveCell && this.boardArray[queueRow - 1][queueCol + 1] && this.boardArray[queueRow - 1][queueCol + 1] !== "*") {
                upRightCell.classList.remove("hidden")
                upRightCell.textContent = this.boardArray[queueRow - 1][queueCol + 1]
            }
            if (aboveCell && this.boardArray[queueRow - 1][queueCol - 1] && this.boardArray[queueRow - 1][queueCol - 1] !== "*") {
                upLeftCell.classList.remove("hidden")
                upLeftCell.textContent = this.boardArray[queueRow - 1][queueCol - 1]
            }
            if (belowCell && this.boardArray[queueRow + 1][queueCol + 1] && this.boardArray[queueRow + 1][queueCol + 1] !== "*") {
                downRightCell.classList.remove("hidden")
                downRightCell.textContent = this.boardArray[queueRow + 1][queueCol + 1]
            }
            if (belowCell && this.boardArray[queueRow + 1][queueCol - 1] && this.boardArray[queueRow + 1][queueCol - 1] !== "*") {
                downLeftCell.classList.remove("hidden")
                downLeftCell.textContent = this.boardArray[queueRow + 1][queueCol - 1]
            }


        }
    }

    let lose = 0
    // lose detection
    if (this.targetCell.innerHTML === "*") {
        
        lose = 1
        startTime = false
        winOrLose = true
        //need loop that looksfor all mines and reveals them
        let revealMines = document.getElementsByClassName("mine")
        console.log('reveal mines',revealMines)
        for(let i = 0; i < revealMines.length; i++){
            console.log(revealMines[i])
            revealMines[i].textContent = "*"
            
            revealMines[i].classList.remove("hidden")
            revealMines[i].classList.add("reveal")
        }
        alert("you lose, your name must be Jake.  Your score is " + time + ", congrats?")
    }
    //mediocre win detection
    let hiddenCellCount = document.getElementsByClassName("hidden")
    let flagCellCount = document.getElementsByClassName("flag")

    if (this.mineCount === (hiddenCellCount.length + flagCellCount.length) && lose !== 1) {
        alert("you win, your name must be anything but Jake. Your score is " + time + ", congrats!!")
        startTime = false
        winOrLose = true
    }


}

document.getElementById("reset").addEventListener('click', newGame)



function newGame() {

    while (main.childElementCount > 0) {
        main.removeChild(main.lastChild)
    }

    board1 = new ArrayCreator(10, 8, 10);
    board1.mineLocations().countOfMines().createBoard()
    time = 0
    startTime = false
    winOrLose = false
}
// function hardGame() {
ArrayCreator.prototype.hardGame = function (event) {

    while (main.childElementCount > 0) {
        main.removeChild(main.lastChild)
    }

    board1 = new ArrayCreator(15, 12, 30);
    board1.mineLocations().countOfMines().createBoard()
    time = 0
    startTime = false
    winOrLose = false
    // console.table(this.boardArray)
    // console.log('mine count', this.mineCount)

}

// // ArrayCreator.prototype.loseRevealMines = function () {
//    let mineCells =  document.getElementsByClassName()
// // }



// document.getElementById("largerBoard").addEventListener('click', hardGame)
// document.getElementById("largerBoard").addEventListener('click', this.hardGame)
let board1 = new ArrayCreator(10, 8, 10);

board1.mineLocations().countOfMines().createBoard()