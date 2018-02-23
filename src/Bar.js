import React from 'react';
import Field from './Field';
import Token from './Token'

class Bar extends Field {
  render() {
    let selected = this.props.selected === this.myID() 

    let tokens = this.props.board[this.props.id]
    let first = true
    tokens = tokens.map((token, index) => {
      let isSelected = selected && ''+token === this.props.currentPlayer && first;
      if (isSelected) first = false;
      return <Token key={index} player={token} selected={isSelected} /> 
    })

    return (
      <div id={"field-"+this.props.id}
          className="bar"
          onClick={() => this.onClick(this.myID())}
          onDoubleClick={() => this.onDoubleClick(this.myID())}>
        {tokens}
      </div>
    );
  }
}

export default Bar;