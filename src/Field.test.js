import React from 'react';
import renderer from 'react-test-renderer';
import Field from './Field';
import boardPosition from './boardPosition';
import generateBoard from './generateBoard';
import { boardScenarios } from './generateBoard';

const blackPlayer = '0';
const whitePlayer = '1';

it('has Stones', () => {
  const component = renderer.create(
    <Field
      id={1}
      currentPlayer={{}}
      openDice={[]}
      board={boardPosition.start}
      selected={false}
      destinations={[]}
      selecting={() => {}}
      makeMove={() => {}}
    />
  );
  expect(component.getInstance().hasStones()).toBe(true);
});

it('has no Stones', () => {
  const component = renderer.create(
    <Field
      id={1}
      currentPlayer={{}}
      openDice={[]}
      board={boardPosition.empty}
      selected={false}
      destinations={[]}
      selecting={() => {}}
      makeMove={() => {}}
    />
  );
  expect(component.getInstance().hasStones()).toBe(false);
});

it('white has Stones', () => {
  const component = renderer.create(
    <Field
      id={1}
      currentPlayer={whitePlayer}
      openDice={[]}
      board={boardPosition.start}
      selected={false}
      destinations={[]}
      selecting={() => {}}
      makeMove={() => {}}
    />
  );
  expect(component.getInstance().hasStonesOfCurrentPlayer()).toBe(true);
});

it('white has no black Stones', () => {
  const component = renderer.create(
    <Field
      id={1}
      currentPlayer={whitePlayer}
      openDice={[]}
      board={boardPosition.empty}
      selected={false}
      destinations={[]}
      selecting={() => {}}
      makeMove={() => {}}
    />
  );
  expect(component.getInstance().hasStonesOfCurrentPlayer()).toBe(false);
});

it('white has no empty Stones', () => {
  const component = renderer.create(
    <Field
      id={1}
      currentPlayer={whitePlayer}
      openDice={[]}
      board={boardPosition.empty}
      selected={false}
      destinations={[]}
      selecting={() => {}}
      makeMove={() => {}}
    />
  );
  expect(component.getInstance().hasStonesOfCurrentPlayer()).toBe(false);
});

it('black has Stones', () => {
  const component = renderer.create(
    <Field
      id={6}
      currentPlayer={blackPlayer}
      openDice={[]}
      board={boardPosition.start}
      selected={false}
      destinations={[]}
      selecting={() => {}}
      makeMove={() => {}}
    />
  );
  expect(component.getInstance().hasStonesOfCurrentPlayer()).toBe(true);
});

it('black has no white Stones', () => {
  const component = renderer.create(
    <Field
      id={1}
      currentPlayer={blackPlayer}
      openDice={[]}
      board={boardPosition.empty}
      selected={false}
      destinations={[]}
      selecting={() => {}}
      makeMove={() => {}}
    />
  );
  expect(component.getInstance().hasStonesOfCurrentPlayer()).toBe(false);
});

it('black has no empty Stones', () => {
  const component = renderer.create(
    <Field
      id={1}
      currentPlayer={blackPlayer}
      openDice={[]}
      board={boardPosition.empty}
      selected={false}
      destinations={[]}
      selecting={() => {}}
      makeMove={() => {}}
    />
  );
  expect(component.getInstance().hasStonesOfCurrentPlayer()).toBe(false);
});

// start: [[],
//    [1,1],[],[],[],[],[0,0,0,0,0],
//    [],[0,0,0],[],[],[],[1,1,1,1,1],
//    [0,0,0,0,0],[],[],[],[1,1,1],[],
//    [1,1,1,1,1],[],[],[],[],[0,0],
//    [],
//    []],

it('isPossibleDestination for black and respects possible moves', () => {
  // we are using the start position here so 6 cant move
  // with 5 to one because it is occupied
  const component = renderer.create(
    <Field
      id={1}
      currentPlayer={blackPlayer}
      openDice={[2, 5]}
      board={boardPosition.start}
      selected={6}
      selecting={() => {}}
      destinations={[4]}
      makeMove={() => {}}
    />
  );
  expect(component.getInstance().isPossibleDestination()).toEqual(false);
});
// basically the logic is not in field anymore!?
it('out isPossibleDestination for black, if player is home', () => {
  const component = renderer.create(
    <Field
      id={0}
      currentPlayer={blackPlayer}
      openDice={[2, 5]}
      board={generateBoard(boardScenarios.isAlmostDone)}
      selected={5}
      selecting={() => {}}
      destinations={[0]}
      makeMove={() => {}}
    />
  );
  expect(component.getInstance().isPossibleDestination()).toEqual(true);
});
it('out isPossibleDestination for black, if player is home and almost done and dice bigger than stone ', () => {
  const component = renderer.create(
    <Field
      id={0}
      currentPlayer={blackPlayer}
      openDice={[2, 5]}
      board={generateBoard(boardScenarios.isAlmostDone, '0')}
      selected={3}
      selecting={() => {}}
      destinations={[0, 2]}
      makeMove={() => {}}
    />
  );
  expect(component.getInstance().isPossibleDestination()).toEqual(true);
});
it('out NOT isPossibleDestination for black, if player is home and almost done and dice smaller than stone ', () => {
  const component = renderer.create(
    <Field
      id={0}
      currentPlayer={blackPlayer}
      openDice={[2, 1]}
      board={generateBoard(boardScenarios.isAlmostDone, '0')}
      selected={3}
      selecting={() => {}}
      destinations={[1, 2]}
      makeMove={() => {}}
    />
  );
  expect(component.getInstance().isPossibleDestination()).toEqual(false);
});

it('isPossibleDestination for white and respects possible moves', () => {
  const component = renderer.create(
    <Field
      id={24}
      currentPlayer={whitePlayer}
      openDice={[2, 5]}
      board={boardPosition.start}
      selected={19}
      selecting={() => {}}
      destinations={[]}
      makeMove={() => {}}
    />
  );
  expect(component.getInstance().isPossibleDestination()).toEqual(false);
});

// is possible destination
it('isPossibleDestination for black', () => {
  const component = renderer.create(
    <Field
      id={2}
      currentPlayer={blackPlayer}
      openDice={[2, 4]}
      board={boardPosition.empty}
      selected={6}
      selecting={() => {}}
      destinations={[4, 2]}
      makeMove={() => {}}
    />
  );
  expect(component.getInstance().isPossibleDestination()).toEqual(true);
});

it('not isPossibleDestination for black', () => {
  const component = renderer.create(
    <Field
      id={3}
      currentPlayer={blackPlayer}
      openDice={[2, 4]}
      board={boardPosition.empty}
      selected={6}
      selecting={() => {}}
      destinations={[]}
      makeMove={() => {}}
    />
  );
  expect(component.getInstance().isPossibleDestination()).toEqual(false);
});

it('isPossibleDestination for white', () => {
  const component = renderer.create(
    <Field
      id={8}
      currentPlayer={whitePlayer}
      openDice={[2, 4]}
      board={boardPosition.empty}
      selected={6}
      selecting={() => {}}
      destinations={[8, 10]}
      makeMove={() => {}}
    />
  );
  expect(component.getInstance().isPossibleDestination()).toEqual(true);
});

it('not isPossibleDestination for white', () => {
  const component = renderer.create(
    <Field
      id={11}
      currentPlayer={whitePlayer}
      openDice={[2, 4]}
      board={boardPosition.empty}
      selected={6}
      selecting={() => {}}
      destinations={[]}
      makeMove={() => {}}
    />
  );
  expect(component.getInstance().isPossibleDestination()).toEqual(false);
});
