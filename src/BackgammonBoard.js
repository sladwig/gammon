import React from 'react';
import DiceArea from './DiceArea';
import PlayerTurn from './PlayerTurn';

class BackgammonBoard extends React.Component {
  onClick(id) {
    console.log('ab')
    if (this.isActive(id)) {
      console.log('cd')
      this.props.moves.moveStone(id);
      this.props.game.endTurn();
    }
  }

  isActive(id) {
    if (this.props.ctx.gameover !== null) return false;
    // if (this.props.G.cells[id] !== null) return false;
    return true;
  }

  render() {
    const cellStyle = {
      border: '1px solid #555',
      width: '50px',
      height: '50px',
      lineHeight: '50px',
      textAlign: 'center',
      float: 'left',
    };

    let fields = [];

    for (let i=0; i < this.props.G.board.length; i++) {
      // do not render black outm white out and bar
      if ([0,25,26].includes(i)) continue;

      let field = this.props.G.board[i];

      fields.push(
        <div style={cellStyle}
            key={i}
            onClick={() => this.onClick(i)}>
          {field} 
        </div>
      );
    }

    let winner = '';
    // if (this.props.ctx.gameover !== null) {
    //   winner = <div>Winner: {this.props.ctx.gameover}</div>;
    // }

    return (
      <div id="board">
        <div id="fields">
          {fields}
        </div>
        <br/>
        {winner}
        <DiceArea openDice={this.props.G.openDice} />
        <PlayerTurn currentPlayer={this.props.ctx.currentPlayer} />
      </div>
    );
  }
}

export default BackgammonBoard;