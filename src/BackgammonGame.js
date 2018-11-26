import {Game} from 'boardgame.io/core';
import moving from './moving';
import boarding from './boarding';
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

function nextPlayer(currentPlayer) {
  return (+parseInt(currentPlayer, 10) + 1) % 2 + ''
}
function isFirstTurn(ctx) { return ctx.turn === 0 }
function playerRolledDice(openDice, player) {
  return openDice.map((dice) => dice[0]).includes(player)
}
function isSameDice(openDice) {
  if (openDice.length < 2) return false
  return openDice[0][1] === openDice[1][1]
}
function hasTwoDice(openDice) {
  return openDice.length === 2
}
function hasRolledDice(openDice) {
  return openDice.length > 1
}
function moveStoneOn(board, from, to) {
  // instead of pushing and poping
  // we create a new 'clone' of the arrays
  let popping = board[from].slice(-1)
  board[to] = [...board[to], ...popping]
  board[from] = board[from].slice(0, -1)
}
const withoutIndex = (array, at) => ([...array.slice(0,at), ...array.slice(++at)])
const isPasch = (dices) => dices[0] === dices[1]

const Backgammon = Game({
  name: 'backgammon',

  setup: () => ({
    openDice: [],
    board: boardPosition.start,
    // board: generateBoard(boardScenarios.isAlmostDone, "0"), // testing see above
  }),

  moves: {
    rollDice(G, ctx, player, random) {
      random = random || ctx.random
      let openDice = [...G.openDice]; // don't mutate original

      // first turn both are playing for first move
      if (isFirstTurn(ctx)) {
        if (!playerRolledDice(openDice, player)) {
          openDice.push([player, random.D6()])
        }
      } else {
        // otherwise roll two dice
        openDice = [random.D6(),random.D6()]

        // 4 moves if the eyes are equal
        if (isPasch(openDice)) {
          openDice.push(openDice[0], openDice[0])
        }
      }
      return {...G, openDice}; // don't mutate original state.
    },
    moveStone(G, ctx, at, dice) {
      if (!at && at !== 0) { return {...G} }
      if (!dice) { return {...G} }

      // don't mutate original state.
      let board = [...G.board];
      let openDice = [...G.openDice];
      let currentPlayer = ctx.currentPlayer;

      // only continue if move is legal
      if (!boarding.mayMoveTo(board, currentPlayer, at, dice)) {return {...G}}

      let to = moving.to(currentPlayer, at, dice)

      // throw out
      if (!boarding.isMyColor(board, currentPlayer, to) &&
        boarding.exactlyOne(board, to)) {
        moveStoneOn(board, to, 26)
      }

      // move stone
      // we want the correct one from the bar
      if (fromOut(at) === 26) {
        let stoneIndex = board[26].indexOf(parseInt(currentPlayer, 10))
        let popping = board[26][stoneIndex]
        board[to] = [...board[to], popping]
        board[26] = withoutIndex(board[26], stoneIndex)
      } else {
        moveStoneOn(board, fromOut(at), to)
      }

      // remove actual dice from open Dice
      let firstIndex = openDice.findIndex((result) => (result === dice))
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
    // undo: true,
    onTurnEnd: (G, ctx) => ( {...G, openDice: []} ),
    phases: [
      {
        name: 'rollingDice',
        allowedMoves: ['rollDice'],
        endPhaseIf: (G, ctx) => {
          return hasRolledDice(G.openDice) && !!G.winnerFirstRound
        },
        endTurnIf: (G, ctx) => {
          if (!G.winnerFirstRound) return false

          let player = ctx.currentPlayer === "any" ? G.winnerFirstRound : ctx.currentPlayer

          return !boarding.hasPossibleMoves(G.board, player, G.openDice)
        },
        onMove: (G, ctx) => {
          // only in first turn
          if (!isFirstTurn(ctx)) return {...G};

          let openDice = [...G.openDice]; // don't mutate original
          // wait for other player
          if (!hasRolledDice(openDice)) return {...G};
          // roll again if same dice
          if (isSameDice(openDice)) return {...G, openDice: []}

          // determine winner
          let winnerFirstRound = openDice[0][1] < openDice[1][1] ? openDice[1][0] : openDice[0][0]
          openDice = openDice.map((dice) => dice[1])

          return {...G, openDice, winnerFirstRound}
        },
        turnOrder: {
          first: (G, ctx) => {
            if (isFirstTurn(ctx) ) return 'any'
            return nextPlayer(ctx.currentPlayer);
          },
          next: (G, ctx) => {
            if ((isFirstTurn(ctx) && hasTwoDice(G.openDice)) || (isFirstTurn(ctx) && ctx.currentPlayer === "any")) {
              return nextPlayer(G.winnerFirstRound)
            }
            return nextPlayer(ctx.currentPlayer)
          },
        },
      },
      {
        name: 'movingStones',
        allowedMoves: ['moveStone'],
        endPhaseIf: (G, ctx) => {
          return !boarding.hasPossibleMoves(G.board, ctx.currentPlayer, G.openDice)
        },
        endTurnIf: (G, ctx) => {
          return !boarding.hasPossibleMoves(G.board, ctx.currentPlayer, G.openDice)
        },
        onPhaseEnd: (G, ctx) => ({...G, openDice: []}),
        turnOrder: {
          first: (G, ctx) => {
            if (isFirstTurn(ctx)) return G.winnerFirstRound
            return ctx.currentPlayer;
          },
          next: (G, ctx) => {
            return nextPlayer(ctx.currentPlayer);
          },
        }
      }
    ]
  }
});

export default Backgammon;