import Field from './Field';
import {player} from './moving'
import board from './board'

class Bar extends Field {
  onClick(id) {
    this.trySelecting(this.myID())
  }

  possibleMoves() { 
    return this.props.openDice.filter((dice) => {
      return board.mayMoveTo(this.props.board, this.props.ctx.currentPlayer, this.myID(), dice)
    });
  } 

  myID() {
    if (player.isWhite(this.props.ctx.currentPlayer)) return 0 
    if (player.isBlack(this.props.ctx.currentPlayer)) return 25
    return false  
  }

  // render() {
  //   return (
  //     <div id="bar">
  //       The Bar: {this.props.bar}
  //     </div>
  //   );
  // }
}

export default Bar;