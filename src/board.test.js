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
    [1],[1,1],[1,1,1],[1,1,1,1],[],[1,1,1],
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

it('correctly checks if biggest movable stone', () => {
  expect(board.isBiggestStone(playerBlack('isAlmostDone'), black, 2)).toBe(false)
  expect(board.isBiggestStone(playerBlack('isAlmostDone'), black, 3)).toBe(true)
  expect(board.isBiggestStone(playerBlack('isAlmostDone'), black, 4)).toBe(false)

  expect(board.isBiggestStone(playerWhite('isAlmostDone'), white, 23)).toBe(false)
  expect(board.isBiggestStone(playerWhite('isAlmostDone'), white, 22)).toBe(true)
  expect(board.isBiggestStone(playerWhite('isAlmostDone'), white, 21)).toBe(false)
});

it('correctly checks if a field is occupied by opponent', () => {
  expect(board.isOccupied(playerBlack('isAlmostDone'), black, 8)).toBe(true)
  expect(board.isOccupied(playerBlack('isAlmostDone'), black, 9)).toBe(false)
  expect(board.isOccupied(playerBlack('isAlmostDone'), black, 10)).toBe(false)

  expect(board.isOccupied(playerWhite('isAlmostDone'), white, 17)).toBe(true)
  expect(board.isOccupied(playerWhite('isAlmostDone'), white, 16)).toBe(false)
  expect(board.isOccupied(playerWhite('isAlmostDone'), white, 15)).toBe(false)
});


it('correctly checks if a field is whites color', () => {
  expect(board.isMyColor(boardPosition.start, white, 1)).toBe(true)
  expect(board.isMyColor(boardPosition.start, white, 2)).toBe(false)
  expect(board.isMyColor(boardPosition.start, white, 6)).toBe(false)
  expect(board.isMyColor(boardPosition.start, white, 0)).toBe(true)  
});

it('correctly checks if a field is blacks color', () => {
  expect(board.isMyColor(boardPosition.start, black, 1)).toBe(false)
  expect(board.isMyColor(boardPosition.start, black, 2)).toBe(false)
  expect(board.isMyColor(boardPosition.start, black, 6)).toBe(true)
  expect(board.isMyColor(boardPosition.start, black, 25)).toBe(true)
});

it('correctly checks if a field is free', () => {
  expect(board.isFree(boardPosition.start, white, 1)).toBe(false)
  expect(board.isFree(boardPosition.start, white, 2)).toBe(true)
  expect(board.isFree(boardPosition.start, white, 6)).toBe(false)

  expect(board.isFree(boardPosition.start, black, 1)).toBe(false)
  expect(board.isFree(boardPosition.start, black, 2)).toBe(true)
  expect(board.isFree(boardPosition.start, black, 6)).toBe(false)
});

it('correctly checks if a field has not more than one stone', () => {
  expect(board.notMoreThanOne(playerWhite('bothHome'), 24)).toBe(true)
  expect(board.notMoreThanOne(playerWhite('bothHome'), 23)).toBe(false)
  expect(board.notMoreThanOne(playerWhite('bothHome'), 14)).toBe(true)

  expect(board.notMoreThanOne(playerBlack('bothHome'), 1)).toBe(true)
  expect(board.notMoreThanOne(playerBlack('bothHome'), 2)).toBe(false)
  expect(board.notMoreThanOne(playerBlack('bothHome'), 14)).toBe(true)
});

it('correctly checks if a field has more than one stone', () => {
  expect(board.moreThanOne(playerWhite('bothHome'), 24)).toBe(false)
  expect(board.moreThanOne(playerWhite('bothHome'), 23)).toBe(true)
  expect(board.moreThanOne(playerWhite('bothHome'), 14)).toBe(false)

  expect(board.moreThanOne(playerBlack('bothHome'), 1)).toBe(false)
  expect(board.moreThanOne(playerBlack('bothHome'), 2)).toBe(true)
  expect(board.moreThanOne(playerBlack('bothHome'), 14)).toBe(false)
});


it('correctly checks if a field is movable to', () => {
  expect(board.mayMoveTo(playerBlack('isAlmostHomeAndHasSomeOut'), black, 5, 2)).toBe(false)
  expect(board.mayMoveTo(playerBlack('isAlmostHomeAndHasSomeOut'), black, 23, 2)).toBe(true)
  expect(board.mayMoveTo(playerBlack('isAlmostHomeAndHasSomeOut'), black, 5, 5)).toBe(false)
  expect(board.mayMoveTo(playerBlack('isAlmostHomeAndHasSomeOut'), black, 4, 5)).toBe(false)
  expect(board.mayMoveTo(playerBlack('isAlmostHomeAndHasSomeOut'), black, 6, 2)).toBe(true)

  expect(board.mayMoveTo(playerWhite('isAlmostHomeAndHasSomeOut'), white, 20, 2)).toBe(false)
  expect(board.mayMoveTo(playerWhite('isAlmostHomeAndHasSomeOut'), white, 2, 2)).toBe(true)
  expect(board.mayMoveTo(playerWhite('isAlmostHomeAndHasSomeOut'), white, 20, 5)).toBe(false)
  expect(board.mayMoveTo(playerWhite('isAlmostHomeAndHasSomeOut'), white, 21, 5)).toBe(false)
  expect(board.mayMoveTo(playerWhite('isAlmostHomeAndHasSomeOut'), white, 19, 2)).toBe(true)
});

it('correctly checks if a field is movable to and is possible to move out if home', () => {
  expect(board.mayMoveTo(playerBlack('isHome'), black, 5, 2)).toBe(false)
  expect(board.mayMoveTo(playerBlack('isHome'), black, 6, 2)).toBe(true)
  expect(board.mayMoveTo(playerBlack('isHome'), black, 2, 2)).toBe(true)
  expect(board.mayMoveTo(playerBlack('isHome'), black, 2, 4)).toBe(false)
  expect(board.mayMoveTo(playerBlack('isHome'), black, 4, 4)).toBe(true)
  expect(board.mayMoveTo(playerBlack('isHome'), black, 6, 4)).toBe(true)
  expect(board.mayMoveTo(playerBlack('isAlmostDone'), black, 3, 3)).toBe(true)
  expect(board.mayMoveTo(playerBlack('isAlmostDone'), black, 2, 3)).toBe(false)
  expect(board.mayMoveTo(playerBlack('isAlmostDone'), black, 3, 2)).toBe(true)
  expect(board.mayMoveTo(playerBlack('isAlmostDone'), black, 2, 2)).toBe(true)
  expect(board.mayMoveTo(playerBlack('isAlmostDone'), black, 3, 4)).toBe(true)
  expect(board.mayMoveTo(playerBlack('isAlmostDone'), black, 2, 4)).toBe(false)


  expect(board.mayMoveTo(playerWhite('isHome'), white, 20, 2)).toBe(false)
  expect(board.mayMoveTo(playerWhite('isHome'), white, 19, 2)).toBe(true)
  expect(board.mayMoveTo(playerWhite('isHome'), white, 23, 2)).toBe(true)
  expect(board.mayMoveTo(playerWhite('isHome'), white, 23, 4)).toBe(false)
  expect(board.mayMoveTo(playerWhite('isHome'), white, 21, 4)).toBe(true)
  expect(board.mayMoveTo(playerWhite('isHome'), white, 19, 4)).toBe(true)
  expect(board.mayMoveTo(playerWhite('isAlmostDone'), white, 22, 3)).toBe(true)
  expect(board.mayMoveTo(playerWhite('isAlmostDone'), white, 23, 3)).toBe(false)
  expect(board.mayMoveTo(playerWhite('isAlmostDone'), white, 22, 2)).toBe(true)
  expect(board.mayMoveTo(playerWhite('isAlmostDone'), white, 23, 2)).toBe(true)
  expect(board.mayMoveTo(playerWhite('isAlmostDone'), white, 22, 4)).toBe(true)
  expect(board.mayMoveTo(playerWhite('isAlmostDone'), white, 23, 4)).toBe(false)
});

it('correctly checks if a field is movable to and is possible to move to if in bar', () => {
  expect(board.mayMoveTo(playerBlack('isBarAndRestHome'), black, 3, 3)).toBe(false)
  expect(board.mayMoveTo(playerBlack('isBarAndRestHome'), black, 6, 3)).toBe(false)
  expect(board.mayMoveTo(playerBlack('isBarAndRestHome'), black, 25, 1)).toBe(false)
  expect(board.mayMoveTo(playerBlack('isBarAndRestHome'), black, 25, 2)).toBe(true)

  expect(board.mayMoveTo(playerWhite('isBarAndRestHome'), white, 22, 3)).toBe(false)
  expect(board.mayMoveTo(playerWhite('isBarAndRestHome'), white, 19, 3)).toBe(false)
  expect(board.mayMoveTo(playerWhite('isBarAndRestHome'), white, 0, 1)).toBe(false)
  expect(board.mayMoveTo(playerWhite('isBarAndRestHome'), white, 0, 2)).toBe(true)
});
