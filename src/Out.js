import React from 'react';
import Field from './Field';
import Token from './Token';
import playerColor from './playerColor'

class Out extends Field {
  render() {
    let color = ""
    let tokens = this.props.board[this.props.id]
    if (tokens.length > 0) {
      color = playerColor(tokens[0])
    }
    if (this.props.id === 25) color = "white"
    if (this.props.id === 0) color = "black"
    tokens = tokens.map((token, index) => {
      return <Token key={index} player={token} />
    })

    if (this.isPossibleDestination()) {
      tokens.push(<Token key={tokens.length+1} 
          player={this.props.currentPlayer} destination={true} />) 
    }

    return (<div className={"out "+color}
        onClick={() => this.onClick(this.props.id)}>
      {tokens}
    </div>)
  }
}

export default Out;