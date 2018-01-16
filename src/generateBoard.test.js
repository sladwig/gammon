import React from 'react';
import renderer from 'react-test-renderer';
import generateBoard from './generateBoard'
import {stone} from './generateBoard';

const player = {black: "0", white: "1"}

// we are using a 6 field long board here
// where 1 in scenario is the current player
// and 0 in scenario is the other player
const boardScenarios = {
  aBoard: [
  [[],
  [1,1,1],[1,1],[1],[],[0],[0,0,0,0,0],
  []]
  , [1]]
}

it('correctly generateBoard for white', () => {
  expect(generateBoard(boardScenarios.aBoard, player.white)).toEqual([
  [],
  [0,0,0,0,0],[0],[],[1],[1,1],[1,1,1],
  []
  , [1]])
});


it('correctly generateBoard for black', () => {
  expect(generateBoard(boardScenarios.aBoard, player.black)).toEqual([
  [],
  [0,0,0],[0,0],[0],[],[1],[1,1,1,1,1],
  []
  , [0]])
});

it('correctly stones me and other', () => {
  expect(stone.me(player.white)).toBe(1)
  expect(stone.other(player.white)).toBe(0)

  expect(stone.me(player.black)).toBe(0)
  expect(stone.other(player.black)).toBe(1)
});
