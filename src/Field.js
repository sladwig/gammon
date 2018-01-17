import React from 'react';
import calculateDestination from './calculateDestination'
import moving from './moving';
import board from './board';


class Field extends React.Component {
  constructor(props) {
    super(props);
    this.calculateDestination = calculateDestination.bind(this);
  }

  onClick(id) {
    if (!this.props.selected) {
      this.trySelecting(id)
    } else {
      // we have a selected
      // check if possible destination -> make move
      if (this.isPossibleDestination()) {
        let diceValue = moving.distance(this.props.selected, id) ;
        this.props.makeMove(this.props.selected, diceValue)
        this.props.selecting(null)

      } else {
        // else try to select
        this.trySelecting(id)
      }
    }
  }
  trySelecting(id) {
    if (!this.hasStones()) { return } else { console.log('i have stones') }
    if (!this.hasStonesOfCurrentPlayer()) { return } else { console.log('even of currentPlayer') }
    if (!this.hasPossibleMoves()) { return; } else { console.log('i have possible moves')}

    this.props.selecting(id)
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
  // maybe better to name possibleDice
  possibleMoves() { 
    return this.props.openDice.filter((dice) => {
      return board.mayMoveTo(this.props.board, this.props.ctx.currentPlayer, this.props.id, dice)
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
        {this.props.boardField}{selected}{possible}
      </div>
    );
  }
}

export default Field;