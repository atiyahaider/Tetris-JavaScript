class Tetronimo {
    constructor(ctx) {
        this.shape = [];
        this.color = 0;
        this.rowPos = 0;
        this.colPos = 0;
        this.nextTetromino = this.randomTetromino();
        this.ctx = ctx;
    }

    randomTetromino = () => {
        return TETROMINOS[Math.floor(Math.random() * (TETROMINOS.length-1)) + 1];
    };

    updateTetrominoPos = (newX, newY) => {
        this.rowPos += newX;
        this.colPos += newY;
    }
                                                
    updateTetrominoShape = (newShape) => {
        this.shape = newShape;
    }

    getNextTetromino = () => {
        this.shape = this.nextTetromino.shape;
        this.color = this.nextTetromino.color;
        this.rowPos = START_ROW;
        this.colPos = START_COL;
        this.nextTetromino = this.randomTetromino();
        this.drawNextTetromino();
    }

    resetCurrentTetromino = () => {
        let rand = this.randomTetromino();
        this.shape = rand.shape;
        this.color = rand.color;
        this.rowPos = START_ROW;
        this.colPos = START_COL;
        this.nextTetromino = this.randomTetromino();
    }

    drawNextTetromino = () => {
        //clear the previous tetromino
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);    

        // Add extra rows/columns to center different size tetrominos in a 5x5 grid
        let tetrominoCopy = JSON.parse(JSON.stringify(this.nextTetromino.shape));
        switch (this.nextTetromino.shape[0].length) {
            case 2: this.nextTetromino.shape.forEach((_, i) => {
                        tetrominoCopy[i].unshift(0);
                        tetrominoCopy[i].push(0, 0);
                    });
                    tetrominoCopy.unshift(Array(5).fill(0));
                    tetrominoCopy.push(Array(5).fill(0))
                    tetrominoCopy.push(Array(5).fill(0))
                    break;
            case 3: this.nextTetromino.shape.forEach((_, i) => {
                        tetrominoCopy[i].unshift(0);
                        tetrominoCopy[i].push(0);
                        });
                    tetrominoCopy.unshift(Array(5).fill(0));
                    tetrominoCopy.push(Array(5).fill(0))
                    break;
            case 4: this.nextTetromino.shape.forEach((_, i) => {
                        tetrominoCopy[i].unshift(0);
                        });
                    tetrominoCopy.push(Array(5).fill(0))
                    break;
            default: 
                    break;
        }

        //draw the next Tetromino
        for (let y = 0; y < tetrominoCopy.length; y++) {
            for (let x = 0; x < tetrominoCopy[y].length; x++) {
                if (tetrominoCopy[y][x] !== 0)
                    this.ctx.borderedRect(x, y, this.nextTetromino.color);    
                else
                    this.ctx.emptyCell(x, y);
            }
        }
    }

}