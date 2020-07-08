class GameStats {
    constructor() {
        this.dropTime = DROP_TIME;
        this.level = 0;
        this.score = 0;
        this.rows = 0;
    }

    calculateDropTime = () => {
        return DROP_TIME / (this.level + 1) + 200;
    }   
    
    calculateScore = (rowsCleared) => {
        const linePoints = [40, 100, 300, 1200];

        this.rows += rowsCleared;

        while (rowsCleared > 4) {  //if more than 4 rows cleared
            this.score += linePoints[3] * (this.level + 1);    
            rowsCleared -= 4;
        }
        this.score += linePoints[rowsCleared - 1] * (this.level + 1);
        
        // Increase level when player has cleared 10 rows
        if (this.rows >= (this.level + 1) * LEVEL_CHANGE) { 
            this.level += 1;
            this.dropTime = this.calculateDropTime();
        }

        this.updateStats();            
    }

    updateStats = () => {
        let scoreElement = document.getElementById('score');
        scoreElement.textContent = this.score;
        let levelElement = document.getElementById('level');
        levelElement.textContent = this.level;
        let rowsElement = document.getElementById('rows');
        rowsElement.textContent = this.rows;
    }

    updateScore = (score) => {
        this.score += score;
        let scoreElement = document.getElementById('score');
        scoreElement.textContent = this.score;
    }

    resetGameStats = () => {
        this.dropTime = DROP_TIME;
        this.level = 0;
        this.score = 0;
        this.rows = 0;
        this.updateStats();
    }
}