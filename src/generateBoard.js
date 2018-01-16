import {player} from './moving' 


const stone = {
  me: function(currentPlayer) {
    if (player.isWhite(currentPlayer)) {return 1}
    if (player.isBlack(currentPlayer)) {return 0}
    return false
  },
  other(currentPlayer) {
    if (player.isWhite(currentPlayer)) {return 0}
    if (player.isBlack(currentPlayer)) {return 1}
    return false
  }

}

// generateBoard generates Boards by using a template,
// this way you can define a szenario on board and generate 
// the szenario for both players
// the templates are generally arrays of arrays, 
// which will be reversed for white 
// also the bar is an extra array which gets concated 
// to the end
// this method is quite ugly, but
// basically it is just used for tests
function generateBoard(template, currentPlayer) {
  let result = [];
  var useBoard = template[0].slice(0)
  if (player.isBlack(currentPlayer)) {
    for (let i = 0; i < useBoard.length ; i++) { //field of useBoard) {
      let field = useBoard[i]
      let fieldResult = []
      for (let token of field) {
        if (token === 1) {
          fieldResult.push(stone.me(currentPlayer))
        } 
        if (token === 0) {
          fieldResult.push(stone.other(currentPlayer))
        }
      }
      result.push(fieldResult)
    }
  }
  if (player.isWhite(currentPlayer)) {
    for (let i = useBoard.length -1; i >= 0 ; i--) { //field of useBoard) {
      let field = useBoard[i]
      let fieldResult = []
      for (let token of field) {
        if (token === 1) {
          fieldResult.push(stone.me(currentPlayer))
        } 
        if (token === 0) {
          fieldResult.push(stone.other(currentPlayer))
        }
      }
      result.push(fieldResult)
    }
  }
  let last = []
  for (let token of template[1]) {
    if (token === 1) {
      last.push(stone.me(currentPlayer))
    } 
    if (token === 0) {
      last.push(stone.other(currentPlayer))
    }
  }
  result.push(last);
  return result;
}

export {generateBoard as default, stone};