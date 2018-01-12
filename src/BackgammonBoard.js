import React from 'react';
import DiceArea from './DiceArea';
import PlayerTurn from './PlayerTurn';
import Fields from './Fields';

class BackgammonBoard extends React.Component {
  // I think we should implement an isActive here?
  // isActive(id) {
  //   if (this.props.ctx.gameover !== null) return false;
  //   // if (this.props.G.cells[id] !== null) return false;
  //   return true;
  // }

  rollTheDice = () => {
    if (this.props.G.openDice.length === 0) {
      this.props.moves.rollDice()
    }
  }
  makeMove = (from, dice) => {
    console.log('making move', from, dice, this.props.moves)
    this.props.moves.moveStone(from, dice)
  }


  render() {

    let winner = '';
    // if (this.props.ctx.gameover !== null) {
    //   winner = <div>Winner: {this.props.ctx.gameover}</div>;
    // }

    return (
      <div id="board">
        <Fields board={this.props.G.board} 
                ctx={this.props.ctx} 
                openDice={this.props.G.openDice}
                makeMove={this.makeMove}/>
        <br/>
        {winner}
        <DiceArea openDice={this.props.G.openDice} onClick={this.rollTheDice}/>
        <PlayerTurn currentPlayer={this.props.ctx.currentPlayer} />
      </div>
    );
  }
}

export default BackgammonBoard;