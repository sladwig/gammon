import React from 'react';
import DiceArea from './DiceArea';
import Dice from './Dice';
import './BackgammonBoard.css'
import Field from './Field';
import Bar from './Bar';
import Out from './Out';
import moving from './moving'
import boarding from './boarding'

class BackgammonBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: null, destinations: [] };
  }

  rollTheDice = (player) => {
    if (this.props.G.openDice.length < 2) {
      this.props.moves.rollDice(player, Dice)
    }
  }
  makeMove = (from, dice) => {
    this.props.moves.moveStone(from, dice)
    this.selecting(null)
  }
  selecting = (at) => {
    if (at === null) {
      this.setState({selected: null, destinations: []})
      return
    }
    const {currentPlayer} = this.props.ctx
    const {openDice, board} = this.props.G

    let destinations = openDice.filter(
      (dice) => 
      boarding.mayMoveTo(board, currentPlayer, at, dice)
    ).map((dice) => 
      moving.to(currentPlayer, at, dice)
    )

    this.setState({selected: at, destinations: destinations})
  }



  render() {
    const {openDice, board} = this.props.G
    const {currentPlayer, gameover} = this.props.ctx
    const {selected, destinations} = this.state

    let fields = [];
    for (let i=13; i < 25; i++) {
      fields.push(
        <Field key={i} 
                id={i} 
                currentPlayer={this.props.ctx.currentPlayer} 
                openDice={openDice} 
                board={board}
                selected={selected}
                destinations={destinations}
                selecting={this.selecting}
                makeMove={this.makeMove} />
      );
    }
    for (let i=12; i > 0; i--) {
      fields.push(
        <Field key={i} 
                id={i} 
                currentPlayer={currentPlayer} 
                openDice={openDice} 
                board={board}
                selected={selected}
                destinations={destinations}
                selecting={this.selecting}
                makeMove={this.makeMove} />
      );
    }


    return (
      <div className="board">
        <div className="left"></div>
        <Bar id={26} 
          currentPlayer={currentPlayer} 
          openDice={openDice} 
          board={board}
          selected={selected}
          destinations={destinations}
          selecting={this.selecting}
          makeMove={this.makeMove} />
        <div className="right">
          <Out id={25} 
              currentPlayer={currentPlayer} 
              openDice={openDice} 
              board={board}
              selected={selected}
              destinations={destinations}
              selecting={this.selecting}
              makeMove={this.makeMove} />
          <div className="spacefill">&nbsp;</div>
          <Out id={0} 
              currentPlayer={currentPlayer} 
              openDice={openDice} 
              board={board}
              selected={selected}
              destinations={destinations}
              selecting={this.selecting}
              makeMove={this.makeMove} />
        </div>
        <DiceArea openDice={openDice} 
            onClick={this.rollTheDice} 
            currentPlayer={currentPlayer} 
            player="1" 
            winner={gameover} />
        <DiceArea openDice={openDice} 
            onClick={this.rollTheDice} 
            currentPlayer={currentPlayer} 
            player="0"
            winner={gameover} />

        {fields}
      </div>
    );
  }
}

export default BackgammonBoard;