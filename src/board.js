import moving from './moving'
import {player} from './moving'

// #mayMoveTo(board, currentPlayer, at, dice)
// 0 < to < 25

// im groben drei 'phasen'
// 1: normales spiel
// 2: spieler ist bar muss wieder rein
// 3: spieler ist home spielt seine steine raus

// also this notion, that when you want to jump out
// with a high dice you somehow have to take the biggest

// raufspringbar
// frei, nur ein gegner, eigene
// im umkehrschluss eigentlich nur nich, 
// wenn mehr als ein gegenspieler da ist

// out erreichbar wenn spieler im home
// rauskommen

// isPlayable(board, currentPlayer, dice)
// hasMoves(board, currentPlayer, at, dices)
// possibleDestination(board, currentPlayer, at, selected, dice)

const has = function(player) {return (field) => {return field.includes(player)} }
const hasWhite = has(1)
const hasBlack = has(0)

function wantsOut(to) {
  return to === 0 || to === 25
}
function movesBar(from) {
  return from === 25 || from === 0
}

const board = {
  mayMoveTo(board, currentPlayer, at, dice) {
    let to = moving.to(currentPlayer, at, dice)

    // may only move my color
    if (!this.isMyColor(board, currentPlayer, at)) return false;

    // here the case of moving stones out only when home
    if (wantsOut(to)) {
      if (!this.isHome(board, currentPlayer)) return false;
      // also only the biggest stone may be used when dice is bigger
      if (moving.distance(at,to) < dice && !this.isBiggestStone(board, currentPlayer, at)) return false
    }
    
    // the case where player is Bar and wants back in the game
    if (this.isBar(board, currentPlayer) && !movesBar(at)) return false;
    
    // normal case, where you are not allowed to move on occupied fields
    if (this.isOccupied(board, currentPlayer, to)) return false;

    return true;
  },
  isBar(board, currentPlayer) {
    return board[26].includes(parseInt(currentPlayer))
  },
  isHome(board, currentPlayer) {
    if (this.isBar(board, currentPlayer)) return false;


    if (player.isWhite(currentPlayer)) {
      let index = board.map(hasWhite).indexOf(true)
      return 18 < index && index < 26
    }
    if (player.isBlack(currentPlayer)) {
      let index = board.map(hasBlack).lastIndexOf(true)
      return 0 <= index && index < 7
    }
    return false;
  },
  isBiggestStone(board, currentPlayer, at) {
    let index = -1;
    if (player.isWhite(currentPlayer)) {
      index = board.map(hasWhite).indexOf(true)
    }
    if (player.isBlack(currentPlayer)) {
      index = board.map(hasBlack).lastIndexOf(true)
    }
    return at === index 
  },
  isOccupied(board, currentPlayer, at) {
    return !this.isMyColor(board, currentPlayer, at) && board[at].length > 1
  },
  isMyColor(board, currentPlayer, at) {
    // for in bar purposes we handle this exceptions 
    // since normaly this are not the colors of the player 
    // either occupied by opponent or free, you could never
    // move back in from the bar 
    if (at===25 && player.isBlack(currentPlayer) && 
      board[26].includes(parseInt(currentPlayer))) return true;
    if (at===0 && player.isWhite(currentPlayer) && 
      board[26].includes(parseInt(currentPlayer))) return true;

    return board[at].includes(parseInt(currentPlayer))
  },
  // TODO: in use?
  isFree(board, currentPlayer, at) {
    return board[at].length === 0 
  },
  // TODO: in use?
  notMoreThanOne(board, at) {
    return board[at].length < 2;
  },
  // TODO: in use?
  moreThanOne(board, at) {
    return !this.notMoreThanOne(board, at);
  },
}

export default board;