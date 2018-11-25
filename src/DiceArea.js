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

  winnerArea = (winner) => {
    return (
      let winnerText = winner === player ? "We have a winner!" : "well..."
      <div className={"dice-"+playerColor(player)} onClick={this.handleClick}>
        <p>{winnerText}</p>
      </div>
    );
  }

  noRolled = (dices) => dices.length === 0
  firsrRoundRoll = (dices) => Array.isArray(dices[0])
  diceForPlayer = (dices) => dices.filter((dice) => (dice[0] === this.props.player)).map((dice) => (dice[1]))
  playersTurn = () => this.props.currentPlayer === this.props.player
  firstRound = () => this.props.currentPlayer === "any"
  Dice = (dice, index) => (
      <div className={'dice dice-'+dice} key={'dice-'+index}></div>
    )

  render() {
    const {winner, player, currentPlayer, openDice} = this.props

    // winner text if we have a winner
    if (winner) return winnerArea(winner)

    let dices = openDice

    if (firstRoundRoll(dices)) dices = diceForPlayer(dices)
    if (!playersTurn() && !firstRound()) dices = []
    dices = dices.map(Dice)
    if (noRolled(dices)) dices = <span>roll dice</span>

    return (
      <div className={"dice-"+playerColor(player)} onClick={this.handleClick}>
        {dices}
      </div>
    );
  }
}

export default DiceArea;