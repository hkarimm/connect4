"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_js_1 = __importDefault(require("./helpers/prompt.js"));
const Board_js_1 = __importDefault(require("./Board.js"));
const Player_js_1 = __importDefault(require("./Player.js"));
class App {
    constructor() {
        this.board = new Board_js_1.default();
        this.isPlayerOComputer = false;
        this.start();
    }
    start() {
        while (true) {
            this.createPlayers();
            this.startGameLoop();
            this.whoHasWonOnGameOver();
            console.log('');
            const playAgain = (0, prompt_js_1.default)('Vill ni spela igen? (ja/nej)? ');
            if (playAgain.toLowerCase() !== 'ja') {
                break;
            }
        }
    }
    createPlayers() {
        console.clear();
        console.log('CONNECT 4\n');
        this.playerX = new Player_js_1.default((0, prompt_js_1.default)('Spelare X:s namn: '), 'X');
        // Ask if Player O should be a computer
        const playWithComputer = (0, prompt_js_1.default)('Vill du spela mot en dator? (ja/nej)? ');
        if (playWithComputer.toLowerCase() === 'ja') {
            this.playerO = new Player_js_1.default('Dator', 'O');
            this.isPlayerOComputer = true;
        }
        else {
            this.playerO = new Player_js_1.default((0, prompt_js_1.default)('Spelare O:s namn: '), 'O');
            this.isPlayerOComputer = false;
        }
    }
    startGameLoop() {
        while (!this.board.gameOver) {
            console.clear();
            this.board.render();
            const player = this.board.currentPlayerColor === 'X' ? this.playerX : this.playerO;
            console.log(`It's ${player.name}'s (${player.color}) turn.`);
            let column;
            if (this.isPlayerOComputer && player.color === 'O') {
                // Computer player's move
                column = this.getRandomColumn();
                console.log(`Datorn väljer kolumn: ${column + 1}`);
            }
            else {
                // Human player's move
                const move = (0, prompt_js_1.default)(`Ange ditt drag ${player.color} ${player.name} - skriv in kolumn (1-7): `);
                column = +move.trim() - 1;
                if (column < 0 || column >= 7 || isNaN(column)) {
                    console.log('Invalid column. Please enter a number between 1 and 7.');
                    continue;
                }
            }
            if (!this.board.makeMove(player.color, column)) {
                console.log('Column is full or invalid move. Try again.');
                continue;
            }
            if (this.board.gameOver)
                break;
        }
    }
    getRandomColumn() {
        let availableColumns = [];
        for (let col = 0; col < 7; col++) {
            if (this.board.isColumnPlayable(col)) {
                availableColumns.push(col);
            }
        }
        return availableColumns[Math.floor(Math.random() * availableColumns.length)];
    }
    whoHasWonOnGameOver() {
        console.clear();
        this.board.render();
        if (this.board.winner) {
            const winningPlayer = this.board.winner === 'X' ? this.playerX : this.playerO;
            console.log(`Grattis ${winningPlayer.color}: ${winningPlayer.name} du vann!`);
        }
        else {
            console.log('Tyvärr det blev oavgjort...');
        }
    }
}
exports.default = App;
new App();
