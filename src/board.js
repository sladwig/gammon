import {player} from './moving'

// #mayMoveTo(board, currentPlayer, at, dice)
// 0 < to < 25

// im groben drei 'phasen'
// 1: normales spiel
// 2: spieler ist out muss wieder rein
// 3: spieler ist home spielt seine steine raus

// raufspringbar
// frei, nur ein gegner, eigene
// im umkehrschluss eigentlich nur nich, 
// wenn mehr als ein gegenspieler da ist

// out erreichbar wenn spieler im home
// rauskommen

// #isMyColor(board, currentPlayer, at)
// #isFreeToGo(board, currentPlayer, to)

const board = {
  isBar(board, currentPlayer) {
    return board[26].includes(parseInt(currentPlayer))
  },
  isHome(board, currentPlayer) {
    if (this.isBar(board, currentPlayer)) return false;


    if (player.isWhite(currentPlayer)) {
      let index = board.map((field) => {return field.includes(1)}).indexOf(true)
      return 18 < index && index < 26
    }
    if (player.isBlack(currentPlayer)) {
      let index = board.map((field) => {return field.includes(0)}).lastIndexOf(true)
      return 0 <= index && index < 7
    }
    return false;
  }
}

export default board;