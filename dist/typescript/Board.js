"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Board {
    constructor() {
        this.matrix = [...new Array(6)].map(() => [...new Array(7)].map(() => ' '));
        this.currentPlayerColor = 'X';
        this.winner = false;
        this.isADraw = false;
        this.gameOver = false;
    }
    render() {
        let line = '\n' + '-'.repeat(29) + '\n';
        console.log(line +
            this.matrix.map(row => row.map(column => `| ${column} `).join('') + '|').join(line) +
            line);
    }
    makeMove(color, column) {
        if (this.gameOver)
            return false;
        if (color !== this.currentPlayerColor)
            return false;
        if (column < 0 || column >= this.matrix[0].length)
            return false;
        for (let row = this.matrix.length - 1; row >= 0; row--) {
            if (this.matrix[row][column] === ' ') {
                this.matrix[row][column] = color;
                this.currentPlayerColor = this.currentPlayerColor === 'X' ? 'O' : 'X';
                this.winner = this.winCheck();
                this.isADraw = this.drawCheck();
                this.gameOver = !!this.winner || this.isADraw;
                return true;
            }
        }
        return false;
    }
    // New helper method to check if a column is playable
    isColumnPlayable(column) {
        return this.matrix[0][column] === ' ';
    }
    winCheck() {
        let m = this.matrix;
        const directions = [
            { row: 0, col: 1 }, { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: -1 }
        ];
        for (let row = 0; row < m.length; row++) {
            for (let col = 0; col < m[0].length; col++) {
                const color = m[row][col];
                if (color !== ' ') {
                    for (let { row: dr, col: dc } of directions) {
                        if (this.checkDirection(color, row, col, dr, dc)) {
                            return color;
                        }
                    }
                }
            }
        }
        return false;
    }
    checkDirection(color, row, col, dr, dc) {
        let count = 0;
        for (let i = 0; i < 4; i++) {
            const r = row + i * dr;
            const c = col + i * dc;
            if (r >= 0 && r < this.matrix.length && c >= 0 && c < this.matrix[0].length && this.matrix[r][c] === color) {
                count++;
            }
            else {
                break;
            }
        }
        return count === 4;
    }
    drawCheck() {
        return !this.winCheck() && this.matrix.flat().every(cell => cell !== ' ');
    }
}
exports.default = Board;
