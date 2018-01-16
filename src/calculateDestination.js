import moving from './moving'

function calculateDestination(dice) {
  // here is some logic needed for home out scenario
  let to = this.props.id + (moving.direction(this.props.ctx.currentPlayer) * dice)
  if (to < 1) { to = 1}
  if (to > 24) { to = 24}
  return to;
}

export default calculateDestination;