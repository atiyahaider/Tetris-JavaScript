//custom function to draw borders of different colors for the tetromino
CanvasRenderingContext2D.prototype.borderedRect = function (x, y, fillColor) {

    let color = 'hsl(' + fillColor[0] + ',' + fillColor[1] + '%, ';
    x *= CELL_SIZE;
    y *= CELL_SIZE;

    //draw individual borders with different colors
    function border(context, x1, y1, x2, y2, x3, y3, x4, y4, color) {
      context.beginPath();
      context.moveTo(x1,y1);
      context.lineTo(x2,y2);
      context.lineTo(x3,y3);
      context.lineTo(x4,y4);
      context.closePath();
      context.fillStyle=color;
      context.fill();
    }
    
    // top
    border(this, x, y, 
                 x+CELL_SIZE, y,  
                 x+CELL_SIZE-BORDER_WIDTH, y+BORDER_WIDTH,  
                 x+BORDER_WIDTH, y+BORDER_WIDTH, 
           color + '30%)');
  
    // right
    border(this, x+CELL_SIZE, y,  
                 x+CELL_SIZE, y+CELL_SIZE,  
                 x+CELL_SIZE-BORDER_WIDTH, y+CELL_SIZE-BORDER_WIDTH,  
                 x+CELL_SIZE-BORDER_WIDTH, y+BORDER_WIDTH, 
           color + '35%)');
  
    // bottom
    border(this, x, y+CELL_SIZE, 
                 x+CELL_SIZE, y+CELL_SIZE,  
                 x+CELL_SIZE-BORDER_WIDTH, y+CELL_SIZE-BORDER_WIDTH,  
                 x+BORDER_WIDTH, y+CELL_SIZE-BORDER_WIDTH, 
           color + '67%)');
  
    // left
    border(this, x, y, 
                 x, y+CELL_SIZE,  
                 x+BORDER_WIDTH, y+CELL_SIZE-BORDER_WIDTH,  
                 x+BORDER_WIDTH, y+BORDER_WIDTH, 
           color + '20%)');
    
    // center
    this.fillStyle = color + '55%)';
    this.fillRect(x+BORDER_WIDTH, y+BORDER_WIDTH, CELL_SIZE-BORDER_WIDTH*2, CELL_SIZE-BORDER_WIDTH*2);
  }
  
  CanvasRenderingContext2D.prototype.emptyCell = function (x, y) {
    this.strokeStyle = 'hsl(0,0%,15%)';
    this.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  }

  initCanvases = () => {
    //canvas for game board
    let gameBoard = document.getElementById('gameBoard');
    let ctxBoard = gameBoard.getContext('2d');
    gameBoard.width = WIDTH * CELL_SIZE;
    gameBoard.height = HEIGHT * CELL_SIZE;

    //canvas for next Tetromino
    let nextTetCanvas = document.getElementById('nextTetromino');
    let ctxNextTet = nextTetCanvas.getContext('2d');
    nextTetCanvas.width = NEXT_SIZE * CELL_SIZE;
    nextTetCanvas.height = NEXT_SIZE * CELL_SIZE;

    return [ctxBoard, ctxNextTet];
}