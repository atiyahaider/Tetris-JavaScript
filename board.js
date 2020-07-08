class Board {
    constructor(ctx) {
        this.board = this.clearBoard();
        this.rowsCleared = 0;
        this.tetris = false;
        this.ctx = ctx;
    }

    clearBoard = () => {
        return Array(HEIGHT).fill().map(() => Array(WIDTH).fill(0));
    }

    resetBoard = () => {
        this.board = this.clearBoard();
        this.rowsCleared = 0;
        this.tetris = false;
    }

    validMove = (tetromino, newX, newY) => {
        for (let i = 0; i < tetromino.shape.length; i++) {
            for (let j = 0; j < tetromino.shape[i].length; j++) {
                if (tetromino.shape[i][j] !== 0) {
                    if (
                        //check if the move is beyond the bottom of the board
                        (i + tetromino.rowPos + newX > HEIGHT - 1) ||
                        //or if the move is beyond the width of the board
                        (j + tetromino.colPos + newY < 0) || (j + tetromino.colPos + newY > WIDTH - 1)  ||
                        //or if the cell is already occupied
                        this.board[i + tetromino.rowPos + newX][j + tetromino.colPos + newY] !== 0
                       )
                       {
                            return false;   //move not valid
                       }
                }
            }
        }

        //valid move
        return true; 
    }

    draw = (curTetromino) => {
        //clear the board
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);    

        //draw the board
        this.board.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) 
                    this.ctx.borderedRect(x, y, TETROMINOS[value].color)
                else 
                    this.ctx.emptyCell(x, y);
            })
        });

        //draw the current Tetromino
        for (let y = 0; y < curTetromino.shape.length; y++) {
            for (let x = 0; x < curTetromino.shape[y].length; x++) {
                if (curTetromino.shape[y][x] !== 0) {
                    this.ctx.borderedRect(x + curTetromino.colPos, y + curTetromino.rowPos, curTetromino.color);    
                }
            }
        }
    }

    clearRows = () => {
        this.rowsCleared = 0;
        this.board = this.board.reduce((resultArr, row) => {
                        if (row.every(e => e !== 0)) {                  //if the row has all non-zero values
                            this.rowsCleared++;
                            resultArr.unshift(Array(WIDTH).fill(0));    //add a new empty row on the top
                            return resultArr;
                        }
                        resultArr.push(row);        //else push the incomplete row in the result
                        return resultArr
                    }, []);

        if (this.rowsCleared >= 4)
            this.tetris = true;
        else
            this.tetris = false;
    }

    mergeTetromino = (tetromino) => {
        for (let i = 0; i < tetromino.shape.length; i++) {
            for (let j = 0; j < tetromino.shape[i].length; j++) {
                if (tetromino.shape[i][j] !== 0) {
                    this.board[i + tetromino.rowPos][j + tetromino.colPos] = tetromino.shape[i][j];
                }
            }
        }
    }
}