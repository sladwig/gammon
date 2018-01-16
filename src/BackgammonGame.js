import {Game} from 'boardgame.io/core';
import Dice from './Dice'
import moving from './moving'
import boardPosition from './boardPosition'

function IsVictory(board) {
  // Return true if `stones` is in a winning configuration.
  return board[0].length === 15 || board[25].length === 15 
}

const Backgammon = Game({
  setup: () => ({
    openDice: [],
    board: boardPosition.start
  }),

  moves: {
    rollDice(G, ctx, numberOfDice) {
      let openDice = [...G.openDice]; // don't mutate original
      // openDice = Array(numberOfDice).map(function(dice) {return Dice.roll})
      openDice = [Dice.roll(),Dice.roll()]

      // 4 moves if the eyes are equal
      if (openDice[0] === openDice[1]) {
        openDice.push(openDice[0], openDice[0])
      }

      return {...G, openDice}; // don't mutate original state.
    },
    moveStone(G, ctx, at, dice) {
      if (!at) { return } else { console.log('stoping move no at')}
      if (!dice) { return } else { console.log('stoping move no dice')}

      // don't mutate original state.
      let board = [...G.board];
      let openDice = [...G.openDice];

      let diceValue = moving.direction(ctx.currentPlayer) * dice;
      let to = at+diceValue;
      console.log('value: ', diceValue, to)
      
      // sanitize to
      // TODO: here we can DRY it up in calculate Destination
      if (to < 1) { to = 1}
      if (to > 24) { to = 24}

      // check if we have a stone
      if (board[at].length === 0) {return}
      
      // move stone
      board[to].push(board[at].pop());

      // remove actual dice from open Dice
      let firstIndex = openDice.findIndex((result) => { return result === dice}) 
      openDice.splice(firstIndex, 1)

      return {...G, board, openDice};      // don't mutate original state.
    }
  },
  flow: {
    endGameIf: (G, ctx) => {
      if (IsVictory(G.board)) {
        return ctx.currentPlayer;
      }
    },
    endTurnIf: G => ( G.openDice.length === 0 ),
    phases: [
      {
        name: 'rolling dice',
        allowedMoves: ['rollDice'],
        endPhaseIf: G => ( G.openDice.length > 0 ),
      },
      {
        name: 'move stones', 
        allowedMoves: ['moveStone'],
        onPhaseEnd: (G) => {console.log('phase ending moving'); return G},
        endPhaseIf: G => ( G.openDice.length === 0 )
      }
    ]
  }
});

export default Backgammon;