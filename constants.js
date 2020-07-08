const WIDTH = 12;
const HEIGHT = 20;
const CELL_SIZE = 20;
const BORDER_WIDTH = 5;
const START_ROW = 0;
const START_COL = WIDTH/2 -2;
const NEXT_SIZE = 5;
const DROP_TIME = 1000;
const LEVEL_CHANGE = 10; 
const SOFT_DROP = 1;
const HARD_DROP = 2;

const KEYS = {
    SPACE: 32,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
}

const TETROMINOS = [
    {   shape: [0],
        color: [0, 0]
    },
    {   shape: [
            [0, 1, 0, 0], 
            [0, 1, 0, 0], 
            [0, 1, 0, 0], 
            [0, 1, 0, 0]
        ],
        color: [180, 100]  //cyan
    },
    {   shape: [
            [0, 2, 0], 
            [0, 2, 0], 
            [2, 2, 0]
        ], 
        color: [220, 100]   //blue
    },
    {   shape: [
            [0, 3, 0], 
            [0, 3, 0], 
            [0, 3, 3]
        ],
        color: [39, 100]    //orange
    },
    {   shape: [
            [4, 4], 
            [4, 4]
        ], 
        color: [55, 100]   //yellow
    },
    {   shape: [
            [0, 5, 5], 
            [5, 5, 0], 
            [0, 0, 0]
        ], 
        color: [120, 100]   //green
    },
    {   shape: [
            [0, 0, 0], 
            [6, 6, 6], 
            [0, 6, 0]
        ],
        color: [300, 100]   //purple
    },
    {   shape: [
            [7, 7, 0], 
            [0, 7, 7], 
            [0, 0, 0]
        ], 
        color: [0, 100]     //red
    }
];
