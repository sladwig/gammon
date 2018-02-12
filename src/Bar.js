import React from 'react';
import Field from './Field';
import {player} from './moving'
import board from './board'
import Token from './Token'

class Bar extends Field {
  onClick(id) {
    if (this.props.selected===this.myID()) {
      this.props.selecting(null)
      return
    }

    this.trySelecting(this.myID())
  }

  possibleMoves() { 
    return this.props.openDice.filter((dice) => {
      return board.mayMoveTo(this.props.board, this.props.ctx.currentPlayer, this.myID(), dice)
    });
  } 

  myID() {
    if (player.isWhite(this.props.ctx.currentPlayer)) return 0 
    if (player.isBlack(this.props.ctx.currentPlayer)) return 25
    return false  
  }

  render() {
    let selected = this.props.selected === this.myID() 

    let tokens = this.props.board[this.props.id]
    let first = true
    tokens = tokens.map((token, index) => {
      let isSelected = selected && ''+token === this.props.ctx.currentPlayer && first;
      if (isSelected) first = false;
      return <Token key={index} player={token} selected={isSelected} /> 
    })

    return (
      <div id={"field-"+this.props.id}
          className="bar"
          onClick={() => this.onClick(this.myID())}>
        {tokens}
      </div>
    );
  }
}

export default Bar;