import React from 'react';
import Field from './Field';
import Token from './Token';
import playerColor from './playerColor'

class Out extends Field {
  render() {
    let selected = this.props.selected === this.props.id
    let possible = this.isPossibleDestination() 


    let color = ""
    let tokens = this.props.board[this.props.id]
    if (tokens.length > 0) {
      color = playerColor(tokens[0])
    }
    if (this.props.id === 25) color = "white"
    if (this.props.id === 0) color = "black"
    tokens = tokens.map((token, index) => {
      if (selected && index === tokens.length-1) {
        return <Token key={index} player={token} selected={true} /> 
      }
      return <Token key={index} player={token} />
    })

    if (possible) {
      tokens.push(<Token key={tokens.length+1} 
          player={this.props.ctx.currentPlayer} destination={true} />) 
    }

    return (<div className={"out "+color}
        key={this.props.id}
        onClick={() => this.onClick(this.props.id)}>
      {tokens}
    </div>)
  }
}

export default Out;