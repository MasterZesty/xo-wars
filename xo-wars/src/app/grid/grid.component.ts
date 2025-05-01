import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  private currentPlayer: string = 'X';
  public boardState: string[][] = [];
  public gameOver: boolean = false;
  public gameOverMessage: string = '';
  public gameCurrentMessage: string = '';

  ngOnInit() {
    this.resetState();
  }

  public resetState() {
    this.boardState = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.currentPlayer = 'X';
    this.gameOver = false;
    this.gameOverMessage = '';
    this.gameCurrentMessage = `It's Player ${this.currentPlayer}'s turn!`;
  }

  private togglePlayer() {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }

  private checkWinner(): boolean {
    const board = this.boardState;
    const player = this.currentPlayer;

    // chek row
    const r1 =
      board[0][0] === player &&
      board[0][1] === player &&
      board[0][2] === player;
    const r2 =
      board[1][0] === player &&
      board[1][1] === player &&
      board[1][2] === player;
    const r3 =
      board[2][0] === player &&
      board[2][1] === player &&
      board[2][2] === player;

    // check col
    const c1 =
      board[0][0] === player &&
      board[1][0] === player &&
      board[2][0] === player;
    const c2 =
      board[0][1] === player &&
      board[1][1] === player &&
      board[2][1] === player;
    const c3 =
      board[0][2] === player &&
      board[1][2] === player &&
      board[2][2] === player;

    // check diagonal
    const d1 =
      board[0][0] === player &&
      board[1][1] === player &&
      board[2][2] === player;
    const d2 =
      board[0][2] === player &&
      board[1][1] === player &&
      board[2][0] === player;

    return r1 || r2 || r3 || c1 || c2 || c3 || d1 || d2;
  }

  private checkDraw(): boolean{
    return this.boardState.flat().every(cell => cell != ''); 
  }

  public registerMove(row: number, column: number) {
    // handle case when player clicks on non-empty cell i.e. invlaid move
    if (this.gameOver ||  this.boardState[row][column] != '') {
      return;
    }

    const current_player = this.currentPlayer;
    console.log('Player: ', current_player);
    this.boardState[row][column] = current_player;

    // check for winner
    if (this.checkWinner()) {
      // alert("Winner")
      console.log('Player ${this.currentPlayer} wins the game!');
      this.gameOver = true;
      this.gameOverMessage = `Player ${this.currentPlayer} wins the game!`;
      return
    }

    // check for draw
    if (this.checkDraw()) {
      // alert("Draw")
      console.log("The game ends in a draw! Well played, both!");
      this.gameOver = true;
      this.gameOverMessage = `The game ends in a draw! Well played, both!`;
      return
    }

    this.togglePlayer();
    this.gameCurrentMessage = `It's Player ${this.currentPlayer}'s turn!`;
  }
}
