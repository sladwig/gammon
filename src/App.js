import React, { Component } from 'react';
// import './App.css';

import {Client} from 'boardgame.io/client';
import {Game} from 'boardgame.io/core';
import BackgammonBoard from './BackgammonBoard'
import Dice from './Dice'

function IsVictory(board) {
  // Return true if `stones` is in a winning configuration.
  return board[0].length === 15 || board[25] === 15 
}

const Backgammon = Game({
  setup: () => ({
    // 0: out black
    // 1-6: home black
    // 7-18: field
    // 19-24: home white
    // 25: out white
    // 26: bar
    // start positions
    // white: 1/2 12/5 17/3 19/5  [1]
    // black: 6/5 8/3 13/5 24/2  [0]
    openDice: [],
    board: Array([],
      [1,1],[],[],[],[],[0,0,0,0,0],
      [],[0,0,0],[],[],[],[1,1,1,1,1],
      [0,0,0,0,0],[],[],[],[1,1,1],[],
      [1,1,1,1,1],[],[],[],[],[0,0],
      [],
      []) 
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
      // don't mutate original state.
      let board = [...G.board];
      let openDice = [...G.openDice];

      let diceValue = ctx.currentPlayer === "0" ? dice*-1 : dice

      // move stone
      board[at+diceValue].push(board[at].pop());

      // remove actual dice from open Dice
      let firstIndex = openDice.findIndex(function(result) { return result === dice}) 
      openDice.splice(firstIndex, 1)

      return {...G, board, openDice};      // don't mutate original state.
    }
  },
  flow: {
    endGameIf: (G, ctx) => {
      if (IsVictory(G.board)) {
        return ctx.currentPlayer;
      }
    }
  }
});

const App = Client({ game: Backgammon, board: BackgammonBoard });

export default App;
