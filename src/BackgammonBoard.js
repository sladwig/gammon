import React from 'react';
import DiceArea from './DiceArea';
import Dice from './Dice';
import './BackgammonBoard.css'
import Field from './Field';
import Bar from './Bar';
import Out from './Out';
import moving from './moving'
import board from './board'

class BackgammonBoard extends React.Component {
  // I think we should implement an isActive here?
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
  }
  selecting = (at) => {
    if (at === null) {
      this.setState({selected: null, destinations: []})
      return
    }
    let destinations = this.props.G.openDice.filter(
      (dice) => 
      board.mayMoveTo(this.props.G.board, this.props.ctx.currentPlayer, at, dice)
    ).map((dice) => 
      moving.to(this.props.ctx.currentPlayer, at, dice)
    )

    this.setState({selected: at, destinations: destinations})
  }



  render() {
    let fields = [];
    for (let i=13; i < 25; i++) {
      fields.push(
        <Field key={i} 
                id={i} 
                ctx={this.props.ctx} 
                openDice={this.props.G.openDice} 
                board={this.props.G.board}
                selected={this.state.selected}
                destinations={this.state.destinations}
                selecting={this.selecting}
                makeMove={this.makeMove} />
      );
    }
    for (let i=12; i > 0; i--) {
      fields.push(
        <Field key={i} 
                id={i} 
                ctx={this.props.ctx} 
                openDice={this.props.G.openDice} 
                board={this.props.G.board}
                selected={this.state.selected}
                destinations={this.state.destinations}
                selecting={this.selecting}
                makeMove={this.makeMove} />
      );
    }


    return (
      <div className="board">
        <div className="left"></div>
        <Bar id={26} 
          ctx={this.props.ctx} 
          openDice={this.props.G.openDice} 
          board={this.props.G.board}
          selected={this.state.selected}
          destinations={this.state.destinations}
          selecting={this.selecting}
          makeMove={this.props.makeMove} />
        <div className="right">
          <Out id={25} 
              ctx={this.props.ctx} 
              openDice={this.props.G.openDice} 
              board={this.props.G.board}
              selected={this.state.selected}
              destinations={this.state.destinations}
              selecting={this.selecting}
              makeMove={this.makeMove} />
          <div className="spacefill">&nbsp;</div>
          <Out id={0} 
              ctx={this.props.ctx} 
              openDice={this.props.G.openDice} 
              board={this.props.G.board}
              selected={this.state.selected}
              destinations={this.state.destinations}
              selecting={this.selecting}
              makeMove={this.makeMove} />
        </div>
        <DiceArea openDice={this.props.G.openDice} 
            onClick={this.rollTheDice} 
            currentPlayer={this.props.ctx.currentPlayer} 
            player="1" 
            winner={this.props.ctx.gameover} />
        <DiceArea openDice={this.props.G.openDice} 
            onClick={this.rollTheDice} 
            currentPlayer={this.props.ctx.currentPlayer} 
            player="0"
            winner={this.props.ctx.gameover} />

        {fields}
      </div>
    );
  }
}

export default BackgammonBoard;