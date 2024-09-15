import prompt from './helpers/prompt.js';
import Board from './Board.js';
import Player from './Player.js';

export default class App {
    private board: Board;
    private playerX!: Player;
    private playerO!: Player;

    constructor() {
        this.board = new Board();
        this.start();
    }

    start(): void {
        while (true) {
            this.createPlayers();
            this.startGameLoop();
            this.whoHasWonOnGameOver();
            console.log('');
            const playAgain: string = prompt('Vill ni spela igen? (ja/nej)? ');
            if (playAgain.toLowerCase() !== 'ja') { break; }
        }
    }

    createPlayers(): void {
        console.clear();
        console.log('CONNECT 4\n');
        this.playerX = new Player(prompt('Spelare X:s namn: '), 'X');
        this.playerO = new Player(prompt('Spelare O:s namn: '), 'O');
    }

    startGameLoop(): void {
        while (!this.board.gameOver) {
            console.clear();
            this.board.render();
            const player: Player = this.board.currentPlayerColor === 'X' ? this.playerX : this.playerO;
            console.log(`It's ${player.name}'s (${player.color}) turn.`);
            const move: string = prompt(`Ange ditt drag ${player.color} ${player.name} - skriv in kolumn (1-7): `);
            const column: number = +move.trim() - 1;

            if (column < 0 || column >= 7 || isNaN(column)) {
                console.log('Invalid column. Please enter a number between 1 and 7.');
                continue;
            }

            if (!this.board.makeMove(player.color, column)) {
                console.log('Column is full or invalid move. Try again.');
                continue;
            }

            if (this.board.gameOver) break;
        }
    }

    whoHasWonOnGameOver(): void {
        console.clear();
        this.board.render();
        if (this.board.winner) {
            const winningPlayer: Player = this.board.winner === 'X' ? this.playerX : this.playerO;
            console.log(`Grattis ${winningPlayer.color}: ${winningPlayer.name} du vann!`);
        } else {
            console.log('Tyvärr det blev oavgjort...');
        }
    }
}


new App();
