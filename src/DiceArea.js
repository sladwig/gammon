import React from 'react';
import './DiceArea.css';
import playerColor from './playerColor' 

class DiceArea extends React.Component {
  handleClick = () => {
    const {currentPlayer, player, onClick} = this.props
    if (currentPlayer === "any" || currentPlayer === player) {
      onClick(player)
    }
  }

  render() {
    const {winner, player, currentPlayer, openDice} = this.props

    // winner text if we have a winner
    if (winner) {
      let winnerText = winner === player ? "We have a winner!" : "well..."
      return (
        <div className={"dice-"+playerColor(player)} onClick={this.handleClick}>
          <p>{winnerText}</p>
        </div>
      );
    }


    let dices = openDice 

    if (dices.length === 0) {
      dices = <span>roll dice</span>
    } else {
      if (Array.isArray(dices[0])) {
        dices = dices.filter((dice) => (dice[0] === player))
        if (dices.length === 0) {
          dices = <span>roll dice</span>
        } else {
          dices = dices.map((dice) => (dice[1]))
        }
      }
    }

    if (currentPlayer !== player && currentPlayer !== "any" ){
      dices = []
    }
    if (Array.isArray(dices)) {
      dices = dices.map((dice, index) => (
        <div className={'dice dice-'+dice} key={'dice-'+index}></div>
      ))
    }

    
    return (
      <div className={"dice-"+playerColor(player)} onClick={this.handleClick}>
        {dices}
      </div>
    );
  }
}

export default DiceArea;