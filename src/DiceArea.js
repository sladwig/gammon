import React from 'react';
import './DiceArea.css';

class DiceArea extends React.Component {
  handleClick = () => {
    if (this.props.currentPlayer === "any" || this.props.currentPlayer === this.props.player) {
      this.props.onClick(this.props.player)
    }
  }

  playerColor() {
    if (this.props.player ==="0") return "black"
    if (this.props.player ==="1") return "white"
  }

  render() {
    // const diceStyle = {
    //   border: '1px solid #555',
    //   width: '50px',
    //   height: '50px',
    //   lineHeight: '50px',
    //   textAlign: 'center',
    //   float: 'left',
    // };

    let dices = this.props.openDice 

    if (dices.length === 0) {
      dices = 'roll Dice'
    } else {
      if (Array.isArray(dices[0])) {
        dices = dices.filter((dice) => (dice[0] === this.props.player))
        if (dices.length === 0) {
          dices = 'roll Dice'
        } else {
          dices = dices.map((dice) => dice[1])
        }
      }
    }

    
    return (
      <div className={"dice-"+this.playerColor()} onClick={this.handleClick}>
        {this.playerColor()}: {dices}
      </div>
    );
  }
}

export default DiceArea;