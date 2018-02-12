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

function nextPlayer(currentPlayer) {
  return (+parseInt(currentPlayer, 10) + 1) % 2 + ''
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
    rollDice(G, ctx, player, rollableDice1, rollableDice2) {
      if (rollableDice2 === undefined) rollableDice2 = rollableDice1
      let openDice = [...G.openDice]; // don't mutate original

      // first turn both are playing for first move
      if (isFirstTurn(ctx)) {
        if (!playerRolledDice(openDice, player)) {
          openDice.push([player, rollableDice1.roll()])
        }

      // otherwise roll two dice
      } else {
        openDice = [rollableDice1.roll(),rollableDice2.roll()]

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
      // we want the correct one from the bar
      if (fromOut(at) === 26) {
        board[to].push(...board[26].splice(board[26].indexOf(parseInt(ctx.currentPlayer, 10)), 1))
      } else {
        board[to].push(board[fromOut(at)].pop());
      }

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

          let player = ctx.currentPlayer === "any" ? G.winnerFirstRound: ctx.currentPlayer

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