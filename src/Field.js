import React from 'react';
import moving from './moving';
import boarding from './boarding';
import Token from './Token';
import './Field.css';
import { player } from './moving';

function fromOut(id) {
  if (id === 25 || id === 0) return 26;
  return id;
}

function out(currentPlayer) {
  if (currentPlayer === '0') {
    return 0;
  }
  if (currentPlayer === '1') {
    return 25;
  }
  return false;
}

function justOne(possibleMoves) {
  return possibleMoves.length === 1;
}
function allSame(possibleMoves) {
  if (possibleMoves.length < 2) return false;
  return possibleMoves[0] === possibleMoves[1];
}
function getHigherDiceThanDistance(dices, distance) {
  return dices
    .sort()
    .reverse()
    .find(dice => dice > distance);
}

class Field extends React.Component {
  onClick(id) {
    const { selected, board, currentPlayer, selecting, makeMove, openDice } = this.props;

    // nothing selected -> select
    if (!selected && selected !== 0) {
      this.trySelecting(this.myID());
      return;
    }
    // deselect if same value
    if (selected === this.myID()) {
      selecting(null);
      return;
    }

    // we have a selected
    // check if possible destination -> make move
    if (this.isPossibleDestination()) {
      let diceValue = moving.distance(selected, id);
      makeMove(selected, diceValue);
      return;
    }

    // home out situation
    if (
      this.isPossibleDestination() &&
      boarding.isHome(board, currentPlayer) &&
      boarding.isBiggestStone(board, currentPlayer, selected)
    ) {
      let highestDice = openDice.reduce((a, b) => {
        return Math.max(a, b);
      });
      makeMove(selected, highestDice);
      return;
    }

    // else try to select
    this.trySelecting(this.myID());
  }
  handleIsHomeAndWantsOut() {
    const selected = this.myID();
    const { makeMove, openDice, board, currentPlayer } = this.props;

    // move if isHome and ...
    // ... direct out with a dice
    const distanceHome = moving.distance(out(currentPlayer), selected);
    if (openDice.includes(distanceHome)) {
      return makeMove(selected, distanceHome);
    }

    // ... isBiggestStone and we have a higher dice than distance home
    // always use the biggest dice
    let higherDice = getHigherDiceThanDistance(openDice, distanceHome);
    if (boarding.isBiggestStone(board, currentPlayer, selected) && higherDice) {
      return makeMove(selected, higherDice);
    }
  }
  onDoubleClick(id) {
    const selected = this.myID();
    const possibleMoves = this.possibleMoves();
    const { makeMove, board, currentPlayer } = this.props;

    // move if there is just one possible move
    // or move if we have a pasch
    if (justOne(possibleMoves) || allSame(possibleMoves)) {
      return makeMove(selected, possibleMoves[0]);
    }

    if (boarding.isHome(board, currentPlayer)) this.handleIsHomeAndWantsOut();
  }
  myID() {
    const { id, currentPlayer } = this.props;

    if (id === 26) {
      if (player.isWhite(currentPlayer)) return 0;
      if (player.isBlack(currentPlayer)) return 25;
    }
    return id;
  }

  trySelecting(id) {
    const { selecting } = this.props;

    if (!this.hasStones()) {
      return selecting(null);
    }
    if (!this.hasStonesOfCurrentPlayer()) {
      return selecting(null);
    }
    if (!this.hasPossibleMoves()) {
      return selecting(null);
    }

    selecting(id);
  }
  hasStones() {
    return this.props.board[this.props.id].length > 0;
  }
  hasStonesOfCurrentPlayer() {
    return boarding.isMyColor(this.props.board, this.props.currentPlayer, fromOut(this.props.id));
  }
  hasPossibleMoves() {
    return this.possibleMoves().length > 0;
  }
  // maybe better to name possibleDice
  possibleMoves() {
    return this.props.openDice.filter(dice => {
      return boarding.mayMoveTo(this.props.board, this.props.currentPlayer, this.myID(), dice);
    });
  }

  // if this is a selectable field
  isPossibleDestination() {
    return this.props.destinations.includes(this.myID());
  }

  render() {
    const { selected, id, board, currentPlayer } = this.props;
    const isSelected = selected === id;

    let tokens = board[id];
    tokens = tokens.map((token, index) => {
      return (
        <Token key={index} player={token} selected={isSelected && index === tokens.length - 1} />
      );
    });

    if (this.isPossibleDestination()) {
      tokens.push(<Token key={tokens.length + 1} player={currentPlayer} destination={true} />);
    }
    return (
      <div
        id={'field-' + id}
        className="field"
        onClick={() => this.onClick(id)}
        onDoubleClick={() => this.onDoubleClick(id)}
      >
        {tokens}
      </div>
    );
  }
}

export default Field;
