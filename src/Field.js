import React from 'react';
import moveDirection from './moveDirection'

class Field extends React.Component {
  onClick(id) {
    console.log('ab')
    if (!this.hasStones()) {
      return;
    } else {
      console.log('i have stones')
    }
    if (!this.hasStonesOfCurrentPlayer()) {
      return;
    } else {
      console.log('even of currentPlayer')
    }
    if (!this.hasPossibleMoves()) {
      return;
    } else {
      console.log('i have possible moves')
    }
    console.log('is selected: ' + this.props.selected)
    if (!this.props.selected) {
      console.log('set selected ' + id)
      this.props.selecting(this.props.id)
    } else {
      // if possible move - make move
      this.props.selecting(this.props.id)
    }
  }

  hasStones(){
    return this.props.boardField.length > 0;
  }
  hasStonesOfCurrentPlayer() {
    return this.props.ctx.currentPlayer === String(this.props.boardField[0])
  }
  hasPossibleMoves() {
    return this.possibleMoves().length > 0
  }
  possibleMoves() {
    return this.props.openDice.filter((dice) => {
      let to = this.props.id + (moveDirection(this.props.ctx.currentPlayer) * dice);
      // darf bewegt werden, wenn to = frei
      // darf bewegt werden wenn to = nur 1 gegnerisches feld
      // darf bewegt werden, wenn to = eigene steine
      // darf raus bewegt werden, wenn to < 1..24 < to (je nach spieler) und alle in home
      if (this.props.board[to].length === 0) {return true}
      // if (this.props.board[to].length === 0) {return true} 

      return false;
    });
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

    let selected = this.props.selected === this.props.id ? "*" : ""

    return (
      <div style={cellStyle} 
          id="field-{this.props.id}"
          key={this.props.id}
          onClick={() => this.onClick(this.props.id)}>
        {this.props.boardField}{selected}
      </div>
    );
  }
}

export default Field;