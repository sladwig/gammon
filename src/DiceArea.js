import React from 'react';

class DiceArea extends React.Component {
  onClick(id) {
    if (this.isActive(id)) {
      this.props.moves.moveStone(id);
      this.props.endTurn();
    }
  }

  isActive(id) {
    if (this.props.ctx.winner !== null) return false;
    // if (this.props.G.cells[id] !== null) return false;
    return true;
  }

  render() {
    // const cellStyle = {
    //   border: '1px solid #555',
    //   width: '50px',
    //   height: '50px',
    //   lineHeight: '50px',
    //   textAlign: 'center',
    //   float: 'left',
    // };

    let dices = this.props.openDice //.G.openDice.toString();
    return (
      <div id="j">
        {dices}
      </div>
    );
  }
}

export default DiceArea;