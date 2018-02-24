import React from 'react';
import moving from './moving';
import boarding from './boarding';
import Token from './Token'
import './Field.css'
import {player} from './moving'


function fromOut(id) {
  if (id === 25 || id === 0) return 26
  return id
}

function out(currentPlayer) {
  if (currentPlayer === "0") {return 0}
  if (currentPlayer === "1") {return 25}
  return false
}

function justOne(possibleMoves) {
  return possibleMoves.length === 1
}
function allSame(possibleMoves) {
  if (possibleMoves.length < 2) return false
  return possibleMoves[0] === possibleMoves[1]
}

class Field extends React.Component {
  onClick(id) {
    let selected = this.props.selected

    // nothing selected -> select
    if (!selected && selected !== 0) {
      this.trySelecting(this.myID())
      return 
    } 
    // deselect if same value
    if (selected===this.myID()) {
      this.props.selecting(null)
      return
    }

    // we have a selected
    // check if possible destination -> make move
    if (this.isPossibleDestination()) {
      let diceValue = moving.distance(selected, id);
      this.props.makeMove(selected, diceValue)
      return
    } 

    // home out situation
    let board = this.props.board
    let currentPlayer = this.props.currentPlayer
    if (this.isPossibleDestination() && boarding.isHome(board, currentPlayer) 
      && boarding.isBiggestStone(board, currentPlayer, selected)) {
      let highestDice = this.props.openDice.reduce((a,b) => {return Math.max(a,b)})
      this.props.makeMove(selected, highestDice)
      return
    }

    // else try to select
    this.trySelecting(this.myID())    
  }
  onDoubleClick(id) {
    let selected = this.myID()
    let possibleMoves = this.possibleMoves()

    // move if there is just one possible move
    // or move if we have a pasch
    if (justOne(possibleMoves) || allSame(possibleMoves)) {
      this.props.makeMove(selected, possibleMoves[0])
      return
    }

    // move if isHome and ...
    if (boarding.isHome(this.props.board, this.props.currentPlayer)) {
      // ... direct out with a dice
      let distanceHome = moving.distance(out(this.props.currentPlayer), selected)
      if (this.props.openDice.includes(distanceHome)) {
        this.props.makeMove(selected, distanceHome)
        return
      } 

      // ... isBiggestStone and we have a higher dice than distance home
      // always use the biggest dice
      let higherDice = this.props.openDice.sort().reverse().find((dice) => (dice > distanceHome))
      if (boarding.isBiggestStone(this.props.board, this.props.currentPlayer, selected) && higherDice) {
        this.props.makeMove(selected, higherDice)
        return        
      }
    }
  }
  myID() {
    if (this.props.id === 26) {
      if (player.isWhite(this.props.currentPlayer)) return 0 
      if (player.isBlack(this.props.currentPlayer)) return 25
    }
    return this.props.id 
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
    return boarding.isMyColor(this.props.board, this.props.currentPlayer, fromOut(this.props.id))
  }
  hasPossibleMoves() {
    return this.possibleMoves().length > 0
  }
  // maybe better to name possibleDice
  possibleMoves() { 
    return this.props.openDice.filter((dice) => {
      return boarding.mayMoveTo(this.props.board, this.props.currentPlayer, this.myID(), dice)
    });
  }  

  // if this is a selectable field  
  isPossibleDestination() {
    return this.props.destinations.includes(this.myID())
  }

  render() {
    let selected = this.props.selected === this.props.id 

    let tokens = this.props.board[this.props.id]
    tokens = tokens.map((token, index) => {
      return <Token key={index} player={token} selected={selected && index === tokens.length-1} /> 
    })

    if (this.isPossibleDestination() ) {
      tokens.push(<Token key={tokens.length+1} 
          player={this.props.currentPlayer} destination={true} />) 
    }
    return (
      <div id={"field-"+this.props.id}
          className="field"
          onClick={() => this.onClick(this.props.id)}
          onDoubleClick={() => this.onDoubleClick(this.props.id)}>
        {tokens}
      </div>
    );
  }
}

export default Field;