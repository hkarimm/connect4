import prompt from './helpers/prompt.js';
import Board from './Board.js';
import Player from './Player.js';
export default class App {
    constructor() {
        this.board = new Board();
        this.isPlayerOComputer = false;
        this.start();
    }
    start() {
        while (true) {
            this.createPlayers();
            this.startGameLoop();
            this.whoHasWonOnGameOver();
            console.log('');
            const playAgain = prompt('Vill ni spela igen? (ja/nej)? ');
            if (playAgain.toLowerCase() !== 'ja') {
                break;
            }
        }
    }
    createPlayers() {
        console.clear();
        console.log('CONNECT 4\n');
        this.playerX = new Player(prompt('Spelare X:s namn: '), 'X');
        // Ask if Player O should be a computer
        const playWithComputer = prompt('Vill du spela mot en dator? (ja/nej)? ');
        if (playWithComputer.toLowerCase() === 'ja') {
            this.playerO = new Player('Dator', 'O');
            this.isPlayerOComputer = true;
        }
        else {
            this.playerO = new Player(prompt('Spelare O:s namn: '), 'O');
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
                const move = prompt(`Ange ditt drag ${player.color} ${player.name} - skriv in kolumn (1-7): `);
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
new App();
