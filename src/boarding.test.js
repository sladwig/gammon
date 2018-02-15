import React from 'react';
import renderer from 'react-test-renderer';
import generateBoard from './generateBoard'
import {boardScenarios} from './generateBoard'
import boarding from './boarding';
import boardPosition from './boardPosition';


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
  expect(boarding.isBar(playerWhite('isHome'), white)).toBe(false)
  expect(boarding.isBar(playerWhite('isBarAndRestHome'), white)).toBe(true)
});

it('correctly checks if white player is bar', () => {
  expect(boarding.isBar(playerBlack('isHome'), black)).toBe(false)
  expect(boarding.isBar(playerBlack('isBarAndRestHome'), black)).toBe(true)
});


it('correctly checks if white player is home', () => {
  expect(boarding.isHome(playerWhite('isHome'), white)).toBe(true)
  expect(boarding.isHome(playerWhite('isHomeAndHasSomeOut'), white)).toBe(true)
  expect(boarding.isHome(playerBlack('isHome'), white)).toBe(false)
  expect(boarding.isHome(playerWhite('bothHome'), white)).toBe(true)
  expect(boarding.isHome(boardPosition.start, white)).toBe(false)
  expect(boarding.isHome(playerWhite('isAlmostHomeAndHasSomeOut'), white)).toBe(false)
  expect(boarding.isHome(playerWhite('isBarAndRestHome'), white)).toBe(false)
});

it('correctly checks if black player is home', () => {
  expect(boarding.isHome(playerBlack('isHome'), black)).toBe(true)
  expect(boarding.isHome(playerBlack('isHomeAndHasSomeOut'), black)).toBe(true)
  expect(boarding.isHome(playerWhite('isHome'), black)).toBe(false)
  expect(boarding.isHome(playerBlack('bothHome'), black)).toBe(true)
  expect(boarding.isHome(boardPosition.start, black)).toBe(false)
  expect(boarding.isHome(playerBlack('isAlmostHomeAndHasSomeOut'), black)).toBe(false)
  expect(boarding.isHome(playerBlack('isBarAndRestHome'), black)).toBe(false)
});

it('correctly checks if biggest movable stone', () => {
  expect(boarding.isBiggestStone(playerBlack('isAlmostDone'), black, 2)).toBe(false)
  expect(boarding.isBiggestStone(playerBlack('isAlmostDone'), black, 3)).toBe(true)
  expect(boarding.isBiggestStone(playerBlack('isAlmostDone'), black, 4)).toBe(false)

  expect(boarding.isBiggestStone(playerWhite('isAlmostDone'), white, 23)).toBe(false)
  expect(boarding.isBiggestStone(playerWhite('isAlmostDone'), white, 22)).toBe(true)
  expect(boarding.isBiggestStone(playerWhite('isAlmostDone'), white, 21)).toBe(false)
});

it('correctly checks if a field is occupied by opponent', () => {
  expect(boarding.isOccupied(playerBlack('isAlmostDone'), black, 8)).toBe(true)
  expect(boarding.isOccupied(playerBlack('isAlmostDone'), black, 9)).toBe(false)
  expect(boarding.isOccupied(playerBlack('isAlmostDone'), black, 10)).toBe(false)

  expect(boarding.isOccupied(playerWhite('isAlmostDone'), white, 17)).toBe(true)
  expect(boarding.isOccupied(playerWhite('isAlmostDone'), white, 16)).toBe(false)
  expect(boarding.isOccupied(playerWhite('isAlmostDone'), white, 15)).toBe(false)
});


it('correctly checks if a field is whites color', () => {
  expect(boarding.isMyColor(boardPosition.start, white, 1)).toBe(true)
  expect(boarding.isMyColor(boardPosition.start, white, 2)).toBe(false)
  expect(boarding.isMyColor(boardPosition.start, white, 6)).toBe(false)
  expect(boarding.isMyColor(boardPosition.start, white, 0)).toBe(false) 
  expect(boarding.isMyColor(playerWhite('isBarAndRestHome'), white, 25)).toBe(true) 
});

it('correctly checks if a field is blacks color', () => {
  expect(boarding.isMyColor(boardPosition.start, black, 1)).toBe(false)
  expect(boarding.isMyColor(boardPosition.start, black, 2)).toBe(false)
  expect(boarding.isMyColor(boardPosition.start, black, 6)).toBe(true)
  expect(boarding.isMyColor(boardPosition.start, black, 25)).toBe(false)
  expect(boarding.isMyColor(playerBlack('isBarAndRestHome'), black, 25)).toBe(true)
});


it('correctly checks if a field has exactly one stone', () => {
  expect(boarding.exactlyOne(playerWhite('bothHome'), 24)).toBe(true)
  expect(boarding.exactlyOne(playerWhite('bothHome'), 23)).toBe(false)
  expect(boarding.exactlyOne(playerWhite('bothHome'), 14)).toBe(false)
  expect(boarding.exactlyOne(playerWhite('bothHome'), 4)).toBe(true)
  expect(boarding.exactlyOne(playerWhite('bothHome'), 3)).toBe(false)

  expect(boarding.exactlyOne(playerBlack('bothHome'), 1)).toBe(true)
  expect(boarding.exactlyOne(playerBlack('bothHome'), 2)).toBe(false)
  expect(boarding.exactlyOne(playerBlack('bothHome'), 14)).toBe(false)
  expect(boarding.exactlyOne(playerBlack('bothHome'), 21)).toBe(true)
  expect(boarding.exactlyOne(playerBlack('bothHome'), 22)).toBe(false)
});


it('correctly checks if a field is movable to', () => {
  expect(boarding.mayMoveTo(playerBlack('isAlmostHomeAndHasSomeOut'), black, 5, 2)).toBe(false)
  expect(boarding.mayMoveTo(playerBlack('isAlmostHomeAndHasSomeOut'), black, 23, 2)).toBe(true)
  expect(boarding.mayMoveTo(playerBlack('isAlmostHomeAndHasSomeOut'), black, 5, 5)).toBe(false)
  expect(boarding.mayMoveTo(playerBlack('isAlmostHomeAndHasSomeOut'), black, 4, 5)).toBe(false)
  expect(boarding.mayMoveTo(playerBlack('isAlmostHomeAndHasSomeOut'), black, 6, 2)).toBe(true)

  expect(boarding.mayMoveTo(playerWhite('isAlmostHomeAndHasSomeOut'), white, 20, 2)).toBe(false)
  expect(boarding.mayMoveTo(playerWhite('isAlmostHomeAndHasSomeOut'), white, 2, 2)).toBe(true)
  expect(boarding.mayMoveTo(playerWhite('isAlmostHomeAndHasSomeOut'), white, 20, 5)).toBe(false)
  expect(boarding.mayMoveTo(playerWhite('isAlmostHomeAndHasSomeOut'), white, 21, 5)).toBe(false)
  expect(boarding.mayMoveTo(playerWhite('isAlmostHomeAndHasSomeOut'), white, 19, 2)).toBe(true)
});

it('correctly checks if a field is movable to and is possible to move out if home', () => {
  expect(boarding.mayMoveTo(playerBlack('isHome'), black, 5, 2)).toBe(false)
  expect(boarding.mayMoveTo(playerBlack('isHome'), black, 6, 2)).toBe(true)
  expect(boarding.mayMoveTo(playerBlack('isHome'), black, 2, 2)).toBe(true)
  expect(boarding.mayMoveTo(playerBlack('isHome'), black, 2, 4)).toBe(false)
  expect(boarding.mayMoveTo(playerBlack('isHome'), black, 4, 4)).toBe(true)
  expect(boarding.mayMoveTo(playerBlack('isHome'), black, 6, 4)).toBe(true)
  expect(boarding.mayMoveTo(playerBlack('isAlmostDone'), black, 3, 3)).toBe(true)
  expect(boarding.mayMoveTo(playerBlack('isAlmostDone'), black, 2, 3)).toBe(false)
  expect(boarding.mayMoveTo(playerBlack('isAlmostDone'), black, 3, 2)).toBe(true)
  expect(boarding.mayMoveTo(playerBlack('isAlmostDone'), black, 2, 2)).toBe(true)
  expect(boarding.mayMoveTo(playerBlack('isAlmostDone'), black, 3, 4)).toBe(true)
  expect(boarding.mayMoveTo(playerBlack('isAlmostDone'), black, 2, 4)).toBe(false)


  expect(boarding.mayMoveTo(playerWhite('isHome'), white, 20, 2)).toBe(false)
  expect(boarding.mayMoveTo(playerWhite('isHome'), white, 19, 2)).toBe(true)
  expect(boarding.mayMoveTo(playerWhite('isHome'), white, 23, 2)).toBe(true)
  expect(boarding.mayMoveTo(playerWhite('isHome'), white, 23, 4)).toBe(false)
  expect(boarding.mayMoveTo(playerWhite('isHome'), white, 21, 4)).toBe(true)
  expect(boarding.mayMoveTo(playerWhite('isHome'), white, 19, 4)).toBe(true)
  expect(boarding.mayMoveTo(playerWhite('isAlmostDone'), white, 22, 3)).toBe(true)
  expect(boarding.mayMoveTo(playerWhite('isAlmostDone'), white, 23, 3)).toBe(false)
  expect(boarding.mayMoveTo(playerWhite('isAlmostDone'), white, 22, 2)).toBe(true)
  expect(boarding.mayMoveTo(playerWhite('isAlmostDone'), white, 23, 2)).toBe(true)
  expect(boarding.mayMoveTo(playerWhite('isAlmostDone'), white, 22, 4)).toBe(true)
  expect(boarding.mayMoveTo(playerWhite('isAlmostDone'), white, 23, 4)).toBe(false)
});

it('correctly checks if a field is movable to and is possible to move to if in bar', () => {
  expect(boarding.mayMoveTo(playerBlack('isBarAndRestHome'), black, 3, 3)).toBe(false)
  expect(boarding.mayMoveTo(playerBlack('isBarAndRestHome'), black, 6, 3)).toBe(false)
  expect(boarding.mayMoveTo(playerBlack('isBarAndRestHome'), black, 25, 1)).toBe(false)
  expect(boarding.mayMoveTo(playerBlack('isBarAndRestHome'), black, 25, 2)).toBe(true)

  expect(boarding.mayMoveTo(playerWhite('isBarAndRestHome'), white, 22, 3)).toBe(false)
  expect(boarding.mayMoveTo(playerWhite('isBarAndRestHome'), white, 19, 3)).toBe(false)
  expect(boarding.mayMoveTo(playerWhite('isBarAndRestHome'), white, 0, 1)).toBe(false)
  expect(boarding.mayMoveTo(playerWhite('isBarAndRestHome'), white, 0, 2)).toBe(true)
});


it('correctly checks if a player has possible moves', () => {
  expect(boarding.hasPossibleMoves(playerBlack('cantMove'), black, [1, 3])).toBe(false)
  expect(boarding.hasPossibleMoves(playerBlack('cantMove'), white, [1, 3])).toBe(true)
  expect(boarding.hasPossibleMoves(playerBlack('isAlmostDone'), black, [1, 3])).toBe(true)
  expect(boarding.hasPossibleMoves(playerBlack('isBarAndRestHome'), black, [1, 1])).toBe(false)
  expect(boarding.hasPossibleMoves(playerBlack('isBarAndRestHome'), black, [1, 4])).toBe(true)
});

it('correctly checks if black may move to', () => {
  expect(boarding.mayMoveTo(boardPosition.start, black, 24, 5)).toBe(false)
  expect(boarding.mayMoveTo(boardPosition.start, black, 24, 2)).toBe(true)
});

it('correctly checks if black may move to with an array', () => {
  expect(boarding.mayMoveTo(boardPosition.start, black, 24, [])).toBe(false)
  expect(boarding.mayMoveTo(boardPosition.start, black, 24, ["0", 2])).toBe(false)
});

