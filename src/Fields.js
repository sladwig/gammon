import React from 'react';
import Field from './Field';

class Fields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  selecting = (id) => {
    console.log('selecting: ', id)
    this.setState({selected: id})
    // this.state.selected = id
  }

  render() {
    

    let fields = [];

    for (let i=0; i < this.props.board.length; i++) {
      // do not render "black out", "white out" and bar
      if ([0,25,26].includes(i)) continue;

      fields.push(
        <Field key={i} 
                id={i} 
                boardField={this.props.board[i]} 
                ctx={this.props.ctx} 
                openDice={this.props.openDice} 
                board={this.props.board}
                selected={this.state.selected}
                selecting={this.selecting}
                makeMove={this.props.makeMove} />
      );
    }


    return (
      <div id="fields">
        {fields}
      </div>
    );
  }
}

export default Fields;