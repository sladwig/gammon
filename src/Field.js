import React from 'react';
import moving from './moving';
import board from './board';


function fromOut(id) {
  if (id === 25 || id === 0) return 26
  return id
}


class Field extends React.Component {
  onClick(id) {
    // nothing selected -> select
    if (!this.props.selected && this.props.selected !== 0) {
      this.trySelecting(id)
      return 
    } 
    // deselect if same value
    if (this.props.selected===id) {
      this.props.selecting(null)
      return
    }

    // we have a selected
    // check if possible destination -> make move
    if (this.isPossibleDestination()) {
      let diceValue = moving.distance(this.props.selected, id);
      this.props.makeMove(this.props.selected, diceValue)
      this.props.selecting(null)
      return
    } 
    // home out situation
    if (board.isHome(this.props.board, this.props.ctx.currentPlayer) 
      && board.isBiggestStone(this.props.board, this.props.ctx.currentPlayer, this.props.selected)) {
      let diceValue = this.props.openDice.reduce((a,b) => {return Math.max(a,b)})
      this.props.makeMove(this.props.selected, diceValue)
      this.props.selecting(null)
      return
    }

    // else try to select
    this.trySelecting(id)    
  }
  trySelecting(id) {
    if (!this.hasStones()) { return } else { console.log('i have stones') }
    if (!this.hasStonesOfCurrentPlayer()) { return } else { console.log('even of currentPlayer') }
    if (!this.hasPossibleMoves()) { return; } else { console.log('i have possible moves')}

    this.props.selecting(id)
  }
  hasStones(){
    return this.props.board[this.props.id].length > 0;
  }
  hasStonesOfCurrentPlayer() {
    return board.isMyColor(this.props.board, this.props.ctx.currentPlayer, fromOut(this.props.id))
  }
  hasPossibleMoves() {
    return this.possibleMoves().length > 0
  }
  // maybe better to name possibleDice
  possibleMoves() { 
    return this.props.openDice.filter((dice) => {
      return board.mayMoveTo(this.props.board, this.props.ctx.currentPlayer, fromOut(this.props.id), dice)
    });
  }  


  // if this is a selectable field  
  isPossibleDestination() {
    return !board.isOccupied(this.props.board, this.props.ctx.currentPlayer, this.props.id) 
      && this.isPossibleDestinationOf().includes(this.props.selected)
  }
  isPossibleDestinationOf() {
    return this.props.openDice.map((dice) => {
      return moving.from(this.props.ctx.currentPlayer, this.props.id, dice)
    })
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
    let possible = this.isPossibleDestination() ? '?' : ""

    return (
      <div style={cellStyle} 
          id="field-{this.props.id}"
          key={this.props.id}
          onClick={() => this.onClick(this.props.id)}>
        {this.props.board[this.props.id]}{selected}{possible}
      </div>
    );
  }
}

export default Field;