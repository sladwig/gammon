import React from 'react';

class Field extends React.Component {
  onClick(id) {
    console.log('ab')
    if (this.hasStones()) {
      console.log('i have stones')
    }
    if (this.hasStonesOfCurrentPlayer()) {
      console.log('even of currentPlayer')
    }
    // if (this.isActive(id)) {
    //   console.log('cd')
    //   this.props.moves.moveStone(id);
    //   this.props.game.endTurn();
    // }
  }

  hasStones(){
    return this.props.boardField.length > 0;
  }
  hasStonesOfCurrentPlayer() {
    return this.props.ctx.currentPlayer === String(this.props.boardField[0])
  }

  // isActive(id) {
  //   if (this.props.ctx.gameover !== null) return false;
  //   // if (this.props.G.cells[id] !== null) return false;
  //   return true;
  // }



  render() {
    const cellStyle = {
      border: '1px solid #555',
      width: '50px',
      height: '50px',
      lineHeight: '50px',
      textAlign: 'center',
      float: 'left',
    };

    return (
      <div style={cellStyle} 
          id="field-{this.props.id}"
          key={this.props.id}
          onClick={() => this.onClick(this.props.id)}>
        {this.props.boardField}
      </div>
    );
  }
}

export default Field;