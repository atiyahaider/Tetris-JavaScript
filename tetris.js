let running = false;
//let dropTime = 0;
let startTime = 0;
let gameOver = false;
let reqId = null;

let [ctxBoard, ctxNextTet] = initCanvases();
let board = new Board(ctxBoard);
let tetromino = new Tetronimo(ctxNextTet);
let gameStats = new GameStats();

startPause = () => {
    if (reqId) {  //if game was running, then pause
        pause();
    }
    else {  //start game
        play();
    }
}

pause = () => {
    cancelAnimationFrame(reqId);
    reqId = null;
    updateStatus('Press Start to continue');
}

play = () => {
    if (gameOver) {
        resetGame();
    }
    if (tetromino.shape.length === 0) {
        tetromino.getNextTetromino();
    }

    updateStatus('Happy Playing...');
    startTime = Date.now();
    animate();
}

animate = () => {
    let now = Date.now();
    let elapsedTime = now - startTime;
    if (elapsedTime > gameStats.dropTime) {
        moveDown();
        startTime = Date.now();    
    }
    
    board.draw(tetromino);

    if (gameOver) {
        cancelAnimationFrame(reqId);
        reqId = null;
    }
    else
        reqId = requestAnimationFrame(animate);
}

calculateDropTime = () => {
    return DROP_TIME - (gameStats.level * 200);
}   

resetGame = () => {
    gameOver = false;      
    board.resetBoard();
    tetromino.resetCurrentTetromino();
    gameStats.resetGameStats();      
}

isGameOver = () => {
    if (tetromino.nextTetromino.shape.length > tetromino.rowPos - board.rowsCleared) {
        gameOver = true;
        updateStatus('Game Over!');
        return true;
    }
    else
        return false;
}

handleCollision = () => {
    board.mergeTetromino(tetromino);    //merge tetromino to the board
    board.clearRows();                  //sweep completed rows
    if (board.rowsCleared !== 0)
        gameStats.calculateScore(board.rowsCleared);

    if (board.tetris)
        updateStatus('Tetris!!');
    else
        updateStatus('Happy Playing...');

    if (!isGameOver())
       tetromino.getNextTetromino();
}

moveHorizontal = dir => {
    if (board.validMove(tetromino, 0, dir)) 
        tetromino.updateTetrominoPos(0, dir);
}

moveDown = () => {
    if (board.validMove(tetromino, 1, 0))
        tetromino.updateTetrominoPos(1, 0);
    else   //collided
        handleCollision();
}

rotate = () => {
    let tetrominoCopy = JSON.parse(JSON.stringify(tetromino));

    //rotate tetromino and store new shape
    tetrominoCopy.shape = tetrominoCopy.shape[0].map((_, index) => tetrominoCopy.shape.map(row => row[index]).reverse());
    if (board.validMove(tetrominoCopy, 0, 0)) {
        //draw rotated shape if valid move
        tetromino.updateTetrominoShape(tetrominoCopy.shape)
    }
}

hardDrop = () => {
    let originalPosX = tetromino.rowPos;
    while (board.validMove(tetromino, 1, 0)) {
        tetromino.updateTetrominoPos(1, 0);
    }
    gameStats.updateScore(HARD_DROP * (tetromino.rowPos - originalPosX));
    handleCollision();
}

addEventListeners = () => {
    document.addEventListener('keydown', e => { 
        if (reqId) {
            switch (e.keyCode) {
                case KEYS.LEFT:   //left
                    moveHorizontal(-1);
                    break;
                case KEYS.RIGHT:   //right
                    moveHorizontal(1);
                    break;
                case KEYS.DOWN:   //down
                    moveDown();
                    gameStats.updateScore(SOFT_DROP);
                    break;
                case KEYS.SPACE:   // hard drop
                    hardDrop();
                    break;
                case KEYS.UP:   //up, rotate
                    rotate();
                    break;
                default:
                    return null;
            }
        }   
    })

    document.addEventListener('keyup', e => { 
        e.preventDefault(); //to stop spacebar from activating button click        
        if (reqId) {
            if (Object.values(KEYS).includes(e.keyCode))
                startTime = Date.now();
        }
    })
}

updateStatus = (status) => {
    let gameStatus = document.getElementById('gameStatus');
    gameStatus.textContent = status;
}

addEventListeners();