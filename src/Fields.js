import React from 'react';
import Field from './Field';
import Bar from './Bar';
import Out from './Out';

class Fields extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: null };
  }

  selecting = (id) => {
    this.setState({selected: id})
  }

  render() {
    let fields = [];

    for (let i=0; i < this.props.board.length; i++) {
      // do not render "black out", "white out" and bar
      if ([0,25,26].includes(i)) continue;

      fields.push(
        <Field key={i} 
                id={i} 
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
        The Bar <Bar id={26} 
                ctx={this.props.ctx} 
                openDice={this.props.openDice} 
                board={this.props.board}
                selected={this.state.selected}
                selecting={this.selecting}
                makeMove={this.props.makeMove} /><br/>
        <div>
        {fields}
        </div><br/>
        The White Out <Out id={25} 
                ctx={this.props.ctx} 
                openDice={this.props.openDice} 
                board={this.props.board}
                selected={this.state.selected}
                selecting={this.selecting}
                makeMove={this.props.makeMove} /><br/>
        The Black Out <Out id={0} 
                ctx={this.props.ctx} 
                openDice={this.props.openDice} 
                board={this.props.board}
                selected={this.state.selected}
                selecting={this.selecting}
                makeMove={this.props.makeMove} />
      </div>
    );
  }
}

export default Fields;