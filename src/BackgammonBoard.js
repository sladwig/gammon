import React from 'react';
import DiceArea from './DiceArea';
import PlayerTurn from './PlayerTurn';
import Fields from './Fields';
import Dice from './Dice';

class BackgammonBoard extends React.Component {
  // I think we should implement an isActive here?

  rollTheDice = (player) => {
    if (this.props.G.openDice.length < 2) {
      this.props.moves.rollDice(player, Dice)
    }
  }
  makeMove = (from, dice) => {
    this.props.moves.moveStone(from, dice)
  }


  render() {
    let winner = '';
    if (this.props.ctx.gameover !== null) {
      winner = <div>Winner: {this.props.ctx.gameover}</div>;
    }

    return (
      <div id="board">
        <Fields board={this.props.G.board} 
                ctx={this.props.ctx} 
                openDice={this.props.G.openDice}
                makeMove={this.makeMove}/>
        <br/>
        {winner}
        <DiceArea openDice={this.props.G.openDice} 
            onClick={this.rollTheDice} 
            currentPlayer={this.props.ctx.currentPlayer} 
            player="0" />
        <DiceArea openDice={this.props.G.openDice} 
            onClick={this.rollTheDice} 
            currentPlayer={this.props.ctx.currentPlayer} 
            player="1" />
        <PlayerTurn currentPlayer={this.props.ctx.currentPlayer} 
          phase={this.props.ctx.phase} />
      </div>
    );
  }
}

export default BackgammonBoard;