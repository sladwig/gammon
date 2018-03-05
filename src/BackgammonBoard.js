import React from 'react';
import DiceArea from './DiceArea';
import { Random } from 'boardgame.io/core';
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
      this.props.moves.rollDice(player, Random)
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

    const fieldProps = {
      currentPlayer: currentPlayer,
      openDice: openDice,
      board: board,
      selected: selected,
      destinations: destinations,
      selecting: this.selecting,
      makeMove: this.makeMove,
    }

    const diceAreaProps = {
      openDice: openDice,
      onClick: this.rollTheDice,
      currentPlayer: currentPlayer,
      winner: gameover,
    }

    // create Fields
    let fieldsNumbers = Array.from(Array(24),(_,i)=>i+1)
    let fields = [...fieldsNumbers.slice(12), ...fieldsNumbers.slice(0,12).reverse()]

    fields = fields.map(i=> <Field key={i} id={i} {...fieldProps} />)

    return (
      <div className="board">
        <div className="left"></div>
        <Bar id={26} {...fieldProps} />
        <div className="right">
          <Out id={25} {...fieldProps} />
          <div className="spacefill"></div>
          <Out id={0} {...fieldProps} />
        </div>
        <DiceArea player="1" {...diceAreaProps} />
        <DiceArea player="0" {...diceAreaProps} />

        {fields}
      </div>
    );
  }
}

export default BackgammonBoard;