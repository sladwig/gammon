const moving = { 
  direction(currentPlayer) {
    // console.log(currentPlayer)
    // is black
    if (currentPlayer === "0") {return -1}
    // is white
    if (currentPlayer === "1") {return 1}
    // else
    return 0
  },

  from(currentPlayer, at, dice) {
    return (this.direction(currentPlayer)*-1) * dice + at
  },

  to(currentPlayer, at, dice) {
    return this.direction(currentPlayer) * dice + at
  }
}
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

// #isHome(board, currentPlayer)
// #isOut(board, currentPlayer)
// #isMyColor(board, currentPlayer, at)
// #isFreeToGo(board, currentPlayer, to)
// #distance(from, to)
// #sanitize(to) - maybe better naming
//

export default moving;
// {cameFrom, moveTo, moveDirection};