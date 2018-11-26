import React from 'react';
import Field from './Field';
import Token from './Token';
import playerColor from './playerColor';

class Out extends Field {
  render() {
    const { id, currentPlayer, board } = this.props;

    let color = '';
    let tokens = board[id];
    if (tokens.length > 0) {
      color = playerColor(tokens[0]);
    }
    if (id === 25) color = 'white';
    if (id === 0) color = 'black';
    tokens = tokens.map((token, index) => {
      return <Token key={index} player={token} />;
    });

    if (this.isPossibleDestination()) {
      tokens.push(<Token key={tokens.length + 1} player={currentPlayer} destination={true} />);
    }

    return (
      <div className={'out ' + color} onClick={() => this.onClick(id)}>
        {tokens}
      </div>
    );
  }
}

export default Out;
