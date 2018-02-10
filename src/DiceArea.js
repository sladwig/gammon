import React from 'react';
import './DiceArea.css';
import playerColor from './playerColor' 

class DiceArea extends React.Component {
  handleClick = () => {
    if (this.props.currentPlayer === "any" || this.props.currentPlayer === this.props.player) {
      this.props.onClick(this.props.player)
    }
  }

  render() {
    if (this.props.winner) {
      let winner = this.props.winner === this.props.player ? "We have a winner!" : "well..."
      return (
        <div className={"dice-"+playerColor(this.props.player)} onClick={this.handleClick}>
          <p>{winner}</p>
        </div>
      );
    }


    let dices = this.props.openDice 

    if (dices.length === 0) {
      dices = <span>roll dice</span>
    } else {
      if (Array.isArray(dices[0])) {
        dices = dices.filter((dice) => (dice[0] === this.props.player))
        if (dices.length === 0) {
          dices = <span>roll dice</span>
        } else {
          dices = dices.map((dice) => (dice[1]))
        }
      }
    }

    if (this.props.currentPlayer !== this.props.player && this.props.currentPlayer !== "any" ){
      dices = []
    }
    if (Array.isArray(dices)) {
      dices = dices.map((dice, index) => (
        <div className={'dice dice-'+dice} key={'dice-'+index}></div>
      ))
    }

    
    return (
      <div className={"dice-"+playerColor(this.props.player)} onClick={this.handleClick}>
        {dices}
      </div>
    );
  }
}

export default DiceArea;