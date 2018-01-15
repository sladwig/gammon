import React from 'react';
import moveDirection from './moveDirection'
import calculateDestination from './calculateDestination'

class Field extends React.Component {
  constructor(props) {
    super(props);
    this.calculateDestination = calculateDestination.bind(this);
  }

  onClick(id) {
    if (!this.props.selected) {
      // no selection
      if (!this.hasStones()) { return } else { console.log('i have stones') }
      if (!this.hasStonesOfCurrentPlayer()) { return } else { console.log('even of currentPlayer') }
      if (!this.hasPossibleMoves()) { return; } else { console.log('i have possible moves')}

      console.log('set selected ' + id)
      this.props.selecting(this.props.id)
    } else {
      // we have a selected
      // check if possible destination -> make move

      if (this.isPossibleDestination()) {
        let diceValue = this.props.selected + (moveDirection(this.props.ctx.currentPlayer) * id) ;
        this.props.makeMove(this.props.selected, diceValue)
        // this.props.selecting(null)

      } else {
      // else try to select
        console.log('set selected ' + id)
        this.props.selecting(this.props.id)
      }
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
  isPossibleDestination() {
    // console.log('possible to ', this.possibleDestinations(), this.props.id, this.props.id+1, this.possibleDestinations().includes(23), (this.possibleDestinations()[0] || 1 ) + 2)
    return this.props.openDice.map((dice) => {
      return this.props.id + moveDirection(dice)
    }).includes(this.props.selected)
  }
  possibleDestinations() {
    if (!this.hasStonesOfCurrentPlayer()) { return [] }
    return this.possibleMoves().map(this.calculateDestination); 
  }
  // calculateDestination = (dice) => {
  //   // here is some logic needed for home out scenario
  //   let to = this.props.id + (moveDirection(this.props.ctx.currentPlayer) * dice)
  //   if (to < 1) { to = 1}
  //   if (to > 24) { to = 24}
  //   return to;
  // }
  possibleMoves() {
    return this.props.openDice.filter((dice) => {
      let to = this.calculateDestination(dice) 
      // this.props.id + (moveDirection(this.props.ctx.currentPlayer) * dice);
      
      // darf bewegt werden, wenn to = frei
      // darf bewegt werden wenn to = nur 1 gegnerisches feld
      // darf bewegt werden, wenn to = eigene steine
      // darf raus bewegt werden, wenn to < 1..24 < to (je nach spieler) und alle in home

      if (this.props.board[to].length === 0) {return true}

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
    // console.log('i am ', this.props.id, ' possible ', this.isPossibleDestination())
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