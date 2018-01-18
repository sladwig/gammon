import {Game} from 'boardgame.io/core';
import Dice from './Dice';
import moving from './moving';
import boarding from './board';
import boardPosition from './boardPosition';
// for testing scenarios
// import generateBoard from './generateBoard';
// import {boardScenarios} from './generateBoard';

function IsVictory(board) {
  // Return true if `stones` is in a winning configuration.
  return board[0].length === 15 || board[25].length === 15 
}

function fromOut(id) {
  if (id === 25 || id === 0) return 26
  return id
}

const Backgammon = Game({
  setup: () => ({
    openDice: [],
    board: boardPosition.start
    // board: generateBoard(boardScenarios.isAlmostDone, "0") // testing see above
  }),

  moves: {
    rollDice(G, ctx, numberOfDice) {
      let openDice = [...G.openDice]; // don't mutate original
      openDice = [Dice.roll(),Dice.roll()]

      // 4 moves if the eyes are equal
      if (openDice[0] === openDice[1]) {
        openDice.push(openDice[0], openDice[0])
      }

      return {...G, openDice}; // don't mutate original state.
    },
    moveStone(G, ctx, at, dice) {
      console.log('moveStone', G, ctx, at, dice)
      if (!at && at !== 0) { return G } else { console.log('stoping move no at')}
      if (!dice) { return G } else { console.log('stoping move no dice')}

      // don't mutate original state.
      let board = [...G.board];
      let openDice = [...G.openDice];

      // only continue if move is legal
      if (!boarding.mayMoveTo(board, ctx.currentPlayer, at, dice)) {return G}

      let to = moving.to(ctx.currentPlayer, at, dice)
      
      let throwOut = null
      // throw out
      if (!boarding.isMyColor(board, ctx.currentPlayer, to) &&
        boarding.exactlyOne(board, to)) {
        throwOut = board[to].pop();
      }
      // move stone
      board[to].push(board[fromOut(at)].pop());

      // execute throw out
      if (throwOut !== null) {
        board[26].push(throwOut)
      }

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
    endTurnIf: (G, ctx) => {
      return G.openDice.length === 0 || 
            !boarding.hasPossibleMoves(G.board, ctx.currentPlayer, G.openDice)
    },
    onTurnEnd: (G, ctx) => {
      if (G.openDice.length === 0) return G

      let openDice = [...G.openDice]; // don't mutate original

      openDice = []

      return {...G, openDice}; // don't mutate original state.
    },
    phases: [
      {
        name: 'rolling dice',
        allowedMoves: ['rollDice'],
        endPhaseIf: G => ( G.openDice.length > 0 ),
      },
      {
        name: 'move stones', 
        allowedMoves: ['moveStone'],
        endPhaseIf: (G, ctx) => ( G.openDice.length === 0 )
      }
    ]
  }
});

export default Backgammon;