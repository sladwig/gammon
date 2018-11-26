import React from 'react';
import './Token.css';
import playerColor from './playerColor';

class Token extends React.Component {
  render() {
    let selected = this.props.selected ? ' selected' : '';
    let destination = this.props.destination ? ' destination' : '';

    return <div className={'token ' + playerColor(this.props.player) + selected + destination} />;
  }
}

export default Token;
