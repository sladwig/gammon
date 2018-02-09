import React from 'react';
import renderer from 'react-test-renderer';
import {Client} from 'boardgame.io/client';
import BackgammonGame from './BackgammonGame'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

class TestBoard extends React.Component {
  render() {
    return <div id="board">Board</div>;
  }
}
function dice(returnValue) { 
  return {roll: ()=>(returnValue)}
}


// it('correctly handles first move', () => {
// it('correctly correctly sets first player', () => {

it('it correctly starts game', () => {
  const Board = Client({ game: BackgammonGame , board: TestBoard});
  const game = Enzyme.mount(<Board />);
  const board = game.find(TestBoard).instance();

  expect(board.props.ctx.turn).toBe(0)
  expect(board.props.ctx.currentPlayer).toEqual("any")
  expect(board.props.ctx.phase).toEqual("rollingDice")
  expect(board.props.G.openDice).toEqual([])


  board.props.moves.rollDice("0", dice(4))
  
  expect(board.props.ctx.turn).toBe(0)
  expect(board.props.ctx.currentPlayer).toEqual("any")
  expect(board.props.ctx.phase).toEqual("rollingDice")
  expect(board.props.G.openDice).toEqual([["0", 4]])


  board.props.moves.rollDice("0", dice(3))

  expect(board.props.ctx.turn).toBe(0)
  expect(board.props.ctx.currentPlayer).toEqual("any")
  expect(board.props.ctx.phase).toEqual("rollingDice")
  expect(board.props.G.openDice).toEqual([["0", 4]])


  // should reset dice correctly
  board.props.moves.rollDice("1", dice(4))

  expect(board.props.ctx.turn).toBe(0)
  expect(board.props.ctx.currentPlayer).toEqual("any")
  expect(board.props.ctx.phase).toEqual("rollingDice")
  expect(board.props.G.openDice).toEqual([])


  board.props.moves.rollDice("1", dice(4))
  board.props.moves.rollDice("0", dice(2))

  expect(board.props.ctx.turn).toBe(0)
  expect(board.props.ctx.currentPlayer).toEqual("1")
  expect(board.props.ctx.phase).toEqual("movingStones")
  expect(board.props.G.openDice).toEqual([4, 2])


  board.props.moves.moveStone(1, 4)

  expect(board.props.ctx.turn).toBe(0)
  expect(board.props.ctx.currentPlayer).toEqual("1")
  expect(board.props.ctx.phase).toEqual("movingStones")
  expect(board.props.G.openDice).toEqual([2])
  

  board.props.moves.moveStone(1, 2)

  expect(board.props.ctx.turn).toBe(1)
  expect(board.props.ctx.currentPlayer).toEqual("0")
  expect(board.props.ctx.phase).toEqual("rollingDice")
  expect(board.props.G.openDice).toEqual([])


  board.props.moves.rollDice("0", dice(4))

  expect(board.props.ctx.turn).toBe(1)
  expect(board.props.ctx.currentPlayer).toEqual("0")
  expect(board.props.ctx.phase).toEqual("movingStones")
  expect(board.props.G.openDice).toEqual([4,4,4,4])
});

