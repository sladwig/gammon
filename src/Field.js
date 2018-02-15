import React from 'react';
import moving from './moving';
import boarding from './boarding';
import Token from './Token'
import './Field.css'

function fromOut(id) {
  if (id === 25 || id === 0) return 26
  return id
}

class Field extends React.Component {
  onClick(id) {
    let selected = this.props.selected
    // nothing selected -> select
    if (!selected && selected !== 0) {
      this.trySelecting(id)
      return 
    } 
    // deselect if same value
    if (selected===id) {
      this.props.selecting(null)
      return
    }

    // we have a selected
    // check if possible destination -> make move
    if (this.isPossibleDestination()) {
      let diceValue = moving.distance(selected, id);
      this.props.makeMove(selected, diceValue)
      this.props.selecting(null)
      return
    } 
    // home out situation
    let board = this.props.board
    let currentPlayer = this.props.ctx.currentPlayer
    if (boarding.isHome(board, currentPlayer) 
      && boarding.isBiggestStone(board, currentPlayer, selected)) {
      let diceValue = this.props.openDice.reduce((a,b) => {return Math.max(a,b)})
      this.props.makeMove(selected, diceValue)
      this.props.selecting(null)
      return
    }

    // else try to select
    this.trySelecting(id)    
  }
  trySelecting(id) {
    if (!this.hasStones()) { return this.props.selecting(null) } 
    if (!this.hasStonesOfCurrentPlayer()) { return this.props.selecting(null) }
    if (!this.hasPossibleMoves()) { return this.props.selecting(null) } 

    this.props.selecting(id)
  }
  hasStones(){
    return this.props.board[this.props.id].length > 0;
  }
  hasStonesOfCurrentPlayer() {
    return boarding.isMyColor(this.props.board, this.props.ctx.currentPlayer, fromOut(this.props.id))
  }
  hasPossibleMoves() {
    return this.possibleMoves().length > 0
  }
  // maybe better to name possibleDice
  possibleMoves() { 
    return this.props.openDice.filter((dice) => {
      return boarding.mayMoveTo(this.props.board, this.props.ctx.currentPlayer, fromOut(this.props.id), dice)
    });
  }  


  // if this is a selectable field  
  isPossibleDestination() {
    return this.props.destinations.includes(this.props.id)
  }


  render() {
    let selected = this.props.selected === this.props.id 
    let possible = this.isPossibleDestination() 

    let tokens = this.props.board[this.props.id]
    tokens = tokens.map((token, index) => {
      if (selected && index === tokens.length-1) {
        return <Token key={index} player={token} selected={true} /> 
      }
      return <Token key={index} player={token} />
    })

    if (possible) {
      tokens.push(<Token key={tokens.length+1} 
          player={this.props.ctx.currentPlayer} destination={true} />) 
    }
    return (
      <div id={"field-"+this.props.id}
          className="field"
          onClick={() => this.onClick(this.props.id)}>
        {tokens}
      </div>
    );
  }
}

export default Field;