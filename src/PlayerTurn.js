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

    let player = "any"
    if (this.props.currentPlayer === "0") player = "black";
    if (this.props.currentPlayer === "1") player = "white";
    return (
      <div id="player-turn">
        Player: {player}<br/>
        Phase: {this.props.phase}
      </div>
    );
  }
}

export default PlayerTurn;