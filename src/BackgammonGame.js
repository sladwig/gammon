import {Game} from 'boardgame.io/core';
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

function nextPlayer(currentPlayer, numPlayers) {
  return (+parseInt(currentPlayer, 10) + 1) % numPlayers + ''
}
function isFirstTurn(ctx) { return ctx.turn === 0 }
function playerRolledDice(openDice, player) {
  return openDice.map((dice) => ( dice[0])).includes(player) 
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
function hasNoDice(openDice) {
  return openDice.length === 0
}

const Backgammon = Game({
  setup: () => ({
    openDice: [],
    board: boardPosition.start,
    // board: generateBoard(boardScenarios.isAlmostDone, "0"), // testing see above
  }),

  moves: {
    rollDice(G, ctx, player, rollableDice) {
      let openDice = [...G.openDice]; // don't mutate original

      // first turn both are playing for first move
      if (isFirstTurn(ctx)) {
        if (!playerRolledDice(openDice, player)) {
          openDice.push([player, rollableDice.roll()])
        }

      // otherwise roll two dice
      } else {
        openDice = [rollableDice.roll(),rollableDice.roll()]

        // 4 moves if the eyes are equal
        if (openDice[0] === openDice[1]) {
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

      // only continue if move is legal
      if (!boarding.mayMoveTo(board, ctx.currentPlayer, at, dice)) {return {...G}}

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
    endTurnIf: (G, ctx) => {
      return (hasNoDice(G.openDice) && 
        !isFirstTurn(ctx) && !boarding.hasPossibleMoves(G.board, ctx.currentPlayer, G.openDice)) || 
      (isFirstTurn(ctx) && ctx.phase === "movingStones" &&hasNoDice(G.openDice) )
    },
    phases: [
      {
        name: 'rollingDice',
        allowedMoves: ['rollDice'],
        endPhaseIf: (G, ctx) => {
          return (hasTwoDice(G.openDice) &&isFirstTurn(ctx) && !isSameDice(G.openDice)) || (hasRolledDice(G.openDice) && !isFirstTurn(ctx))
        },
        onMove: (G, ctx) => {
          let openDice = [...G.openDice]; // don't mutate original
          if (isFirstTurn(ctx) && hasRolledDice(openDice)) {
            if (isSameDice(openDice)) {
              openDice = []
            }
          }
          return {...G, openDice}
        },
        onPhaseEnd: (G, ctx) => {
          // just let it run the first round
          if (ctx.turn > 0) return {...G};

          let openDice = [...G.openDice]; // don't mutate original

          // determine winner
          let winnerFirstRound = openDice[0][1] < openDice[1][1] ? openDice[1][0] : openDice[0][0]
          openDice = openDice.map((dice) => dice[1])
          
          return {...G, openDice, winnerFirstRound}
        },
        turnOrder: {
          first: (G, ctx) => {
            if (isFirstTurn(ctx) ) return 'any'
            return nextPlayer(ctx.currentPlayer, ctx.numPlayers);
          },
          next: (G, ctx) => {
            if (isFirstTurn(ctx) && hasTwoDice(G.openDice)) {
              return nextPlayer(G.winnerFirstRound, ctx.numPlayers) 
            }
            return ctx.currentPlayer
          },
        },
      },
      {
        name: 'movingStones', 
        allowedMoves: ['moveStone'],
        endPhaseIf: (G, ctx) => (hasNoDice(G.openDice)),
        turnOrder: {
          first: (G, ctx) => {
            if (isFirstTurn(ctx)) return G.winnerFirstRound
            return ctx.currentPlayer;
          },
          next: (G, ctx) => {
            return nextPlayer(ctx.currentPlayer, ctx.numPlayers);
          },
        }
      }
    ]
  }
});

export default Backgammon;