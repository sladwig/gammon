import React from 'react';
import renderer from 'react-test-renderer';
import generateBoard from './generateBoard'
import board from './board';
import boardPosition from './boardPosition';

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
    [1,1],[1,1],[1,1,1],[1,1,1],[],[1,1,1],
    [],[],[],[],[],[],
    [],[],[],[],[],[],
    [],[],[],[0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0],
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

}

const white = "1"
const black = "0"

// for cleanup
function playerWhite(scenario) { 
  return generateBoard(boardScenarios[scenario], white)
}
function playerBlack(scenario) {
  return generateBoard(boardScenarios[scenario], black)
}

it('correctly checks if white player is bar', () => {
  expect(board.isBar(playerWhite('isHome'), white)).toBe(false)
  expect(board.isBar(playerWhite('isBarAndRestHome'), white)).toBe(true)
});

it('correctly checks if white player is bar', () => {
  expect(board.isBar(playerBlack('isHome'), black)).toBe(false)
  expect(board.isBar(playerBlack('isBarAndRestHome'), black)).toBe(true)
});

it('correctly checks if white player is home', () => {
  expect(board.isHome(playerWhite('isHome'), white)).toBe(true)
  expect(board.isHome(playerWhite('isHomeAndHasSomeOut'), white)).toBe(true)
  expect(board.isHome(playerBlack('isHome'), white)).toBe(false)
  expect(board.isHome(playerWhite('bothHome'), white)).toBe(true)
  expect(board.isHome(boardPosition.start, white)).toBe(false)
  expect(board.isHome(playerWhite('isAlmostHomeAndHasSomeOut'), white)).toBe(false)
  expect(board.isHome(playerWhite('isBarAndRestHome'), white)).toBe(false)
});

it('correctly checks if black player is home', () => {
  expect(board.isHome(playerBlack('isHome'), black)).toBe(true)
  expect(board.isHome(playerBlack('isHomeAndHasSomeOut'), black)).toBe(true)
  expect(board.isHome(playerWhite('isHome'), black)).toBe(false)
  expect(board.isHome(playerBlack('bothHome'), black)).toBe(true)
  expect(board.isHome(boardPosition.start, black)).toBe(false)
  expect(board.isHome(playerBlack('isAlmostHomeAndHasSomeOut'), black)).toBe(false)
  expect(board.isHome(playerBlack('isBarAndRestHome'), black)).toBe(false)
});


