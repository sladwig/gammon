import React from "react";
import "./DiceArea.css";
import playerColor from "./playerColor";

class DiceArea extends React.Component {
  handleClick = () => {
    if (this.firstRound() || this.playersTurn())
      this.props.onClick(this.props.player);
  };

  winnerArea = winner => {
    const { player } = this.props;
    let winnerText = winner === player ? "We have a winner!" : "well...";
    return (
      <div className={"dice-" + playerColor(player)} onClick={this.handleClick}>
        <p>{winnerText}</p>
      </div>
    );
  };

  noRolled = dices => dices.length === 0;
  firstRoundRoll = dices => Array.isArray(dices[0]);
  diceForPlayer = dices =>
    dices.filter(dice => dice[0] === this.props.player).map(dice => dice[1]);
  playersTurn = () => this.props.currentPlayer === this.props.player;
  firstRound = () => this.props.currentPlayer === "any";
  Dice = (dice, index) => (
    <div className={"dice dice-" + dice} key={"dice-" + index} />
  );

  render() {
    const { winner, player, currentPlayer, openDice } = this.props;

    // winner text if we have a winner
    if (winner) return this.winnerArea(winner);

    let dices = openDice;

    if (this.firstRoundRoll(dices)) dices = this.diceForPlayer(dices);
    if (!this.playersTurn() && !this.firstRound()) dices = [];
    dices = dices.map(this.Dice);
    if (this.noRolled(dices)) dices = <span>roll dice</span>;

    return (
      <div className={"dice-" + playerColor(player)} onClick={this.handleClick}>
        {dices}
      </div>
    );
  }
}

export default DiceArea;
