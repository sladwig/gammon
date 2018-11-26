import React from 'react';
import renderer from 'react-test-renderer';
import { Client } from 'boardgame.io/react';
// import Random from './Dice'
import BackgammonGame from './BackgammonGame';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import boardPosition from './boardPosition';
import generateBoard from './generateBoard';
import { boardScenarios } from './generateBoard';

Enzyme.configure({ adapter: new Adapter() });

class TestBoard extends React.Component {
  render() {
    return <div id="board">Board</div>;
  }
}

let black = '0';
let white = '1';

// it('correctly handles first move', () => {
// it('correctly correctly sets first player', () => {
it('it correctly starts game', () => {
  // using normal start configuration
  let Backgammon = {
    ...BackgammonGame,
    setup: () => ({ openDice: [], board: boardPosition.start }),
  };

  const Board = Client({ game: Backgammon, board: TestBoard });
  const game = Enzyme.mount(<Board />);
  const board = game.find(TestBoard).instance();

  expect(board.props.ctx.turn).toBe(0);
  expect(board.props.ctx.currentPlayer).toEqual('any');
  expect(board.props.ctx.phase).toEqual('rollingDice');
  expect(board.props.G.openDice).toEqual([]);

  // dice(4)
  board.props.moves.rollDice('0', { D6: () => 4 });

  expect(board.props.ctx.turn).toBe(0);
  expect(board.props.ctx.currentPlayer).toEqual('any');
  expect(board.props.ctx.phase).toEqual('rollingDice');
  expect(board.props.G.openDice).toEqual([['0', 4]]);

  // dice(3)
  board.props.moves.rollDice('0', { D6: () => 3 });

  expect(board.props.ctx.turn).toBe(0);
  expect(board.props.ctx.currentPlayer).toEqual('any');
  expect(board.props.ctx.phase).toEqual('rollingDice');
  expect(board.props.G.openDice).toEqual([['0', 4]]);

  // should reset dice correctly
  // dice(4)
  board.props.moves.rollDice('1', { D6: () => 4 });

  expect(board.props.ctx.turn).toBe(0);
  expect(board.props.ctx.currentPlayer).toEqual('any');
  expect(board.props.ctx.phase).toEqual('rollingDice');
  expect(board.props.G.openDice).toEqual([]);

  // dice(4)
  board.props.moves.rollDice('1', { D6: () => 4 });

  // dice(2)
  board.props.moves.rollDice('0', { D6: () => 2 });

  expect(board.props.ctx.turn).toBe(0);
  expect(board.props.ctx.currentPlayer).toEqual('1');
  expect(board.props.ctx.phase).toEqual('movingStones');
  expect(board.props.G.openDice).toEqual([4, 2]);

  board.props.moves.moveStone(1, 4);

  expect(board.props.ctx.turn).toBe(0);
  expect(board.props.ctx.currentPlayer).toEqual('1');
  expect(board.props.ctx.phase).toEqual('movingStones');
  expect(board.props.G.openDice).toEqual([2]);

  board.props.moves.moveStone(1, 2);

  expect(board.props.ctx.turn).toBe(1);
  expect(board.props.ctx.currentPlayer).toEqual('0');
  expect(board.props.ctx.phase).toEqual('rollingDice');
  expect(board.props.G.openDice).toEqual([]);

  // dice(4)
  board.props.moves.rollDice('0', { D6: () => 4 });

  expect(board.props.ctx.turn).toBe(1);
  expect(board.props.ctx.currentPlayer).toEqual('0');
  expect(board.props.ctx.phase).toEqual('movingStones');
  expect(board.props.G.openDice).toEqual([4, 4, 4, 4]);
});

it('it correctly ends round when there is no possible move left', () => {
  let Backgammon = {
    ...BackgammonGame,
    setup: () => ({ openDice: [], board: generateBoard(boardScenarios.cantMoveFromBar, '0') }),
  };

  const Board = Client({ game: Backgammon, board: TestBoard });
  const game = Enzyme.mount(<Board />);
  const board = game.find(TestBoard).instance();

  expect(board.props.ctx.turn).toBe(0);
  expect(board.props.ctx.currentPlayer).toEqual('any');
  expect(board.props.ctx.phase).toEqual('rollingDice');
  expect(board.props.G.openDice).toEqual([]);

  // dice(board, 2)
  board.props.moves.rollDice('0', { D6: () => 2 });

  expect(board.props.G.openDice).toEqual([['0', 2]]);

  // dice(board, 1)
  board.props.moves.rollDice('1', { D6: () => 1 });

  // it's blacks turn, but since black cant move
  // new round for white
  expect(board.props.ctx.turn).toBe(1);
  expect(board.props.ctx.currentPlayer).toEqual('1');
  expect(board.props.ctx.phase).toEqual('rollingDice');
  expect(board.props.G.openDice).toEqual([]);
});

it('it correctly moves stone out of bar', () => {
  let Backgammon = {
    ...BackgammonGame,
    setup: () => ({ openDice: [], board: generateBoard(boardScenarios.isBarSurrounded, '0') }),
  };
  const Board = Client({ game: Backgammon, board: TestBoard });
  const game = Enzyme.mount(<Board />);
  const board = game.find(TestBoard).instance();

  let { turn, currentPlayer, phase } = board.props.ctx;
  expect(board.props.ctx.turn).toBe(0);
  expect(board.props.ctx.currentPlayer).toEqual('any');
  expect(board.props.ctx.phase).toEqual('rollingDice');
  expect(board.props.G.openDice).toEqual([]);

  // dice(4)
  board.props.moves.rollDice(black, { D6: () => 4 });
  expect(board.props.G.openDice).toEqual([[black, 4]]);

  // dice(3)
  board.props.moves.rollDice(white, { D6: () => 3 });

  expect(board.props.ctx.turn).toBe(0);
  expect(board.props.G.openDice).toEqual([4, 3]);
  expect(board.props.ctx.phase).toEqual('movingStones');
  expect(board.props.ctx.currentPlayer).toEqual(black);

  board.props.moves.moveStone(25, 4);

  expect(board.props.ctx.turn).toBe(0);
  expect(board.props.ctx.currentPlayer).toEqual(black);
  expect(board.props.ctx.phase).toEqual('movingStones');
  expect(board.props.G.openDice).toEqual([3]);
  expect(board.props.G.board[26]).toEqual([1, 1]);
  expect(board.props.G.board[21]).toEqual([0]);
});

it('it correctly starts with a new set of dice after one dice is not movable anymore', () => {
  let Backgammon = {
    ...BackgammonGame,
    setup: () => ({
      openDice: [],
      board: generateBoard(boardScenarios.bothInBarAndRestHome, black),
    }),
  };

  const Board = Client({ game: Backgammon, board: TestBoard });
  const game = Enzyme.mount(<Board />);
  const board = game.find(TestBoard).instance();

  expect(board.props.ctx.turn).toBe(0);
  expect(board.props.ctx.currentPlayer).toEqual('any');
  expect(board.props.ctx.phase).toEqual('rollingDice');
  expect(board.props.G.openDice).toEqual([]);

  // dice(3)
  board.props.moves.rollDice(black, { D6: () => 3 });
  expect(board.props.G.openDice).toEqual([[black, 3]]);

  // dice(4)
  board.props.moves.rollDice(white, { D6: () => 4 });

  // it's blacks turn, but since black cant move
  // new round for white
  expect(board.props.ctx.turn).toBe(0);
  expect(board.props.ctx.currentPlayer).toEqual(white);
  expect(board.props.ctx.phase).toEqual('movingStones');
  expect(board.props.G.openDice).toEqual([3, 4]);

  board.props.moves.moveStone(0, 3);

  expect(board.props.ctx.turn).toBe(1);
  expect(board.props.ctx.currentPlayer).toEqual(black);
  expect(board.props.G.openDice).toEqual([]);
  expect(board.props.ctx.phase).toEqual('rollingDice');
  expect(board.props.G.board[26]).toEqual([0, 0, 0, 1, 0, 1, 0]);
  expect(board.props.G.board[3]).toEqual([1]);
});
