import {player} from './moving' 

const boardScenarios = {
  isHome: [
    [[],
    [1,1,1],[1,1,1],[1,1,1],[1,1,1],[0,0],[1,1,1],
    [],[0,0,0],[],[],[],[],
    [0,0,0,0,0],[],[],[],[],[],
    [],[],[],[],[],[0,0,0,0,0],
    []]
    , []],
  isHomeAndHasSomeOut: [
    [[1,1],
    [1,1],[1,1],[1,1,1],[1,1,1],[0,0],[1,1,1],
    [],[0,0,0],[],[],[],[],
    [0,0,0,0,0],[],[],[],[],[],
    [],[],[],[],[],[0,0,0,0,0],
    []]
    , []],
  bothHome: [
    [[1,1],
    [1],[1,1],[1,1,1],[1,1,1,1],[],[1,1,1],
    [],[],[],[],[],[],
    [],[],[],[],[],[],
    [],[],[0],[0,0],[0,0,0,0,0,0,0],[0,0,0,0,0],
    []]
    , []],
  isAlmostHomeAndHasSomeOut: [
    [[1,1],
    [1,1],[1,1],[1,1,1],[1,1,1],[0,0],[1,1],
    [],[0,0,0],[],[],[],[],
    [0,0,0,0,0],[],[],[],[],[],
    [],[],[],[],[1],[0,0,0,0,0],
    []]
    , []],
  isBarAndRestHome: [
    [[1,1],
    [1,1],[1,1],[1,1,1],[1,1,1],[0,0],[1,1],
    [],[0,0,0],[],[],[],[],
    [0,0,0,0,0],[],[],[],[],[],
    [],[],[],[],[],[0,0,0,0,0],
    []]
    , [1]],
  bothInBarAndRestHome: [
    [[1,1],
    [1,1],[1,1],[1],[1,1],[0,0],[1,1],
    [],[0,0,0],[],[],[],[],
    [0,0,0],[],[],[],[],[],
    [],[],[],[],[],[0,0,0,0],
    []]
    , [1, 1, 0, 1, 0, 1 ,0]],  
  isAlmostDone: [
    [[1,1,1,1,1,1,1,1,1,1],
    [1,1,1],[1],[1],[],[0,0],[],
    [],[0,0],[0],[],[],[],
    [0,0,0,0,0],[],[],[],[],[],
    [],[],[],[],[],[0,0,0,0,0],
    []]
    , []],
  hasWon: [
    [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [],[],[],[],[0,0],[],
    [],[0,0,0],[],[],[],[],
    [0,0,0,0,0],[],[],[],[],[],
    [],[],[],[],[],[0,0,0,0,0],
    []]
    , []],
  cantMove: [
    [[1,1],
    [0,0,0,0,0],[0,0],[0,0],[0,0],[0,0],[0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1],[],[],[],[],[],
    [],[],[],[],[],[],
    [],[],[],[],[],[],
    []]
    , []],
  cantMoveFromBar: [
    [[1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1],[],[],[],[],[],
    [],[],[],[],[],[],
    [],[],[],[],[],[],
    [0,0,0,0,0],[0,0],[0,0],[0,0],[0,0],[0,0],
    []]
    , [1]],
  isBarSurrounded: [
    [[1,1],
    [1,1],[1,1],[1,1,1],[1,1,1],[0,0],[1,1],
    [],[0,0,0],[],[],[],[],
    [0,0,0,0,0],[],[],[],[],[],
    [],[],[],[],[],[0,0,0,0,0],
    []]
    , [0,1,0]],

}


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

function getTokenForPlayer(currentPlayer, token) {
  if (token === 1) return stone.me(currentPlayer)
  if (token === 0) return stone.other(currentPlayer)
}

// generateBoard generates Boards by using a template,
// this way you can define a szenario on board and 
// generate the szenario for both players
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
        fieldResult.push(getTokenForPlayer(currentPlayer, token))
      }
      result.push(fieldResult)
    }
  }
  if (player.isWhite(currentPlayer)) {
    for (let i = useBoard.length -1; i >= 0 ; i--) { //field of useBoard) {
      let field = useBoard[i]
      let fieldResult = []
      for (let token of field) {
        fieldResult.push(getTokenForPlayer(currentPlayer, token))
      }
      result.push(fieldResult)
    }
  }
  let last = []
  for (let token of template[1]) {
    last.push(getTokenForPlayer(currentPlayer, token))
  }
  result.push(last);
  return result;
}

export {generateBoard as default, stone, boardScenarios};