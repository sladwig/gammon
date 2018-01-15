import React from 'react';

class PlayerTurn extends React.Component {
  render() {
    // const cellStyle = {
    //   border: '1px solid #555',
    //   width: '50px',
    //   height: '50px',
    //   lineHeight: '50px',
    //   textAlign: 'center',
    //   float: 'left',
    // };

    let player = this.props.currentPlayer === "0" ? "black" : "white"   //.G.openDice.toString();
    return (
      <div id="player-turn">
        Player: {player}<br/>`
        Phase: {this.props.phase}
      </div>
    );
  }
}

export default PlayerTurn;